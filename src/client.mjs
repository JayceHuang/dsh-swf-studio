import { createElement, useState, useEffect } from 'react'
import { mountStudio } from './studio.mjs'
export const inject = ['slots']
export function apply(ctx) {
  const draft = {}
  function Entry({wide}) {
    const [open, setOpen] = useState(false)
    useEffect(() => open ? mountStudio(() => setOpen(false), draft) : undefined, [open])
    return createElement('button', {
      type:'button', 'aria-label':'SWF 场景工坊', title:'SWF 场景工坊', onClick:()=>setOpen(true),
      style:{display:'flex',alignItems:'center',gap:8,width:'100%',padding:'9px 12px',background:'transparent',border:0,borderRadius:8,color:'inherit',cursor:'pointer',textAlign:'left',font:'inherit'},
    }, createElement('span', {'aria-hidden':true,style:{fontSize:11,border:'1px solid currentColor',borderRadius:4,padding:'1px 3px'}},'SWF'),wide ? '场景工坊' : null)
  }
  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({ name:'sidebar.footer.action', id:'swf-studio',order:50 },Entry))
}
