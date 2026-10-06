import { deflateSync } from 'node:zlib';
import { frameState } from './motion.mjs';
import { motionObjects, objectPose } from './floor.mjs';

// Adobe SWF specification: https://open-flash.github.io/mirrors/swf-spec-19.pdf
// This encoder deliberately emits only bitmap, shape and display-list tags.
const TWIPS = 20;
const FPS = [12, 24, 30];
const MOTIONS = ['fade', 'rise', 'still'];

function timeline(fps, duration, motion) {
  if (!FPS.includes(fps)) throw new RangeError('fps must be 12, 24 or 30');
  if (!Number.isFinite(duration) || duration < 2 || duration > 30) {
    throw new RangeError('duration must be between 2 and 30 seconds');
  }
  if (!MOTIONS.includes(motion)) throw new RangeError('unknown motion');
  const frames = Math.round(duration * fps);
  if (frames > 900) throw new RangeError('animation must not exceed 900 frames');
  return frames;
}

function dimension(value, name) {
  if (!Number.isInteger(value) || value < 1 || value > 1920) {
    throw new RangeError(`${name} must be an integer between 1 and 1920`);
  }
}

class Bits {
  bytes = [];
  value = 0;
  used = 0;

  unsigned(value, count) {
    for (let bit = count - 1; bit >= 0; bit--) {
      this.value = this.value * 2 + (Math.floor(value / 2 ** bit) % 2);
      if (++this.used === 8) {
        this.bytes.push(this.value);
        this.value = 0;
        this.used = 0;
      }
    }
    return this;
  }

  signed(value, count) {
    return this.unsigned(value < 0 ? value + 2 ** count : value, count);
  }

  buffer() {
    if (this.used) this.unsigned(0, 8 - this.used);
    return Buffer.from(this.bytes);
  }
}

function signedBits(...values) {
  let count = 1;
  while (values.some(value => value < -(2 ** (count - 1)) || value >= 2 ** (count - 1))) count++;
  return count;
}

function u16(value) {
  const bytes = Buffer.alloc(2);
  bytes.writeUInt16LE(value);
  return bytes;
}

function u32(value) {
  const bytes = Buffer.alloc(4);
  bytes.writeUInt32LE(value);
  return bytes;
}

function tag(code, body = Buffer.alloc(0), long = false) {
  const extended = long || body.length >= 63;
  return Buffer.concat([u16((code << 6) | (extended ? 63 : body.length)), ...(extended ? [u32(body.length)] : []), body]);
}

function rect(width, height) {
  const values = [0, width * TWIPS, 0, height * TWIPS];
  const count = signedBits(...values);
  const bits = new Bits().unsigned(count, 5);
  for (const value of values) bits.signed(value, count);
  return bits.buffer();
}

function matrix(scale = 1, y = 0) {
  const bits = new Bits().unsigned(scale === 1 ? 0 : 1, 1);
  if (scale !== 1) {
    const fixed = scale * 65536;
    const count = signedBits(fixed);
    bits.unsigned(count, 5).signed(fixed, count).signed(fixed, count);
  }
  const translateY = Math.round(y * TWIPS);
  const count = signedBits(0, translateY);
  bits.unsigned(0, 1).unsigned(count, 5).signed(0, count).signed(translateY, count);
  return bits.buffer();
}

function colorTransform(alpha) {
  const bits = new Bits().unsigned(0, 1).unsigned(1, 1).unsigned(10, 4);
  for (const value of [256, 256, 256, Math.round(alpha * 256)]) bits.signed(value, 10);
  return bits.buffer();
}

function bitmap(id, width, height, rgba) {
  const argb = Buffer.alloc(rgba.length);
  for (let i = 0; i < rgba.length; i += 4) {
    const alpha = rgba[i + 3];
    argb[i] = alpha;
    argb[i + 1] = Math.round(rgba[i] * alpha / 255);
    argb[i + 2] = Math.round(rgba[i + 1] * alpha / 255);
    argb[i + 3] = Math.round(rgba[i + 2] * alpha / 255);
  }
  return tag(36, Buffer.concat([u16(id), Buffer.from([5]), u16(width), u16(height), deflateSync(argb)]), true);
}

function shape(id, bitmapId, width, height) {
  const edges = new Bits().unsigned(1, 4).unsigned(0, 4);
  // Select FillStyle0 and move to the origin, then explicitly close the path.
  edges.unsigned(0, 1).unsigned(3, 5).unsigned(1, 5).signed(0, 1).signed(0, 1).unsigned(1, 1);
  for (const [vertical, delta] of [[1, height * TWIPS], [0, width * TWIPS], [1, -height * TWIPS], [0, -width * TWIPS]]) {
    const count = Math.max(2, signedBits(delta));
    edges.unsigned(1, 1).unsigned(1, 1).unsigned(count - 2, 4).unsigned(0, 1).unsigned(vertical, 1).signed(delta, count);
  }
  edges.unsigned(0, 6);
  return tag(32, Buffer.concat([
    u16(id), rect(width, height), Buffer.from([1, 0x41]), u16(bitmapId),
    matrix(TWIPS), Buffer.from([0]), edges.buffer(),
  ]));
}

function place(depth, id, { alpha = 1, y = 0 } = {}) {
  const first = id !== undefined;
  return tag(26, Buffer.concat([
    Buffer.from([first ? 0x0e : 0x0d]), u16(depth), ...(first ? [u16(id)] : []),
    matrix(1, y), colorTransform(alpha),
  ]));
}

/** Encode two equally sized, unpremultiplied RGBA byte layers as an FWS v8 Buffer. */
export function encodeSwf({ width, height, fps, duration, background, foreground, motion = 'fade' }) {
  dimension(width, 'width');
  dimension(height, 'height');
  if (width * height > 2073600) throw new RangeError('canvas must not exceed 2073600 pixels');
  const frames = timeline(fps, duration, motion);
  for (const [name, layer] of [['background', background], ['foreground', foreground]]) {
    if (!(layer instanceof Uint8Array || layer instanceof Uint8ClampedArray) || layer.length !== width * height * 4) {
      throw new TypeError(`${name} must contain width * height * 4 RGBA bytes`);
    }
  }
  const tags = [
    tag(69, u32(0)), // FileAttributes must be the first tag for SWF 8.
    tag(9, Buffer.from([255, 255, 255])),
    bitmap(1, width, height, background), shape(2, 1, width, height),
    bitmap(3, width, height, foreground), shape(4, 3, width, height),
    place(1, 2),
  ];
  for (let frame = 0; frame < frames; frame++) {
    tags.push(place(2, frame === 0 ? 4 : undefined, frameState(frame / fps, frames / fps, motion, height)), tag(1));
  }
  tags.push(tag(0));
  const body = Buffer.concat([rect(width, height), u16(fps * 256), u16(frames), ...tags]);
  return Buffer.concat([Buffer.from('FWS\x08', 'binary'), u32(body.length + 8), body]);
}

function rotationMatrix(scale, angle, x, y) {
  const bits=new Bits(),cs=Math.round(Math.cos(angle)*scale*65536),sn=Math.round(Math.sin(angle)*scale*65536)
  let n=signedBits(cs);bits.unsigned(1,1).unsigned(n,5).signed(cs,n).signed(cs,n)
  n=signedBits(sn,-sn);bits.unsigned(1,1).unsigned(n,5).signed(sn,n).signed(-sn,n)
  const tx=Math.round(x*20),ty=Math.round(y*20);n=signedBits(tx,ty)
  return bits.unsigned(n,5).signed(tx,n).signed(ty,n).buffer()
}
/** Fixed, embedded Chinese artwork plus independently animated bitmap objects. No ActionScript. */
export function encodeFloorSwf(p) {
  const {width,height,fps,duration,background,foreground,floor,sprites}=p
  const frames=timeline(fps,duration,'still')
  if(width>3000||height>1920||width*height>2073600)throw new RangeError('Invalid FloorLED dimensions')
  for(const layer of [background,foreground])if(layer.length!==width*height*4)throw new RangeError('Invalid artwork')
  const objects=motionObjects(p), tags=[tag(69,u32(0)),tag(9,Buffer.from([0,0,0])),
    bitmap(1,width,height,background),shape(2,1,width,height),
    bitmap(3,width,height,foreground),shape(4,3,width,height),place(1,2),place(2,4)]
  for(let k=0;k<3;k++)tags.push(bitmap(10+k,48,48,sprites[k]),shape(20+k,10+k,48,48))
  for(let frame=0;frame<frames;frame++){
    for(let j=0;j<objects.length;j++){
      const o=objects[j],q=objectPose(o,frame/fps,duration)
      const angle=q.angle+(floor.direction===90?-Math.PI/2:Math.PI/2)
      const x=floor.offsetX+(floor.direction===90?q.y:floor.visibleLength-q.y)
      const y=floor.offsetY+(floor.direction===90?floor.visibleWidth-q.x:q.x)
      const tx=x-24*q.scale*(Math.cos(angle)-Math.sin(angle)),ty=y-24*q.scale*(Math.sin(angle)+Math.cos(angle))
      tags.push(tag(26,Buffer.concat([Buffer.from([frame===0?0x0e:0x0d]),u16(j+3),...(frame===0?[u16(20+o.kind)]:[]),rotationMatrix(q.scale,angle,tx,ty),colorTransform(q.alpha)])))
    }
    tags.push(tag(1))
  }
  tags.push(tag(0));const body=Buffer.concat([rect(width,height),u16(fps*256),u16(frames),...tags])
  return Buffer.concat([Buffer.from('CWS\x09','binary'),u32(body.length+8),deflateSync(body,{level:9})])
}
