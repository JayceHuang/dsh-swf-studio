import { templates } from './templates.mjs'
import { drawDecorations } from './decorations.mjs'

const FONT = { serif: '"SimSun", "Songti SC", serif', 'sans-serif': '"Microsoft YaHei", sans-serif' }
export function defaultFloor(t) {
  return { mainRatio:.75, direction:90, secondaryRotation:180, visibleLength:2048, visibleWidth:512,
    offsetX:0, offsetY:0, groom:'张三', bride:'李四', showNames:t.category==='婚礼婚庆',
    kicker:t.kicker, secondaryTitle:t.title,
    secondarySubtitle:t.subtitle.replace('林先生 & 陈小姐','婚礼盛典 · 恭迎亲友'), secondaryFooter:t.footer, effects:'rich', intensity:1 }
}
export function normalizeFloor(raw, t, width, height) {
  const d = {...defaultFloor(t), ...raw}
  for (const k of ['groom','bride','kicker','secondaryTitle','secondarySubtitle','secondaryFooter']) {
    if(typeof d[k]!=='string'||d[k].length>120)throw new Error('姓名和文案每栏最多 120 个字符。')
  }
  if(typeof d.showNames!=='boolean')throw new Error('姓名显示选项无效。')
  if(!Number.isFinite(d.mainRatio)||d.mainRatio<.1||d.mainRatio>.9)throw new Error('酒席区域比例应为 10%–90%。')
  if(![90,270].includes(d.direction)||![0,180].includes(d.secondaryRotation))throw new Error('文字朝向无效。')
  for(const k of ['visibleLength','visibleWidth','offsetX','offsetY'])if(!Number.isInteger(d[k]))throw new Error('尺寸和偏移应填写整数像素。')
  if(d.visibleLength<320||d.visibleLength>3000||d.visibleWidth<240||d.visibleWidth>1920||d.offsetX<0||d.offsetY<0||d.offsetX+d.visibleLength>width||d.offsetY+d.visibleWidth>height)throw new Error('可见区域必须完全落在导出画面内。')
  if(!['rich','gentle','off'].includes(d.effects)||!Number.isFinite(d.intensity)||d.intensity<.25||d.intensity>2)throw new Error('动效设置无效。')
  // Return known keys only, so imported projects cannot carry executable fields.
  return Object.fromEntries(Object.keys(defaultFloor(t)).map(k=>[k,d[k]]))
}
export function floorProject(p) {
  const t=templates.find(t=>t.id===p.template)
  return {...p, schemaVersion:2, profile:'floorled', width:2408,height:512,duration:20,motion:'still',
    subtitle:p.subtitle.replace('林先生 & 陈小姐','婚礼盛典 · 恭迎亲友'),
    detail:t.category==='婚礼婚庆'?'永结同心 · 百年好合':p.detail,
    floor:defaultFloor(t)}
}
function fitted(c,value,x,y,size,width,font,color,weight='400',maxLines=3) {
  c.textAlign='center';c.textBaseline='middle';c.fillStyle=color
  const lines=[]
  // Prefer a readable size and wrap Chinese, rather than shrinking long sentences to a thin line.
  let fs=size
  const wrap=()=>{
    lines.length=0;c.font=`${weight} ${fs}px ${font}`
    for(const paragraph of value.split('\n')){
      let line=''
      for(const char of paragraph){if(line&&c.measureText(line+char).width>width){lines.push(line);line=''}line+=char}
      lines.push(line)
    }
  }
  wrap();while(lines.length>maxLines&&fs>10){fs--;wrap()}
  lines.forEach((line,i)=>c.fillText(line,x,y+(i-(lines.length-1)/2)*fs*1.28))
}
function focusPanel(c,t,w,h,top,bottom) {
  const y=h*top,height=h*(bottom-top),g=c.createLinearGradient(0,y,0,y+height)
  g.addColorStop(0,t.bg+'00');g.addColorStop(.14,t.bg+'e8');g.addColorStop(.86,t.bg+'e8');g.addColorStop(1,t.bg+'00')
  c.fillStyle=g;c.fillRect(w*.06,y,w*.88,height)
  c.strokeStyle=t.accent;c.globalAlpha=.28;c.lineWidth=Math.max(1,w/512)
  for(const edge of [y,y+height]){c.beginPath();c.moveTo(w*.26,edge);c.lineTo(w*.74,edge);c.stroke()}
  c.globalAlpha=1
}
function names(c,f,w,y,s,font,color,accent,compact) {
  const labelY=y-(compact?34:56)*s,nameSize=(compact?42:70)*s
  fitted(c,'新郎',w*.30,labelY,17*s,w*.34,FONT['sans-serif'],accent,'400',1)
  fitted(c,'新娘',w*.70,labelY,17*s,w*.34,FONT['sans-serif'],accent,'400',1)
  fitted(c,f.groom,w*.30,y,nameSize,w*.34,font,color,'600',1)
  fitted(c,f.bride,w*.70,y,nameSize,w*.34,font,color,'600',1)
  fitted(c,'&',w/2,y,20*s,w*.08,'serif',accent,'400',1)
}
function zone(p,t,w,h,secondary,makeCanvas) {
  const cv=makeCanvas();cv.width=w;cv.height=h
  const c=cv.getContext('2d'),s=Math.min(w/512,h/512),font=FONT[p.font],f=p.floor
  c.fillStyle=t.bg;c.fillRect(0,0,w,h)
  const grad=c.createRadialGradient(w/2,h*.48,0,w/2,h*.48,Math.max(w,h)*.8)
  grad.addColorStop(0,'#ffffff12');grad.addColorStop(1,'#00000010');c.fillStyle=grad;c.fillRect(0,0,w,h)
  drawDecorations(c,t,w,h)
  if(secondary){
    fitted(c,f.kicker,w/2,h*.12,18*s,w*.70,'sans-serif',t.accent,'400',2)
    fitted(c,f.secondaryTitle,w/2,h*.30,50*s,w*.72,font,p.color,'600',2)
    fitted(c,f.secondarySubtitle,w/2,h*.43,20*s,w*.70,font,p.color,'400',2)
    if(f.showNames)names(c,f,w,h*.64,s,font,p.color,t.accent,true)
    c.strokeStyle=t.accent;c.globalAlpha=.55;c.lineWidth=1.5*s;c.beginPath();c.moveTo(w*.39,h*.76);c.lineTo(w*.61,h*.76);c.stroke();c.globalAlpha=1
    fitted(c,f.secondaryFooter,w/2,h*.87,19*s,w*.72,font,p.color,'400',3)
    return cv
  }
  fitted(c,f.kicker,w/2,h*.10,23*s,w*.72,'sans-serif',t.accent,'400',2)
  focusPanel(c,t,w,h,.18,.68)
  fitted(c,p.title,w/2,h*.29,88*s,w*.76,font,p.color,'600',p.title.length<=8&&!p.title.includes('\n')?1:2)
  fitted(c,p.subtitle,w/2,h*(f.showNames?.41:.50),f.showNames?28*s:40*s,w*.72,font,p.color,'400',2)
  if(f.showNames)names(c,f,w,h*.59,s,font,p.color,t.accent,false)
  c.strokeStyle=t.accent;c.globalAlpha=.55;c.lineWidth=1.5*s;c.beginPath();c.moveTo(w*.37,h*.72);c.lineTo(w*.63,h*.72);c.stroke();c.globalAlpha=1
  fitted(c,p.detail,w/2,h*.80,26*s,w*.72,font,p.color,'400',2)
  fitted(c,p.footer,w/2,h*.91,24*s,w*.76,font,p.color,'400',3)
  return cv
}
export function renderFloor(p,makeCanvas=()=>document.createElement('canvas')) {
  const t=templates.find(t=>t.id===p.template),f=p.floor,w=f.visibleWidth,h=f.visibleLength
  const portrait=makeCanvas();portrait.width=w;portrait.height=h
  const c=portrait.getContext('2d'),split=Math.round(h*(1-f.mainRatio))
  const secondary=zone(p,t,w,split,true,makeCanvas),main=zone(p,t,w,h-split,false,makeCanvas)
  c.save();if(f.secondaryRotation===180){c.translate(w,split);c.rotate(Math.PI)}c.drawImage(secondary,0,0);c.restore();c.drawImage(main,0,split)
  c.strokeStyle=t.accent;c.lineWidth=Math.max(1,w/256);c.beginPath();c.moveTo(w*.23,split);c.lineTo(w*.77,split);c.stroke()
  const background=makeCanvas(),foreground=makeCanvas()
  for(const cv of [background,foreground]){cv.width=p.width;cv.height=p.height}
  const out=background.getContext('2d');out.fillStyle=t.bg;out.fillRect(0,0,p.width,p.height)
  applyFloorTransform(out,f);out.drawImage(portrait,0,0);out.restore()
  return {background,foreground,portrait,sprites:makeSprites(t,makeCanvas)}
}
export function applyFloorTransform(c,f) {
  c.save()
  if(f.direction===90){c.translate(f.offsetX,f.offsetY+f.visibleWidth);c.rotate(-Math.PI/2)}
  else{c.translate(f.offsetX+f.visibleLength,f.offsetY);c.rotate(Math.PI/2)}
}
export function motionObjects(p) {
  if(p.floor.effects==='off')return []
  const f=p.floor,w=f.visibleWidth,h=f.visibleLength,split=Math.round(h*(1-f.mainRatio)),out=[]
  let seed=43;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296}
  for(const [lo,hi] of [[0,split],[split,h]]){
    const count=Math.max(4,Math.round((hi-lo)/h*(f.effects==='rich'?64:32)*f.intensity))
    for(let i=0;i<count;i++)out.push({kind:i%3,mode:i%4,lo:lo+w*.05,hi:hi-w*.05,x:w*(i%2?.86:.14),phase:random()*Math.PI*2,start:random(),scale:(.34+random()*.40)*w/512})
  }
  return out
}
export function objectPose(o,time,duration) {
  const t=time/duration,a=t*Math.PI*2,range=o.hi-o.lo
  if(o.mode===0){const glow=(.5+.5*Math.sin(a*3+o.phase))**2;return {x:o.x+3*Math.sin(a+o.phase),y:o.lo+o.start*range,scale:o.scale*(.7+.4*glow),angle:0,alpha:.12+.82*glow}}
  const y=o.lo+((o.start+t*(o.mode===1?-1:1)+1)%1)*range
  const fade=Math.max(0,Math.min(1,(y-o.lo)/35,(o.hi-y)/35))
  return {x:o.x+10*Math.sin(a+o.phase),y,scale:o.scale,angle:a+o.phase,alpha:.72*fade}
}
export function makeSprites(t,makeCanvas) {
  return [0,1,2].map(k=>{
    const cv=makeCanvas();cv.width=cv.height=48;const c=cv.getContext('2d');c.fillStyle=t.accent;c.strokeStyle=t.ink;c.lineWidth=1
    c.translate(24,24)
    if(k===0){const g=c.createRadialGradient(0,0,0,0,0,23);g.addColorStop(0,t.ink+'60');g.addColorStop(1,t.ink+'00');c.fillStyle=g;c.fillRect(-24,-24,48,48);c.fillStyle=t.ink;c.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,r=i%2?3:20;c.lineTo(Math.cos(a)*r,Math.sin(a)*r)}c.closePath();c.fill()}
    else if(k===1){c.beginPath();c.ellipse(0,0,8,17,.35,0,Math.PI*2);c.fill();c.stroke();c.beginPath();c.moveTo(-4,10);c.lineTo(4,-10);c.stroke()}
    else if(['rings','orbit','moon','balloons','table'].includes(t.art)){c.lineWidth=2;c.beginPath();c.arc(0,0,11,0,Math.PI*2);c.stroke()}
    else if(['flowers','peony','lotus'].includes(t.art)){for(let i=0;i<5;i++){c.rotate(Math.PI*2/5);c.beginPath();c.ellipse(0,-8,5,9,0,0,Math.PI*2);c.fill()}c.fillStyle=t.ink;c.beginPath();c.arc(0,0,3,0,Math.PI*2);c.fill()}
    else{c.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5,r=i%2?5:17;c.lineTo(Math.cos(a)*r,Math.sin(a)*r)}c.closePath();c.fill()}
    return cv
  })
}
export function drawFloorFrame(c,p,layers,time) {
  c.globalAlpha=1;c.clearRect(0,0,p.width,p.height);c.drawImage(layers.background,0,0)
  applyFloorTransform(c,p.floor)
  for(const o of motionObjects(p)){const q=objectPose(o,time,p.duration);c.save();c.translate(q.x,q.y);c.rotate(q.angle);c.scale(q.scale,q.scale);c.globalAlpha=q.alpha;c.drawImage(layers.sprites[o.kind],-24,-24);c.restore()}
  c.restore();c.globalAlpha=1
}
export function drawPortraitFrame(c,p,layers,time) {
  c.globalAlpha=1;c.clearRect(0,0,c.canvas.width,c.canvas.height);c.drawImage(layers.portrait,0,0)
  for(const o of motionObjects(p)){const q=objectPose(o,time,p.duration);c.save();c.translate(q.x,q.y);c.rotate(q.angle);c.scale(q.scale,q.scale);c.globalAlpha=q.alpha;c.drawImage(layers.sprites[o.kind],-24,-24);c.restore()}
  c.globalAlpha=1
}
