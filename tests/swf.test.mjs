import test from 'node:test';
import assert from 'node:assert/strict';
import { inflateSync } from 'node:zlib';
import { encodeSwf } from '../src/swf.mjs';
import { frameState } from '../src/motion.mjs';

// Read independently from the encoder: bytes and bits follow the Adobe SWF spec.
class Reader {
  constructor(data, offset = 0) {
    this.data = data;
    this.bit = offset * 8;
  }

  unsigned(count) {
    assert.ok(this.bit + count <= this.data.length * 8, 'read exceeds record');
    let value = 0;
    for (let i = 0; i < count; i++, this.bit++) {
      value = value * 2 + ((this.data[this.bit >> 3] >> (7 - this.bit % 8)) & 1);
    }
    return value;
  }

  signed(count) {
    const value = this.unsigned(count);
    return count && value >= 2 ** (count - 1) ? value - 2 ** count : value;
  }

  align() {
    while (this.bit % 8) assert.equal(this.unsigned(1), 0, 'nonzero padding');
  }

  get offset() { return this.bit / 8; }

  byte() {
    assert.equal(this.bit % 8, 0);
    return this.unsigned(8);
  }

  u16() { return this.byte() + this.byte() * 256; }

  rect() {
    const count = this.unsigned(5);
    const coordinates = Array.from({ length: 4 }, () => this.signed(count));
    this.align();
    return coordinates;
  }

  matrix() {
    let scaleX = 1, scaleY = 1, skewX = 0, skewY = 0;
    if (this.unsigned(1)) {
      const count = this.unsigned(5);
      scaleX = this.signed(count) / 65536;
      scaleY = this.signed(count) / 65536;
    }
    if (this.unsigned(1)) {
      const count = this.unsigned(5);
      skewX = this.signed(count) / 65536;
      skewY = this.signed(count) / 65536;
    }
    const count = this.unsigned(5);
    const x = this.signed(count), y = this.signed(count);
    this.align();
    return { scaleX, scaleY, skewX, skewY, x, y };
  }

  color() {
    const add = this.unsigned(1), multiply = this.unsigned(1), count = this.unsigned(4);
    const mult = multiply ? Array.from({ length: 4 }, () => this.signed(count)) : [256, 256, 256, 256];
    const plus = add ? Array.from({ length: 4 }, () => this.signed(count)) : [0, 0, 0, 0];
    this.align();
    return { mult, plus };
  }
}

function parseSwf(data) {
  assert.equal(data.toString('ascii', 0, 3), 'FWS');
  assert.equal(data[3], 8);
  assert.equal(data.readUInt32LE(4), data.length);
  const reader = new Reader(data, 8);
  const bounds = reader.rect();
  const fps = reader.u16() / 256, frameCount = reader.u16();
  const tags = [];
  let offset = reader.offset;
  while (offset < data.length) {
    const header = data.readUInt16LE(offset);
    offset += 2;
    let length = header & 63;
    const long = length === 63;
    if (long) {
      length = data.readUInt32LE(offset);
      offset += 4;
    }
    assert.ok(offset + length <= data.length);
    tags.push({ code: header >> 6, long, body: data.subarray(offset, offset + length) });
    offset += length;
    if ((header >> 6) === 0) break;
  }
  assert.equal(offset, data.length, 'trailing bytes after End');
  assert.equal(tags.at(-1).code, 0);
  assert.equal(tags.filter(tag => tag.code === 1).length, frameCount);
  return { bounds, fps, frameCount, tags };
}

function parseShape(body) {
  const reader = new Reader(body);
  const id = reader.u16(), bounds = reader.rect();
  assert.equal(reader.byte(), 1, 'one bitmap fill');
  const type = reader.byte(), bitmapId = reader.u16(), bitmapMatrix = reader.matrix();
  assert.equal(reader.byte(), 0, 'no line styles');
  const fillBits = reader.unsigned(4), lineBits = reader.unsigned(4);
  let x = 0, y = 0, fill0 = 0, fill1 = 0;
  const points = [], edges = [];
  while (true) {
    if (reader.unsigned(1)) {
      assert.equal(reader.unsigned(1), 1, 'straight edge');
      const count = reader.unsigned(4) + 2;
      if (reader.unsigned(1)) {
        x += reader.signed(count);
        y += reader.signed(count);
      } else if (reader.unsigned(1)) y += reader.signed(count);
      else x += reader.signed(count);
      points.push([x, y]);
      edges.push({ fill0, fill1 });
    } else {
      const flags = reader.unsigned(5);
      if (!flags) break;
      assert.equal(flags & 16, 0, 'no new styles');
      if (flags & 1) {
        const count = reader.unsigned(5);
        x = reader.signed(count);
        y = reader.signed(count);
        points.push([x, y]);
      }
      if (flags & 2) fill0 = reader.unsigned(fillBits);
      if (flags & 4) fill1 = reader.unsigned(fillBits);
      if (flags & 8) reader.unsigned(lineBits);
    }
  }
  reader.align();
  assert.equal(reader.offset, body.length);
  return { id, bounds, type, bitmapId, bitmapMatrix, points, edges };
}

function placements(movie) {
  const display = new Map(), frames = [], events = [];
  for (const tag of movie.tags) {
    if (tag.code === 26) {
      const reader = new Reader(tag.body);
      const flags = reader.byte(), depth = reader.u16();
      assert.equal(flags & 0xf0, 0, 'no scripts, names, ratios or clipping');
      const previous = display.get(depth);
      assert.equal(Boolean(flags & 1), Boolean(previous), 'move flag must match an existing depth');
      const id = flags & 2 ? reader.u16() : previous.id;
      const matrix = flags & 4 ? reader.matrix() : previous.matrix;
      const color = flags & 8 ? reader.color() : previous.color;
      assert.equal(reader.offset, tag.body.length);
      const state = { id, matrix, color };
      display.set(depth, state);
      events.push({ flags, depth });
    } else if (tag.code === 1) {
      assert.equal(tag.body.length, 0);
      frames.push(new Map(display));
    }
  }
  return { frames, events };
}

function options(overrides = {}) {
  const width = overrides.width ?? 3, height = overrides.height ?? 2;
  return {
    width, height, fps: 24, duration: 2, motion: 'fade',
    background: Buffer.alloc(width * height * 4, 255),
    foreground: Buffer.alloc(width * height * 4), ...overrides,
  };
}

test('writes a deterministic SWF 8 header, correct frame timing and safe tag set', () => {
  const config = options();
  const encoded = encodeSwf(config), movie = parseSwf(encoded);
  assert.deepEqual(encodeSwf(config), encoded);
  assert.deepEqual(movie.bounds, [0, 60, 0, 40]);
  assert.equal(movie.fps, 24);
  assert.equal(movie.frameCount, 48);
  assert.equal(movie.tags[0].code, 69);
  assert.deepEqual(movie.tags[0].body, Buffer.alloc(4));
  assert.ok(movie.tags.every(tag => [69, 9, 36, 32, 26, 1, 0].includes(tag.code)));
  assert.equal(movie.tags.at(-1).body.length, 0);
  assert.equal(movie.tags.filter(tag => tag.code === 36).length, 2);
});

test('embeds exact premultiplied ARGB pixels including partial and zero alpha', () => {
  const rgba = new Uint8ClampedArray([
    20, 40, 60, 255, 200, 100, 50, 128, 255, 255, 255, 0,
    1, 2, 3, 1, 255, 128, 0, 64, 10, 20, 30, 254,
  ]);
  const before = rgba.slice();
  const movie = parseSwf(encodeSwf(options({ foreground: rgba })));
  const bitmaps = movie.tags.filter(tag => tag.code === 36);
  assert.ok(bitmaps.every(tag => tag.long), 'lossless bitmap uses long tag header');
  const body = bitmaps[1].body;
  assert.equal(body.readUInt16LE(0), 3);
  assert.equal(body[2], 5);
  assert.equal(body.readUInt16LE(3), 3);
  assert.equal(body.readUInt16LE(5), 2);
  assert.deepEqual(inflateSync(body.subarray(7)), Buffer.from([
    255, 20, 40, 60, 128, 100, 50, 25, 0, 0, 0, 0,
    1, 0, 0, 0, 64, 64, 32, 0, 254, 10, 20, 30,
  ]));
  assert.deepEqual(rgba, before, 'does not premultiply the caller buffer in place');
});

test('supports an RGBA byte view with nonzero offset', () => {
  const data = new Uint8Array([99, 255, 100, 50, 255, 99]);
  const movie = parseSwf(encodeSwf(options({ width: 1, height: 1, foreground: data.subarray(1, 5) })));
  const bitmap = movie.tags.filter(tag => tag.code === 36)[1];
  assert.deepEqual(inflateSync(bitmap.body.subarray(7)), Buffer.from([255, 255, 100, 50]));
});

test('defines closed bitmap-filled rectangles with pixel-to-twip scale', () => {
  const movie = parseSwf(encodeSwf(options()));
  const shapes = movie.tags.filter(tag => tag.code === 32).map(tag => parseShape(tag.body));
  assert.deepEqual(shapes.map(shape => [shape.id, shape.bitmapId]), [[2, 1], [4, 3]]);
  for (const shape of shapes) {
    assert.equal(shape.type, 0x41);
    assert.deepEqual(shape.bounds, movie.bounds);
    assert.deepEqual(shape.bitmapMatrix, { scaleX: 20, scaleY: 20, skewX: 0, skewY: 0, x: 0, y: 0 });
    assert.deepEqual(shape.points, [[0, 0], [0, 40], [60, 40], [60, 0], [0, 0]]);
    assert.ok(shape.edges.every(edge => edge.fill0 === 1 && edge.fill1 === 0));
  }
});

test('keeps background static and animates rise with smooth loop endpoints', () => {
  const movie = parseSwf(encodeSwf(options({ width: 1, height: 720, fps: 30, motion: 'rise' })));
  const { frames, events } = placements(movie);
  assert.equal(frames.length, 60);
  assert.equal(events.filter(event => event.depth === 1).length, 1);
  assert.equal(frames[0].get(1).id, 2);
  for (const frame of frames) {
    assert.equal(frame.size, 2);
    assert.deepEqual(frame.get(1), frames[0].get(1));
    assert.equal(frame.get(2).id, 4);
    assert.deepEqual(frame.get(2).color.plus, [0, 0, 0, 0]);
    assert.deepEqual(frame.get(2).color.mult.slice(0, 3), [256, 256, 256]);
  }
  const state = index => [frames[index].get(2).color.mult[3], frames[index].get(2).matrix.y];
  assert.deepEqual(state(0), [0, 800]);
  assert.deepEqual(state(7), [66, 593]);
  assert.deepEqual(state(14), [190, 207]);
  assert.deepEqual(state(21), [256, 0]);
  assert.deepEqual(state(38), [256, 0]);
  assert.deepEqual(state(59), [2, 795]);
  for (let i = 1; i < frames.length; i++) assert.deepEqual(state(i), state(60 - i));
});

test('fade only changes opacity, and still retains full visibility on every frame', () => {
  for (const motion of ['fade', 'still']) {
    const movie = parseSwf(encodeSwf(options({ motion })));
    const { frames } = placements(movie);
    assert.ok(frames.every(frame => frame.get(2).matrix.y === 0));
    assert.equal(frames[0].get(2).color.mult[3], motion === 'still' ? 256 : 0);
    assert.equal(frames[24].get(2).color.mult[3], 256);
    if (motion === 'still') assert.ok(frames.every(frame => frame.get(2).color.mult[3] === 256));
  }
});

test('frameState publishes canvas-compatible values at SWF precision', () => {
  assert.deepEqual(frameState(7 / 30, 2, 'rise', 720), { alpha: 66 / 256, y: 29.65 });
  assert.deepEqual(frameState(0.7, 2, 'rise', 720), { alpha: 1, y: 0 });
  assert.deepEqual(frameState(0, 2, 'rise', 100), { alpha: 0, y: 6 });
  assert.deepEqual(frameState(2, 2, 'rise', 720), frameState(0, 2, 'rise', 720));
  assert.deepEqual(frameState(-1, 2, 'rise', 720), frameState(0, 2, 'rise', 720));
  assert.deepEqual(frameState(3, 2, 'rise', 720), frameState(0, 2, 'rise', 720));
});

test('accepts the maximum canvas and timeline while preserving signed shape edges', () => {
  for (const [width, height] of [[1920, 1080], [1080, 1920]]) {
    const movie = parseSwf(encodeSwf(options({ width, height, fps: 30, duration: 30 })));
    const w = width * 20, h = height * 20;
    assert.deepEqual(movie.bounds, [0, w, 0, h]);
    assert.equal(movie.frameCount, 900);
    const shape = parseShape(movie.tags.find(tag => tag.code === 32).body);
    assert.deepEqual(shape.points, [[0, 0], [0, h], [w, h], [w, 0], [0, 0]]);
  }
});

test('accepts every supported frame rate and rounds fractional duration to a whole frame', () => {
  for (const fps of [12, 24, 30]) {
    const movie = parseSwf(encodeSwf(options({ fps, duration: 2.12 })));
    assert.equal(movie.fps, fps);
    assert.equal(movie.frameCount, Math.round(2.12 * fps));
  }
});

test('rejects invalid dimensions, resources, timing, modes and RGBA data', () => {
  const valid = options();
  const invalid = [
    { width: 0 }, { width: 1921 }, { width: 2.5 }, { width: '3' },
    { height: -1 }, { height: 1921 }, { height: NaN }, { height: Infinity },
    { width: 1920, height: 1920 }, { fps: 0 }, { fps: 60 }, { fps: '24' },
    { duration: 1.99 }, { duration: 30.01 }, { duration: NaN }, { duration: Infinity },
    { duration: '2' }, { motion: 'spin' }, { motion: null },
    { background: undefined }, { foreground: Buffer.alloc(23) },
    { foreground: new Float32Array(24) }, { foreground: Array(24).fill(0) },
  ];
  for (const override of invalid) assert.throws(() => encodeSwf({ ...valid, ...override }));
});
