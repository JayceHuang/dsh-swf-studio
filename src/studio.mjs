import { templates, defaultProject, normalizeProject, renderLayers, canvasBase64, fontFamily } from './scene.mjs'
import { frameState } from './motion.mjs'
import { css } from './styles.mjs'
const API = '/api/dsh-swf-studio'
const TEMPLATE_PAGE_SIZE = 12
async function api(path, body) {
  const response = await fetch(API + path, body === undefined ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  let result
  try { result = await response.json() } catch { throw new Error(`导出服务暂时不可用（${response.status}），请重新加载插件。`) }
  if (!response.ok) throw new Error(result.error || `请求失败（${response.status}）`)
  return result
}
export function mountStudio(onClose, draft) {
  const libraryCategories = [...new Set(templates.map(template => template.category))]
  const style = document.createElement('style'); style.textContent = css; document.head.append(style)
  const dialog = document.createElement('dialog'); dialog.className = 'swf-dialog'; dialog.setAttribute('aria-label','SWF 场景工坊')
  dialog.innerHTML = `<header class="swf-head"><div><h1>SWF 场景工坊 <span class="swf-pill">本地生成 · 0 模型 Token</span></h1><p>餐厅宴会、婚礼庆典，挑选场景即可编辑并导出</p></div><button class="swf-close" aria-label="关闭工坊">关闭</button></header>
  <div class="swf-grid"><aside class="swf-library"><p class="swf-eyebrow">${templates.length} 款模板 · ${libraryCategories.length} 类宴会场景</p><h2>选择你的场景</h2>
  <div class="swf-library-controls"><label>场景分类<select data-category aria-label="场景分类"><option value="">全部分类</option></select></label><label>搜索模板<input data-search type="search" placeholder="升学、寿宴、婚礼…" aria-label="搜索模板"></label><div class="swf-filter-summary"><span data-template-count role="status" aria-live="polite"></span><button class="swf-clear" data-clear-filters>清除筛选</button></div></div>
  <div data-templates></div><p class="swf-library-empty" data-no-templates hidden>没有找到匹配的模板。试试其他关键词，或清除筛选。</p><button class="swf-small swf-load-more" data-load-more hidden></button><p class="swf-note">画面与文字随文件保存<br>筛选列表不会更改当前工程</p></aside>
  <main class="swf-main"><div class="swf-preview-head"><strong data-scene-title></strong><span class="swf-meta" data-meta></span></div><div class="swf-stage"><canvas aria-label="场景动画预览"></canvas></div>
  <div class="swf-timeline"><button class="swf-small" data-play>暂停</button><input aria-label="动画时间" type="range" min="0" max="8" value="0" step="0.01"><span class="swf-time"></span></div>
  <div class="swf-form"><label>主标题<input name="title" maxlength="120"></label><label>副标题 / 姓名或活动名称<input name="subtitle" maxlength="120"></label><label>日期与地点<input name="detail" maxlength="120"></label><label>祝福语<textarea name="footer" maxlength="120"></textarea></label></div>
  <div class="swf-options"><label>画面尺寸<select name="size"><option value="1280,720">1280 × 720 横屏</option><option value="1920,1080">1920 × 1080 横屏</option><option value="800,600">800 × 600 经典</option><option value="1080,1920">1080 × 1920 竖屏</option></select></label><label>动画<select name="motion"><option value="fade">淡入淡出</option><option value="rise">轻盈上浮</option><option value="still">静态画面</option></select></label><label>时长（秒）<input name="duration" type="number" min="2" max="30" step="1"></label><label>帧率<select name="fps"><option>12</option><option>24</option><option>30</option></select></label><label>文字颜色<input name="color" type="color"></label><label>字体<select name="font"><option value="serif">典雅衬线</option><option value="sans-serif">简洁无衬线</option></select></label></div>
  <p class="swf-note">预览展示模板动画。导出的 SWF 含已固化的中文画面，可循环播放；修改文字请重新导入工程生成。电脑播放可使用 Ruffle，现场设备请先试播。</p>
  <div class="swf-actions"><div><button class="swf-small" data-import>导入工程</button><input type="file" accept=".json,application/json" data-file hidden></div><button class="swf-primary" data-export>生成 SWF 文件</button></div>
  <p class="swf-note" data-location>正在读取保存位置…</p><section class="swf-status" hidden aria-live="polite"></section></main></div>`
  const $ = s => dialog.querySelector(s)
  let project = draft.project || defaultProject(), layers, playing = true, time = 0, previous = 0, raf = 0, busy = false, disposed = false
  let matchingTemplates = [], shownTemplates = 0
  const preview = $('.swf-stage canvas'), status = $('.swf-status'), exportButton = $('[data-export]')
  const templateList = $('[data-templates]'), categorySelect = $('[data-category]'), searchInput = $('[data-search]')
  const loadMore = $('[data-load-more]'), clearFilters = $('[data-clear-filters]')
  function message(text, error = false) { status.hidden = false; status.dataset.error = String(error); status.textContent = text }
  function syncFields() {
    for (const k of ['title','subtitle','detail','footer','color','duration','fps','font','motion']) $(`[name="${k}"]`).value = project[k]
    $('[name=size]').value = `${project.width},${project.height}`
    if (!$('[name=size]').value) {
      const o = document.createElement('option'); o.value = `${project.width},${project.height}`; o.textContent = `${project.width} × ${project.height} 工程尺寸`; $('[name=size]').append(o); $('[name=size]').value=o.value
    }
    $('.swf-timeline input').max = project.duration
    for (const button of dialog.querySelectorAll('[data-template]')) button.setAttribute('aria-pressed',String(button.dataset.template === project.template))
  }
  function rebuild() {
    layers = renderLayers(project); preview.width=project.width; preview.height=project.height
    $('[data-scene-title]').textContent = templates.find(t=>t.id===project.template).name
    $('[data-meta]').textContent = `${project.width} × ${project.height} · ${project.fps} FPS · ${project.duration} 秒`
    draft.project = {...project}; draw()
  }
  function draw() {
    if (!layers) return
    const context = preview.getContext('2d'), tick = Math.min(project.duration - 1 / project.fps, Math.floor(time * project.fps) / project.fps)
    const { alpha, y } = frameState(tick, project.duration, project.motion, project.height)
    context.clearRect(0,0,preview.width,preview.height); context.drawImage(layers.background,0,0); context.globalAlpha=alpha; context.drawImage(layers.foreground,0,y); context.globalAlpha=1
    $('.swf-time').textContent = `${time.toFixed(1)} / ${project.duration}s`; $('.swf-timeline input').value = time
  }
  function animate(now) {
    if (disposed) return
    if (playing && !document.hidden && previous) { time=(time+Math.min((now-previous)/1000,.1))%project.duration; draw() }
    previous=now; raf=requestAnimationFrame(animate)
  }
  function templateCard(t) {
    const card = document.createElement('button'); card.className='swf-card'; card.dataset.template=t.id; card.setAttribute('aria-label',t.name+'，'+t.description)
    card.setAttribute('aria-pressed', String(t.id === project.template)); card.disabled = busy
    // Render at a supported project size, then retain only the small thumbnail bitmap.
    const thumbnail = renderLayers({...defaultProject(t.id),width:640,height:360}), cv=document.createElement('canvas')
    cv.width=320;cv.height=180;cv.getContext('2d').drawImage(thumbnail.background,0,0,320,180);cv.getContext('2d').drawImage(thumbnail.foreground,0,0,320,180)
    thumbnail.background.width=0;thumbnail.foreground.width=0
    const title=document.createElement('strong'); title.textContent=t.name; const subtitle=document.createElement('small'); subtitle.textContent=t.description
    card.append(cv,title,subtitle); card.addEventListener('click',()=>{ if(busy)return; project={...defaultProject(t.id),width:project.width,height:project.height,fps:project.fps,duration:project.duration,motion:project.motion}; time=1.5;syncFields();rebuild(); exportButton.disabled=false; status.hidden=true })
    return card
  }
  function syncLibraryControls() {
    const remaining = matchingTemplates.length - shownTemplates
    $('[data-template-count]').textContent = `匹配 ${matchingTemplates.length} 款 · 已显示 ${shownTemplates}`
    $('[data-no-templates]').hidden = matchingTemplates.length !== 0
    loadMore.hidden = remaining === 0; loadMore.disabled = busy
    loadMore.textContent = `再显示 ${Math.min(TEMPLATE_PAGE_SIZE, remaining)} 款（剩余 ${remaining} 款）`
    clearFilters.disabled = busy || (!categorySelect.value && !searchInput.value)
  }
  function appendTemplatePage() {
    const page = matchingTemplates.slice(shownTemplates, shownTemplates + TEMPLATE_PAGE_SIZE)
    const fragment = document.createDocumentFragment()
    for (const template of page) fragment.append(templateCard(template))
    templateList.append(fragment); shownTemplates += page.length; syncLibraryControls()
  }
  function filterTemplates() {
    if (busy) return
    const category = categorySelect.value, query = searchInput.value.trim().toLocaleLowerCase()
    const words = query.split(/\s+/).filter(Boolean)
    matchingTemplates = templates.filter(template => {
      const text = [template.name, template.description, template.category, template.title].join(' ').toLocaleLowerCase()
      return (!category || template.category === category) && words.every(word => text.includes(word))
    })
    for (const canvas of templateList.querySelectorAll('canvas')) canvas.width = 0
    templateList.replaceChildren(); shownTemplates = 0
    draft.library = { category, query: searchInput.value }
    appendTemplatePage()
  }
  for (const category of libraryCategories) {
    const option = document.createElement('option'); option.value = category
    option.textContent = `${category}（${templates.filter(template => template.category === category).length}）`
    categorySelect.append(option)
  }
  categorySelect.value = libraryCategories.includes(draft.library?.category) ? draft.library.category : ''
  searchInput.value = draft.library?.query || ''
  categorySelect.onchange = filterTemplates; searchInput.oninput = filterTemplates
  clearFilters.onclick = () => { if(busy)return; categorySelect.value=''; searchInput.value=''; filterTemplates() }
  loadMore.onclick = () => { if(!busy)appendTemplatePage() }
  filterTemplates()
  function update() {
    try {
      const candidate={...project}
      for(const k of ['title','subtitle','detail','footer','font','color','motion']) candidate[k]=$(`[name="${k}"]`).value
      for(const k of ['fps','duration']) candidate[k]=Number($(`[name="${k}"]`).value)
      ;[candidate.width,candidate.height]=$('[name=size]').value.split(',').map(Number)
      project=normalizeProject(candidate); time=Math.min(time,project.duration-.01); $('.swf-timeline input').max=project.duration; rebuild(); exportButton.disabled=false; status.hidden=true
    }catch(error){exportButton.disabled=true;message(error.message,true)}
  }
  dialog.querySelectorAll('.swf-form input,.swf-form textarea,.swf-options input,.swf-options select').forEach(input=>input.addEventListener('input',update))
  $('[data-play]').onclick=()=>{playing=!playing;$('[data-play]').textContent=playing?'暂停':'播放'}
  $('.swf-timeline input').oninput=e=>{time=Number(e.target.value);playing=false;$('[data-play]').textContent='播放';draw()}
  $('[data-import]').onclick=()=>$('[data-file]').click()
  $('[data-file]').onchange=async e=>{
    const file=e.target.files[0]; if(!file || busy || disposed)return
    const controls=[...dialog.querySelectorAll('input,textarea,select,button')].map(control=>[control,control.disabled])
    busy=true; for(const [control] of controls)control.disabled=true
    let imported=false
    try{
      if(file.size>32768)throw new Error('工程文件过大，请选择本插件导出的 project.json。')
      const content=await file.text(); if(disposed)return
      const raw=JSON.parse(content); project=normalizeProject(raw.project||raw)
      syncFields();rebuild();time=1.5;draw();imported=true;message('工程已载入，可继续修改文字。')
    }catch(error){if(!disposed)message(error.message,true)}finally{
      busy=false;e.target.value=''
      if(!disposed){for(const [control,disabled] of controls)control.disabled=disabled;if(imported)exportButton.disabled=false;syncLibraryControls()}
    }
  }
  exportButton.onclick=async()=>{
    if(busy)return; busy=true
    const controls=[...dialog.querySelectorAll('input,textarea,select,button')]; for(const x of controls)x.disabled=true
    exportButton.textContent='正在本地生成…'; message('正在将画面与中文写入 SWF…')
    try{
      await document.fonts.load(`32px ${fontFamily(project.font)}`); layers=renderLayers(project)
      const poster=document.createElement('canvas');poster.width=project.width;poster.height=project.height;const pc=poster.getContext('2d');pc.drawImage(layers.background,0,0);pc.drawImage(layers.foreground,0,0)
      const result=await api('/export',{project,background:canvasBase64(layers.background),foreground:canvasBase64(layers.foreground),poster:poster.toDataURL('image/png')})
      if(disposed)return
      status.replaceChildren();status.hidden=false;status.dataset.error='false'
      const heading=document.createElement('strong');heading.textContent='SWF 已生成并保存'
      const path=document.createElement('textarea');path.className='swf-path';path.readOnly=true;path.rows=2;path.value=result.absolutePath;path.setAttribute('aria-label','SWF 文件完整路径')
      const details=document.createElement('p');details.textContent=`${(result.bytes/1024).toFixed(0)} KB · ${result.width} × ${result.height} · ${result.duration} 秒。工程与预览图保存在同一文件夹。`
      const actions=document.createElement('div');actions.className='swf-result-actions'
      const copy=document.createElement('button');copy.className='swf-small';copy.textContent='复制文件位置';copy.onclick=async()=>{try{await navigator.clipboard.writeText(result.absolutePath);copy.textContent='已复制'}catch{path.focus();path.select();copy.textContent='路径已选中，可复制'}}
      const reveal=document.createElement('button');reveal.className='swf-small';reveal.textContent='打开导出文件夹';reveal.onclick=async()=>{try{await api('/reveal',{})}catch(error){message(error.message,true)}}
      actions.append(copy,reveal);status.append(heading,path,details,actions);path.focus()
    }catch(error){if(!disposed)message(error.message,true)}finally{busy=false;for(const x of controls)x.disabled=false;exportButton.textContent='生成 SWF 文件';syncLibraryControls()}
  }
  $('.swf-close').onclick=()=>{if(!busy)onClose()}
  dialog.addEventListener('cancel',e=>{e.preventDefault();if(!busy)onClose()})
  document.body.append(dialog);syncFields();rebuild();dialog.showModal();raf=requestAnimationFrame(animate)
  api('/config').then(result=>{if(!disposed)$('[data-location]').textContent='保存目录：'+result.outputDirectory}).catch(error=>{if(!disposed)message(error.message,true)})
  return()=>{disposed=true;cancelAnimationFrame(raf);for(const canvas of templateList.querySelectorAll('canvas'))canvas.width=0;dialog.close();dialog.remove();style.remove()}
}
