import { templates, defaultProject, normalizeProject, renderLayers, canvasBase64, fontFamily } from './scene.mjs'
import { css } from './styles.mjs'
import { floorProject, drawPortraitFrame } from './floor.mjs'
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
  const dialog = document.createElement('dialog'); dialog.className = 'swf-dialog'; dialog.setAttribute('aria-label','大澳渔庄灯光工作台')
  dialog.innerHTML = `<header class="swf-head"><div><h1>大澳渔庄灯光工作台 <span class="swf-pill">本地生成 · 0 模型 Token</span></h1><p>60 个主题 · 完整地砖屏 · 酒席与主席台文案均可定制</p></div><button class="swf-close" aria-label="关闭工坊">关闭</button></header>
  <div class="swf-grid"><aside class="swf-library"><p class="swf-eyebrow">${templates.length} 款模板 · ${libraryCategories.length} 类宴会场景</p><h2>选择你的场景</h2>
  <div class="swf-library-controls"><label>场景分类<select data-category aria-label="场景分类"><option value="">全部分类</option></select></label><label>搜索模板<input data-search type="search" placeholder="升学、寿宴、婚礼…" aria-label="搜索模板"></label><div class="swf-filter-summary"><span data-template-count role="status" aria-live="polite"></span><button class="swf-clear" data-clear-filters>清除筛选</button></div></div>
  <div data-templates></div><p class="swf-library-empty" data-no-templates hidden>没有找到匹配的模板。试试其他关键词，或清除筛选。</p><button class="swf-small swf-load-more" data-load-more hidden></button><p class="swf-note">画面与文字随文件保存<br>筛选列表不会更改当前工程</p></aside>
  <main class="swf-main"><section class="swf-preview-panel"><div class="swf-preview-head"><strong data-scene-title></strong><span class="swf-meta" data-meta></span><span class="swf-view-label">完整走道 · 竖向预览</span></div><div class="swf-stage"><canvas aria-label="完整走道竖向动效预览"></canvas></div>
  <div class="swf-timeline"><button class="swf-small" data-play>暂停</button><input aria-label="动画时间" type="range" min="0" max="20" value="0" step="0.01"><span class="swf-time"></span></div><p class="swf-note">右侧同时显示主席台区域和酒席区域。动画固定为 20 秒、24 FPS，并持续循环播放。</p></section>
  <section class="swf-editor"><div class="swf-form"><label>主题切换<select name="keepText"><option value="no">更换主题文案，保留姓名及现场参数</option><option value="yes">保留当前全部文案</option></select></label><label>酒席方向 · 中部主标题<input name="title" maxlength="120"></label><label>酒席方向 · 中部副标题<input name="subtitle" maxlength="120"></label><label>酒席方向 · 靠舞台日期地点<input name="detail" maxlength="120"></label><label>酒席方向 · 靠舞台祝福语<textarea name="footer" maxlength="120"></textarea></label></div>
  <fieldset class="swf-floor" data-floor><legend>完整地砖屏设置</legend><div class="swf-form">
<label>新郎姓名<input name="groom" maxlength="120"></label><label>新娘姓名<input name="bride" maxlength="120"></label>
<label>姓名显示<select name="showNames"><option value="yes">两区显示新人姓名</option><option value="no">显示副标题，不显示姓名</option></select></label><label>两端引导语<input name="kicker" maxlength="120"></label>
<label>主席台方向 · 主标题<textarea name="secondaryTitle" maxlength="120"></textarea></label><label>主席台方向 · 副标题<textarea name="secondarySubtitle" maxlength="120"></textarea></label>
<label>主席台方向 · 祝福语<textarea name="secondaryFooter" maxlength="120"></textarea></label>
<label>酒席方向阅读方向<select name="direction"><option value="90">A 方向（沿用已验证方向）</option><option value="270">B 方向（整幅旋转 180°）</option></select></label>
<label>可见走道长度（像素）<input name="visibleLength" type="number" min="320" max="3000"></label><label>可见走道宽度（像素）<input name="visibleWidth" type="number" min="240" max="1920"></label>
<label>导出画面宽度（像素）<input name="stageWidth" type="number" min="320" max="3000"></label><label>导出画面高度（像素）<input name="stageHeight" type="number" min="240" max="1920"></label>
<label>可见区域 X 偏移<input name="offsetX" type="number" min="0"></label><label>可见区域 Y 偏移<input name="offsetY" type="number" min="0"></label>
<label>边缘动效<select name="effects"><option value="rich">丰富：流光、闪星、飘叶、主题粒子</option><option value="gentle">轻柔</option><option value="off">关闭</option></select></label><label>动效密度<input name="intensity" type="number" min="0.25" max="2" step="0.25"></label>
    </div><p class="swf-note">完整走道固定为酒席区域 3/4、主席台区域 1/4，主席台文字与酒席文字相向摆放。默认走道 32×7 块；像素参数沿用已验证输出。</p></fieldset><div class="swf-options"><label>文字颜色<input name="color" type="color"></label><label>字体<select name="font"><option value="serif">典雅衬线</option><option value="sans-serif">简洁无衬线</option></select></label></div>
  <p class="swf-note">所有文字、姓名和现场参数保存在工程 JSON，可重新导入修改。FloorLED 模式文字固定；本插件生成播放素材，现场传感器继续由 FloorLED 处理。</p>
  <div class="swf-actions"><div><button class="swf-small" data-import>导入工程</button><input type="file" accept=".json,application/json" data-file hidden></div><button class="swf-primary" data-export>生成 SWF 文件</button></div>
  <p class="swf-note" data-location>正在读取保存位置…</p><section class="swf-status" hidden aria-live="polite"></section></section></main></div>`
  const $ = s => dialog.querySelector(s)
  let project = normalizeProject(draft.project || floorProject(defaultProject()))
  if(project.profile!=='floorled')project=floorProject(project)
  project={...project,duration:20,fps:24,motion:'still'}
  let layers, playing = true, time = 0, previous = 0, raf = 0, busy = false, disposed = false
  let matchingTemplates = [], shownTemplates = 0
  const preview = $('.swf-stage canvas'), status = $('.swf-status'), exportButton = $('[data-export]')
  const templateList = $('[data-templates]'), categorySelect = $('[data-category]'), searchInput = $('[data-search]')
  const loadMore = $('[data-load-more]'), clearFilters = $('[data-clear-filters]')
  function message(text, error = false) { status.hidden = false; status.dataset.error = String(error); status.textContent = text }
  function syncFields() {
    for (const k of ['title','subtitle','detail','footer','color','font']) $(`[name="${k}"]`).value = project[k]
    if(project.floor){
      for(const k of ['groom','bride','kicker','secondaryTitle','secondarySubtitle','secondaryFooter','direction','visibleLength','visibleWidth','offsetX','offsetY','effects','intensity'])$(`[name=${k}]`).value=project.floor[k]
      $('[name=showNames]').value=project.floor.showNames?'yes':'no'
      $('[name=stageWidth]').value=project.width;$('[name=stageHeight]').value=project.height
    }
    $('.swf-timeline input').max = project.duration
    for (const button of dialog.querySelectorAll('[data-template]')) button.setAttribute('aria-pressed',String(button.dataset.template === project.template))
  }
  function rebuild() {
    layers = renderLayers(project); preview.width=project.width; preview.height=project.height
    $('.swf-stage').classList.toggle('is-portrait',project.profile==='floorled')
    $('[data-scene-title]').textContent = templates.find(t=>t.id===project.template).name
    $('[data-meta]').textContent = `${project.width} × ${project.height} · ${project.fps} FPS · ${project.duration} 秒`
    draft.project = structuredClone(project); draw()
  }
  function draw() {
    if (!layers) return
    const context = preview.getContext('2d'), tick = Math.min(project.duration - 1 / project.fps, Math.floor(time * project.fps) / project.fps)
    preview.width=project.floor.visibleWidth;preview.height=project.floor.visibleLength;drawPortraitFrame(context,project,layers,tick)
    $('.swf-time').textContent = `${time.toFixed(1)} / ${project.duration}s`; $('.swf-timeline input').value = time
  }
  function animate(now) {
    if (disposed) return
    if (playing && !document.hidden && previous) { const before=Math.floor(time*project.fps);time=(time+Math.min((now-previous)/1000,.1))%project.duration;if(Math.floor(time*project.fps)!==before)draw() }
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
    card.append(cv,title,subtitle); card.addEventListener('click',()=>{ if(busy)return; const old=project,next=floorProject(defaultProject(t.id));project={...next,width:old.width,height:old.height,fps:24,duration:20,motion:'still',font:old.font};project.floor={...next.floor,...Object.fromEntries(['direction','visibleLength','visibleWidth','offsetX','offsetY','groom','bride','showNames','effects','intensity'].map(k=>[k,old.floor[k]]))};if($('[name=keepText]').value==='yes'){for(const k of ['title','subtitle','detail','footer'])project[k]=old[k];for(const k of ['kicker','secondaryTitle','secondarySubtitle','secondaryFooter'])project.floor[k]=old.floor[k]}; time=1.5;syncFields();rebuild(); exportButton.disabled=false; status.hidden=true })
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
      let candidate=structuredClone(project)
      for(const k of ['title','subtitle','detail','footer','font','color']) candidate[k]=$(`[name="${k}"]`).value
      for(const k of ['groom','bride','kicker','secondaryTitle','secondarySubtitle','secondaryFooter','effects'])candidate.floor[k]=$(`[name=${k}]`).value
      for(const k of ['direction','visibleLength','visibleWidth','offsetX','offsetY','intensity'])candidate.floor[k]=Number($(`[name=${k}]`).value)
      candidate.floor.showNames=$('[name=showNames]').value==='yes'
      candidate.width=Number($('[name=stageWidth]').value);candidate.height=Number($('[name=stageHeight]').value)
      candidate.duration=20;candidate.fps=24;candidate.motion='still';candidate.floor.mainRatio=.75;candidate.floor.secondaryRotation=180
      project=normalizeProject(candidate); time=Math.min(time,project.duration-.01); $('.swf-timeline input').max=project.duration; rebuild(); exportButton.disabled=false; status.hidden=true
    }catch(error){exportButton.disabled=true;message(error.message,true)}
  }
  dialog.querySelectorAll('.swf-form input,.swf-form textarea,.swf-form select,.swf-options input,.swf-options select').forEach(input=>input.addEventListener('input',update))
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
      const raw=JSON.parse(content),normalized=normalizeProject(raw.project||raw);project=normalized.profile==='floorled'?normalized:floorProject(normalized)
      project={...project,duration:20,fps:24,motion:'still',floor:{...project.floor,mainRatio:.75,secondaryRotation:180}}
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
      const result=await api('/export',{project,background:canvasBase64(layers.background),foreground:canvasBase64(layers.foreground),...(project.profile==='floorled'?{sprites:layers.sprites.map(canvasBase64)}:{}),poster:poster.toDataURL('image/png')})
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
