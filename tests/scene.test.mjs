import test from 'node:test'
import assert from 'node:assert/strict'
import { templates, categories, defaultProject, normalizeProject } from '../src/scene.mjs'
import { supportedArts } from '../src/decorations.mjs'

test('all banquet presets round-trip without changing user text', () => {
  assert.equal(templates.length, 60)
  for (const t of templates) {
    const p = defaultProject(t.id)
    p.title = '小木 & 夏日 <爱> "一生"'
    assert.deepEqual(normalizeProject(JSON.parse(JSON.stringify(p))), p)
  }
})
test('catalogue has unique IDs, complete editable fields and all requested event groups', () => {
  assert.equal(new Set(templates.map(t => t.id)).size, 60)
  assert.equal(new Set(templates.map(t => t.name)).size, 60)
  assert.deepEqual([...new Set(templates.map(t => t.art))].sort(), [...supportedArts].sort())
  assert.deepEqual(Object.fromEntries(categories.map(category => [category, templates.filter(t => t.category === category).length])), {
    '婚礼婚庆': 8, '升学谢师': 6, '生日寿宴': 6, '宝宝成长': 6, '家庭团聚': 6,
    '同学战友': 4, '商务庆典': 6, '餐厅经营': 4, '传统节日': 6, '主题派对': 4, '人生喜事': 4,
  })
  for (const t of templates) {
    assert.match(t.id, /^[a-z][a-z0-9-]*$/)
    for (const field of ['title','subtitle','detail','footer','name','description','kicker']) assert.ok(t[field]?.trim(), `${t.id}: ${field}`)
    for (const field of ['bg','ink','accent']) assert.match(t[field], /^#[a-f\d]{6}$/i)
    assert.ok(['classic','arch','banner','seal','ribbon'].includes(t.layout || 'classic'))
  }
})
test('previously exported template IDs remain editable with their original colours', () => {
  const original = { 'wedding-rose':'#743d50', 'wedding-red':'#ffe2a2', birthday:'#315b77', celebration:'#f4dfa9', graduation:'#f8efd9', welcome:'#36524a' }
  for (const [template, color] of Object.entries(original)) assert.equal(defaultProject(template).color, color)
})
test('rejects invalid imported projects and excessive rendering resources', () => {
  const p = defaultProject()
  for (const override of [{template:'../../etc'}, {title:''}, {title:'长'.repeat(121)}, {color:'url(test)'}, {font:'arbitrary'}, {duration:99999}, {width:1920,height:1920}, {fps:60}, {motion:'script'}]) {
    assert.throws(() => normalizeProject({...p,...override}))
  }
  assert.doesNotThrow(() => normalizeProject({...p,width:1080,height:1920}))
})
