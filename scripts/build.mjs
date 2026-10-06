// Offline bundler for this plugin's named ESM exports; React is supplied by the host.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
const files=['templates','decorations','floor','scene','motion','styles','studio','client']
const factories=[]
for(const id of files){
  let source=await readFile(`src/${id}.mjs`,'utf8'),names=[]
  source=source.replace(/export\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g,(_,fields,dep)=>`Object.assign(module.exports, require(${JSON.stringify(dep.replace('./','').replace('.mjs',''))}));`)
  source=source.replace(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g,(_,fields,dep)=>`const {${fields}}=require(${JSON.stringify(dep.replace('./','').replace('.mjs',''))});`)
  source=source.replace(/export\s+(const|function|class)\s+(\w+)/g,(_,kind,name)=>{names.push(name);return `${kind} ${name}`})
  if(/\b(?:import|export)\s/.test(source.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g,'')))throw new Error(`Unsupported ESM in ${id}`)
  factories.push(`${JSON.stringify(id)}:(module,exports,require)=>{\n${source}\nObject.assign(module.exports,{${names.join(',')}});\n}`)
}
const output=`window.__ModuleLoader__.load({id:"dsh-swf-studio",factory:(hostRequire)=>{\nconst factories={${factories.join(',\n')}};\nconst cache={};function require(id){if(id==='react')return hostRequire(id);if(cache[id])return cache[id].exports;const m=cache[id]={exports:{}};factories[id](m,m.exports,require);return m.exports}\nreturn require('client');}});\n`
await mkdir('lib',{recursive:true});await writeFile('lib/client.js',output)
console.log('Built lib/client.js (offline, React external)')
