import manifest from '../package.json' with { type: 'json' }
import assert from 'node:assert/strict'
import { mkdtemp, readFile, readdir, realpath, rm, stat, writeFile } from 'node:fs/promises'
import { EventEmitter } from 'node:events'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { deflateSync } from 'node:zlib'
import { defaultProject, normalizeProject } from '../src/scene.mjs'
import { exportProject, safeBasename } from '../src/export.mjs'
import { apply, createRoutes, MAX_REQUEST_BYTES, revealOutputDirectory } from '../src/index.mjs'

function payload(title = '我们结婚啦') {
  const project = { ...defaultProject(), title, width: 320, height: 240, fps: 12, duration: 2 }
  return { project, background: Buffer.alloc(320 * 240 * 4, 255).toString('base64'),
    foreground: Buffer.alloc(320 * 240 * 4).toString('base64') }
}
function request(body) {
  return new Request('http://localhost/api/dsh-swf-studio/export', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
  })
}
async function fixture(t) {
  const directory = await mkdtemp(path.join(tmpdir(), 'swf-export-test-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  return realpath(directory)
}
function png(width, height) {
  function crc32(bytes) {
    let crc = 0xffffffff
    for (const byte of bytes) {
      crc ^= byte
      for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1))
    }
    return (crc ^ 0xffffffff) >>> 0
  }
  function chunk(type, data) {
    const body = Buffer.concat([Buffer.from(type), data]), head = Buffer.alloc(4), tail = Buffer.alloc(4)
    head.writeUInt32BE(data.length); tail.writeUInt32BE(crc32(body))
    return Buffer.concat([head, body, tail])
  }
  const header = Buffer.alloc(13)
  header.writeUInt32BE(width); header.writeUInt32BE(height, 4); header[8] = 8; header[9] = 6
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', header),
    chunk('IDAT', deflateSync(Buffer.alloc((width * 4 + 1) * height))), chunk('IEND', Buffer.alloc(0))])
}

test('persists a Chinese-titled SWF and reloadable project at real absolute paths', async t => {
  const outputDirectory = await fixture(t), input = payload()
  input.poster = `data:image/png;base64,${png(320, 240).toString('base64')}`
  const result = await exportProject(input, { outputDirectory })
  assert.equal(path.isAbsolute(result.absolutePath), true)
  assert.equal(path.basename(result.absolutePath), '我们结婚啦.swf')
  assert.equal((await stat(result.absolutePath)).size, result.bytes)
  assert.match((await readFile(result.absolutePath)).toString('ascii', 0, 3), /^(FWS|CWS)$/)
  assert.deepEqual(JSON.parse(await readFile(result.projectPath, 'utf8')), normalizeProject(input.project))
  assert.deepEqual(await readFile(result.posterPath), png(320, 240))
  assert.deepEqual([result.width, result.height, result.fps, result.duration], [320, 240, 12, 2])
  assert.equal((await readdir(path.dirname(result.absolutePath))).some(name => name.endsWith('.tmp')), false)
})

test('exports use separate directories and preserve older exports', async t => {
  const outputDirectory = await fixture(t), input = payload()
  const first = await exportProject(input, { outputDirectory })
  await writeFile(first.absolutePath, 'prior export')
  const second = await exportProject(input, { outputDirectory })
  assert.notEqual(first.absolutePath, second.absolutePath)
  assert.equal(await readFile(first.absolutePath, 'utf8'), 'prior export')
})

test('safe names retain Chinese and neutralize traversal and Windows devices', async t => {
  assert.equal(safeBasename('CON'), '_CON')
  assert.equal(safeBasename('nul.txt'), '_nul.txt')
  assert.equal(safeBasename('LPT1.'), '_LPT1')
  assert.equal(safeBasename('COM¹'), '_COM¹')
  assert.equal(safeBasename('..'), 'SWF场景')
  const outputDirectory = await fixture(t)
  const result = await exportProject(payload('../../中文:喜宴?'), { outputDirectory })
  assert.equal(path.relative(outputDirectory, result.absolutePath).startsWith('..' + path.sep), false)
  assert.doesNotMatch(path.basename(result.absolutePath), /[<>:"/\\|?*]/)
  assert.match(path.basename(result.absolutePath), /中文/)
})

test('rejects invalid project, dimensions, malformed base64 and non-PNG posters before writing', async t => {
  const outputDirectory = await fixture(t)
  for (const make of [
    () => null, () => [], () => ({ ...payload(), project: { ...payload().project, width: 3000 } }),
    () => ({ ...payload(), project: { ...payload().project, title: 'x'.repeat(121) } }),
    () => ({ ...payload(), project: { ...payload().project, motion: 'execute' } }),
    () => ({ ...payload(), background: 'not base64' }),
    () => ({ ...payload(), foreground: Buffer.alloc(4).toString('base64') }),
    () => ({ ...payload(), poster: 'data:image/jpeg;base64,AAAA' }),
    () => ({ ...payload(), poster: 'data:image/png;base64,' + Buffer.from('<script>').toString('base64') }),
    () => ({ ...payload(), poster: 'data:image/png;base64,' + png(2, 2).toString('base64') }),
  ]) await assert.rejects(exportProject(make(), { outputDirectory }), error => error.status === 400)
  assert.deepEqual(await readdir(outputDirectory), [])
})

test('Connection registrations expose config and concise errors without stack traces', async t => {
  const outputDirectory = await fixture(t), [config, route] = createRoutes({ outputDirectory })
  const result = await (await config.fetch()).json()
  assert.equal(result.outputDirectory, path.resolve(outputDirectory))
  assert.equal(result.version, manifest.version); assert.equal(result.platform, process.platform)
  const response = await route.fetch(request({ project: {} }))
  assert.equal(response.status, 400)
  const error = await response.json()
  assert.deepEqual(Object.keys(error), ['error'])
  assert.doesNotMatch(error.error, /\n|Error:| at /)
  const installed = []
  apply({ connection: { fetch: { register: route => installed.push(route) } } })
  assert.deepEqual(installed.map(route => route.path), ['/api/dsh-swf-studio/config', '/api/dsh-swf-studio/export', '/api/dsh-swf-studio/reveal'])
  assert.equal(route.requestBody, 'streaming')
})

test('enforces 30 MiB while reading a streamed body regardless of Content-Length', async t => {
  const outputDirectory = await fixture(t), route = createRoutes({ outputDirectory })[1]
  const body = new ReadableStream({ start(controller) {
    controller.enqueue(new Uint8Array(MAX_REQUEST_BYTES))
    controller.enqueue(new Uint8Array(1))
    controller.close()
  } })
  const response = await route.fetch(new Request('http://localhost/api/dsh-swf-studio/export', {
    method: 'POST', headers: { 'content-type': 'application/json', 'content-length': '1' }, body, duplex: 'half',
  }))
  assert.equal(response.status, 413)
  assert.deepEqual(await readdir(outputDirectory), [])
})

test('returns 409 during an active request and releases the lock after success or failure', async t => {
  const outputDirectory = await fixture(t), route = createRoutes({ outputDirectory })[1]
  let stream
  const body = new ReadableStream({ start(controller) { stream = controller } })
  const first = route.fetch(new Request('http://localhost/api/dsh-swf-studio/export', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body, duplex: 'half',
  }))
  assert.equal((await route.fetch(request(payload()))).status, 409)
  stream.enqueue(new TextEncoder().encode(JSON.stringify(payload()))); stream.close()
  assert.equal((await first).status, 200)
  assert.equal((await route.fetch(request(null))).status, 400)
  assert.equal((await route.fetch(request(payload()))).status, 200)
})

test('invalid JSON and unsupported content types fail without files', async t => {
  const outputDirectory = await fixture(t), route = createRoutes({ outputDirectory })[1]
  const malformed = new Request('http://localhost/api/dsh-swf-studio/export', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: '{bad',
  })
  assert.equal((await route.fetch(malformed)).status, 400)
  assert.equal((await route.fetch(new Request('http://localhost', { method: 'POST', body: 'x' }))).status, 415)
  assert.deepEqual(await readdir(outputDirectory), [])
})

test('folder reveal uses fixed direct arguments on Mac and Windows and rejects user paths', async t => {
  const outputDirectory = await fixture(t)
  for (const [platform, expectedCommand] of [['darwin', '/usr/bin/open'], ['win32', 'explorer.exe']]) {
    const calls = []
    await revealOutputDirectory(outputDirectory, { platform, spawnProcess(command, args, options) {
      calls.push({ command, args, options })
      const child = new EventEmitter()
      child.unref = () => {}
      queueMicrotask(() => child.emit('spawn'))
      return child
    } })
    assert.equal(calls[0].command, expectedCommand)
    assert.deepEqual(calls[0].args, [outputDirectory])
    assert.equal(calls[0].options.shell, false)
  }
  const reveal = createRoutes({ outputDirectory })[2]
  assert.equal((await reveal.fetch(request({ path: '/some/other/path', command: 'echo injected' }))).status, 400)
})
