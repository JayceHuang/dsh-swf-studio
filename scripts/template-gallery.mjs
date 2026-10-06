/** Local visual QA and preset-image export; no production dependency. */
import { createServer } from 'node:http'
import { readFile, mkdir, writeFile, rename } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { templates, defaultProject } from '../src/scene.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const output = path.resolve(process.argv[2] || path.join(root, 'artifacts/presets-0.2.0'))
const port = Number(process.env.SWF_GALLERY_PORT || 8768)
const origin = `http://127.0.0.1:${port}`
const prefix = id => {
  const t = templates.find(t => t.id === id)
  if (!t) throw new Error('Unknown preset')
  return path.join(output, t.category, `${t.name}-${t.id}`)
}
async function atomic(filename, data) {
  await mkdir(path.dirname(filename), { recursive: true })
  await writeFile(`${filename}.tmp`, data)
  await rename(`${filename}.tmp`, filename)
}
const html = `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>餐厅宴会厅 · 60 款场景预设</title>
<style>body{margin:0;background:#f4f1eb;color:#34312d;font:15px/1.6 system-ui}header{padding:32px 36px 24px;background:#243e39;color:#fff}h1{margin:0;font:34px Georgia,serif}header p{color:#c4d6cd}button{border:0;border-radius:6px;padding:12px 20px;background:#ead39f;color:#243e39;font:inherit;cursor:pointer}#status{margin:12px 0 0;white-space:pre-wrap}main{padding:12px 36px 36px}h2{margin:32px 0 12px;font-size:20px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.card{background:#fff;border-radius:10px;padding:7px 7px 12px;box-shadow:0 2px 8px #0001}.card canvas{width:100%;aspect-ratio:16/9;display:block;border-radius:5px}.card strong,.card small{display:block;padding:4px 8px 0}.card small{color:#8b7d6b}@media(max-width:780px){.grid{grid-template-columns:repeat(2,1fr)}}
</style><header><h1>餐厅宴会厅 · 60 款场景预设</h1><p>11 类场景 · 中文可编辑 · 本地生成 · 全部预设图 1920 × 1080</p><button id="export">生成全部预设图与工程</button><div id="status" role="status">正在检查所有模板…</div></header><main id="gallery"></main>
<script type="module">
import {templates,categories,defaultProject,renderLayers} from '/src/scene.mjs';
const status=document.querySelector('#status'),gallery=document.querySelector('#gallery');
const results=[];const hashes=new Set();
try{
for(const category of categories){
  const section=document.createElement('section'),heading=document.createElement('h2'),grid=document.createElement('div');
  heading.textContent=category+' · '+templates.filter(t=>t.category===category).length+' 款';grid.className='grid';section.append(heading,grid);gallery.append(section);
  for(const t of templates.filter(t=>t.category===category)){
    const p={...defaultProject(t.id),width:640,height:360};const {background,foreground}=renderLayers(p);background.getContext('2d').drawImage(foreground,0,0);
    const pixels=background.getContext('2d').getImageData(0,0,640,360).data;const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',pixels))].map(n=>n.toString(16).padStart(2,'0')).join('');hashes.add(hash);
    const card=document.createElement('article'),name=document.createElement('strong'),desc=document.createElement('small');card.className='card';name.textContent=t.name;desc.textContent=t.description;card.append(background,name,desc);grid.append(card);results.push({id:t.id,category:t.category,name:t.name,hash});
  }
}
status.textContent=templates.length+' 款已渲染，'+hashes.size+' 张不同画面。可生成完整 PNG 与可编辑工程。';
document.querySelector('#export').onclick=async event=>{
 const button=event.currentTarget;button.disabled=true;
 try{
  let completed=0;
  for(const t of templates){
   status.textContent='正在生成 '+(++completed)+' / '+templates.length+'：'+t.category+' · '+t.name;
   const {background,foreground}=renderLayers({...defaultProject(t.id),width:1920,height:1080});background.getContext('2d').drawImage(foreground,0,0);
   const blob=await new Promise(resolve=>background.toBlob(resolve,'image/png'));
   const response=await fetch('/save/'+t.id,{method:'POST',headers:{'Content-Type':'image/png'},body:blob});if(!response.ok)throw new Error(await response.text());
  }
  const sheet=document.createElement('canvas');sheet.width=1920;sheet.height=110+Math.ceil(results.length/4)*340;
  const ctx=sheet.getContext('2d');ctx.fillStyle='#f4f1eb';ctx.fillRect(0,0,sheet.width,sheet.height);ctx.fillStyle='#243e39';ctx.font='bold 36px system-ui';ctx.fillText('餐厅宴会厅 · 60 款场景预设',24,52);ctx.font='20px system-ui';ctx.fillText('11 类场景 · 所有文字可在 大澳渔庄灯光工作台中修改',24,86);
  const cards=[...gallery.querySelectorAll('canvas')];
  results.forEach((r,i)=>{const x=(i%4)*480,y=110+Math.floor(i/4)*340;ctx.drawImage(cards[i],x+10,y+5,460,259);ctx.fillStyle='#34312d';ctx.font='22px system-ui';ctx.fillText(r.name,x+14,y+294);ctx.fillStyle='#8b7d6b';ctx.font='17px system-ui';ctx.fillText(r.category,x+14,y+320);});
  const sheetResponse=await fetch('/contact-sheet',{method:'POST',headers:{'Content-Type':'image/png'},body:await new Promise(resolve=>sheet.toBlob(resolve,'image/png'))});if(!sheetResponse.ok)throw new Error(await sheetResponse.text());
  const response=await fetch('/report',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({rendered:templates.length,uniqueImages:hashes.size,results})});if(!response.ok)throw new Error(await response.text());
  status.textContent='完成：'+templates.length+' 张 1920 × 1080 PNG + '+templates.length+' 份可编辑工程。保存目录：'+(await response.json()).output;
 }catch(error){status.textContent='生成失败：'+error.message;}finally{button.disabled=false;}
};
}catch(error){status.textContent='渲染失败：'+error.stack;}
</script></html>`

createServer(async (req, res) => {
  try {
    if (req.headers.host !== `127.0.0.1:${port}`) { res.writeHead(403); return res.end('Local host only') }
    const url = new URL(req.url, origin)
    if (req.method === 'GET' && url.pathname === '/') { res.setHeader('Content-Type', 'text/html; charset=utf-8'); return res.end(html) }
    if (req.method === 'GET' && /^\/src\/[a-z-]+\.mjs$/.test(url.pathname)) {
      res.setHeader('Content-Type', 'text/javascript; charset=utf-8'); return res.end(await readFile(path.join(root, url.pathname.slice(1))))
    }
    if (req.method !== 'POST' || req.headers.origin !== origin) { res.writeHead(403); return res.end('Local export only') }
    const chunks = []; let size = 0
    for await (const chunk of req) { size += chunk.length; if (size > 8 * 1024 * 1024) throw new Error('File too large'); chunks.push(chunk) }
    const data = Buffer.concat(chunks)
    if (url.pathname === '/contact-sheet') {
      if (req.headers['content-type'] !== 'image/png' || data.length < 24 || data.toString('hex', 0, 8) !== '89504e470d0a1a0a' || data.readUInt32BE(16) !== 1920 || data.readUInt32BE(20) !== 110 + Math.ceil(templates.length / 4) * 340) throw new Error('Invalid contact sheet')
      await atomic(path.join(output, '全部场景总览.png'), data)
      return res.end('ok')
    }
    if (url.pathname.startsWith('/save/')) {
      const id = url.pathname.slice(6), filename = prefix(id)
      if (req.headers['content-type'] !== 'image/png' || data.length < 24 || data.toString('hex', 0, 8) !== '89504e470d0a1a0a' || data.readUInt32BE(16) !== 1920 || data.readUInt32BE(20) !== 1080) throw new Error('Invalid PNG')
      await atomic(`${filename}.png`, data)
      await atomic(`${filename}.json`, JSON.stringify({...defaultProject(id), width:1920, height:1080}, null, 2))
      return res.end('ok')
    }
    if (url.pathname === '/report') {
      await atomic(path.join(output, 'render-report.json'), JSON.stringify(JSON.parse(data), null, 2))
      res.setHeader('Content-Type', 'application/json'); return res.end(JSON.stringify({ output }))
    }
    res.writeHead(404); res.end('Not found')
  } catch (error) { res.writeHead(400); res.end(error.message) }
}).listen(port, '127.0.0.1', () => console.log(`Template gallery: ${origin}\nOutput: ${output}`))
