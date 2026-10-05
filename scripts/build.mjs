import { build } from 'tsdown'
await build({
  entry: { client: 'src/client.mjs' }, outDir: 'lib', format: 'cjs', platform: 'browser',
  dts: false, sourcemap: false, clean: true,
  deps: { neverBundle: ['react'] },
  outputOptions: {
    entryFileNames: 'client.js',
    banner: 'window.__ModuleLoader__.load({ id: "dsh-swf-studio", factory: (require) => {',
    intro: 'var module = { exports: {} }; var exports = module.exports;',
    footer: 'return module.exports; } });',
  },
})
