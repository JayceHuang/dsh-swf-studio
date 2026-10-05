import { templates } from './templates.mjs'
import { drawDecorations } from './decorations.mjs'
export { templates, categories } from './templates.mjs'

export function defaultProject(id = templates[0].id) {
  const t = templates.find(t => t.id === id) || templates[0]
  return { schemaVersion: 1, template: t.id, title: t.title, subtitle: t.subtitle, detail: t.detail, footer: t.footer,
    color: t.ink, width: 1280, height: 720, fps: 24, duration: 8, motion: 'fade', font: 'serif' }
}
export function normalizeProject(p) {
  if (!p || !templates.some(t => t.id === p.template)) throw new Error('无法识别这个模板工程。')
  const d = defaultProject(p.template)
  for (const k of ['title', 'subtitle', 'detail', 'footer']) {
    if (typeof p[k] !== 'string' || p[k].length > 120) throw new Error('每栏文字最多 120 个字符。')
    d[k] = p[k]
  }
  if (!d.title.trim()) throw new Error('请填写主标题。')
  if (!/^#[\da-f]{6}$/i.test(p.color)) throw new Error('请选择有效的文字颜色。')
  if (!Number.isInteger(p.width) || !Number.isInteger(p.height) || p.width < 320 || p.height < 240 || p.width > 1920 || p.height > 1920 || p.width * p.height > 2073600) throw new Error('画面最大为 1920×1080 或 1080×1920。')
  if (![12, 24, 30].includes(p.fps) || !Number.isInteger(p.duration) || p.duration < 2 || p.duration > 30) throw new Error('时长为 2–30 秒，帧率为 12、24 或 30。')
  if (!['fade', 'rise', 'still'].includes(p.motion) || !['serif', 'sans-serif'].includes(p.font)) throw new Error('动画或字体选项无效。')
  return { ...d, color: p.color, width: p.width, height: p.height, fps: p.fps, duration: p.duration, motion: p.motion, font: p.font }
}
export function fontFamily(style) {
  return style === 'sans-serif' ? '"PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif' : '"Songti SC", "SimSun", "Noto Serif CJK SC", serif'
}
function line(c, x1, y1, x2, y2) { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke() }
function text(c, value, y, size, maxWidth, font, color, weight = '400') {
  c.fillStyle = color; c.textAlign = 'center'; c.textBaseline = 'middle'
  const lines = value.split('\n').slice(0, 3)
  let fs = size
  for (;;) { c.font = `${weight} ${fs}px ${font}`; if (Math.max(...lines.map(s => c.measureText(s).width)) <= maxWidth || fs <= 10) break; fs -= 1 }
  lines.forEach((s, i) => c.fillText(s, c.canvas.width / 2, y + (i - (lines.length-1)/2) * fs * 1.18))
}
/** Rasterize once; animation transforms only two reusable layers. */
export function renderLayers(project, makeCanvas = () => document.createElement('canvas')) {
  const p = normalizeProject(project), t = templates.find(t => t.id === p.template)
  const background = makeCanvas(), foreground = makeCanvas()
  for (const canvas of [background, foreground]) { canvas.width = p.width; canvas.height = p.height }
  const b = background.getContext('2d'), c = foreground.getContext('2d'), w = p.width, h = p.height, s = Math.min(w / 1280, h / 720)
  b.fillStyle = t.bg; b.fillRect(0,0,w,h)
  const g = b.createRadialGradient(w*.5,h*.38,0,w*.5,h*.4,Math.max(w,h)*.7)
  g.addColorStop(0, '#ffffff18'); g.addColorStop(1, '#00000018'); b.fillStyle = g; b.fillRect(0,0,w,h)
  drawDecorations(b,t,w,h)
  const font = fontFamily(p.font)
  const layouts = { classic:[.26,.41,.56,.655,.72,.82], arch:[.28,.43,.57,.66,.73,.81], banner:[.24,.39,.55,.64,.71,.81], seal:[.27,.42,.57,.655,.73,.82], ribbon:[.25,.4,.55,.645,.72,.81] }
  const [kicker,title,subtitle,divider,detail,footer] = layouts[t.layout || 'classic']
  text(c,t.kicker,h*kicker,15*s,w*.7,'sans-serif',t.accent)
  text(c,p.title,h*title,72*s,w*.73,font,p.color)
  text(c,p.subtitle,h*subtitle,30*s,w*.73,font,p.color)
  c.strokeStyle = t.accent; c.globalAlpha=.6; c.lineWidth=s; line(c,w*.43,h*divider,w*.57,h*divider); c.globalAlpha=1
  text(c,p.detail,h*detail,20*s,w*.74,font,p.color)
  text(c,p.footer,h*footer,18*s,w*.74,font,p.color)
  return { background, foreground }
}
export function canvasBase64(canvas) {
  const bytes = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data
  let raw = ''; for (let i=0;i<bytes.length;i+=32768) raw += String.fromCharCode(...bytes.subarray(i, i+32768))
  return btoa(raw)
}
