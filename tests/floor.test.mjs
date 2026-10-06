import test from 'node:test'
import assert from 'node:assert/strict'
import { inflateSync } from 'node:zlib'
import { defaultProject, normalizeProject, templates } from '../src/scene.mjs'
import { floorProject, motionObjects, objectPose } from '../src/floor.mjs'
import { encodeFloorSwf } from '../src/swf.mjs'

test('all 60 themes save custom names, opposing copy, ratio, direction and geometry',()=>{
  for(const t of templates){const p=floorProject(defaultProject(t.id));Object.assign(p.floor,{groom:'王一',bride:'赵二',secondaryTitle:'主席台祝福',mainRatio:.67,direction:270});
    const saved=normalizeProject(JSON.parse(JSON.stringify(p)));assert.deepEqual(saved.floor,p.floor);assert.equal(saved.width,2408);assert.equal(saved.motion,'still')}
})
test('invalid floor geometry and settings are rejected before export',()=>{
  const p=floorProject(defaultProject())
  for(const change of [{mainRatio:0},{mainRatio:1},{direction:45},{secondaryRotation:90},{visibleLength:2409},{offsetX:-1},{visibleWidth:513},{intensity:10},{effects:'script'},{groom:()=>{}}])assert.throws(()=>normalizeProject({...p,floor:{...p.floor,...change}}))
})
test('both sections contain animated objects, with matching loop endpoints',()=>{
  const p=floorProject(defaultProject());p.floor.mainRatio=.75
  const objects=motionObjects(p);assert.equal(objects.length,64);assert.equal(objects.filter(o=>o.hi<512).length,16)
  for(const o of objects){const a=objectPose(o,0,20),b=objectPose(o,20,20);for(const key of ['x','y','scale','alpha'])assert.ok(Math.abs(a[key]-b[key])<1e-8);assert.ok(Math.abs(Math.sin(a.angle)-Math.sin(b.angle))<1e-8)}
  assert.equal(motionObjects({...p,floor:{...p.floor,effects:'off'}}).length,0)
})
function movie(bytes){
  assert.equal(bytes.toString('ascii',0,3),'CWS');const b=inflateSync(bytes.subarray(8));assert.equal(b.length+8,bytes.readUInt32LE(4))
  const n=b[0]>>3;let offset=Math.ceil((5+4*n)/8);const fps=b.readUInt16LE(offset)/256,frames=b.readUInt16LE(offset+2);offset+=4;const tags=[]
  while(offset<b.length){const head=b.readUInt16LE(offset);offset+=2;let len=head&63;if(len===63){len=b.readUInt32LE(offset);offset+=4}assert.ok(offset+len<=b.length);tags.push({code:head>>6,body:b.subarray(offset,offset+len)});offset+=len}return {fps,frames,tags}
}
test('FloorLED SWF holds both text layers fixed while independently moving objects',()=>{
  const p=floorProject(defaultProject());p.fps=12;p.duration=2;p.width=640;p.height=240;p.floor.visibleLength=640;p.floor.visibleWidth=240
  const bytes=encodeFloorSwf({...p,background:Buffer.alloc(640*240*4,255),foreground:Buffer.alloc(640*240*4),sprites:[0,1,2].map(()=>Buffer.alloc(48*48*4,128))})
  const m=movie(bytes);assert.equal(m.frames,24);assert.equal(m.fps,12);assert.equal(m.tags.filter(t=>t.code===1).length,24)
  const placements=m.tags.filter(t=>t.code===26)
  assert.equal(placements.filter(t=>t.body.readUInt16LE(1)===1).length,1);assert.equal(placements.filter(t=>t.body.readUInt16LE(1)===2).length,1)
  const animated=placements.filter(t=>t.body.readUInt16LE(1)===3);assert.equal(animated.length,24);assert.notDeepEqual(animated[0].body.subarray(5),animated[5].body.subarray(3))
  assert.ok(m.tags.every(t=>[0,1,9,26,32,36,69].includes(t.code)))
  for(const t of m.tags.filter(t=>t.code===36)){const raw=inflateSync(t.body.subarray(7));assert.equal(raw.length,t.body.readUInt16LE(3)*t.body.readUInt16LE(5)*4);for(let i=0;i<raw.length;i+=4)assert.ok(Math.max(raw[i+1],raw[i+2],raw[i+3])<=raw[i])}
})
