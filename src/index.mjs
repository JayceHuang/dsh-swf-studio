import path from 'node:path'
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import manifest from '../package.json' with { type: 'json' }
import { DEFAULT_OUTPUT_DIRECTORY, ExportError, exportProject } from './export.mjs'

export const name = 'swf-studio'
export const inject = ['connection']
export const MAX_REQUEST_BYTES = 30 * 1024 * 1024

async function readJson(request) {
  if (request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
    throw new ExportError('请使用 JSON 格式提交工程。', 415)
  }
  const declared = request.headers.get('content-length')
  if (declared !== null && Number(declared) > MAX_REQUEST_BYTES) throw new ExportError('导出数据超过 30 MB，请降低画面尺寸。', 413)
  if (!request.body) throw new ExportError('缺少导出工程内容。')
  const reader = request.body.getReader(), chunks = []
  let total = 0
  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      total += value.byteLength
      if (total > MAX_REQUEST_BYTES) {
        // Connection closes unread streams after sending the error response.
        throw new ExportError('导出数据超过 30 MB，请降低画面尺寸。', 413)
      }
      chunks.push(value)
    }
  } finally { reader.releaseLock() }
  try {
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks, total)))
  } catch (error) { throw new ExportError('无法读取工程 JSON，请重新导出。') }
}

function failure(error) {
  const expected = error instanceof ExportError
  return Response.json({ error: expected ? error.message : '导出失败，请重新尝试。' }, { status: expected ? error.status : 500 })
}

/** Open only the configured output directory, with arguments passed directly to the OS. */
export async function revealOutputDirectory(outputDirectory, { platform = process.platform, spawnProcess = spawn } = {}) {
  const command = platform === 'darwin' ? '/usr/bin/open' : platform === 'win32' ? 'explorer.exe' : undefined
  if (!command) throw new ExportError('当前系统不支持直接打开文件夹，请复制输出路径。', 501)
  const directory = path.resolve(outputDirectory)
  try {
    await mkdir(directory, { recursive: true })
    await new Promise((resolve, reject) => {
      const child = spawnProcess(command, [directory], { stdio: 'ignore', detached: true, windowsHide: true, shell: false })
      child.once('error', reject)
      child.once('spawn', () => { child.unref(); resolve() })
    })
  } catch (error) { throw new ExportError('无法打开输出文件夹，请复制路径后手动打开。', 500) }
  return { outputDirectory: directory }
}

/** Exact Connection routes inherit Host authentication and the owning plugin's lifetime. */
export function createRoutes({ outputDirectory = DEFAULT_OUTPUT_DIRECTORY } = {}) {
  let busy = false
  return [
    { path: '/api/dsh-swf-studio/config', methods: ['GET'], requestBody: 'buffered',
      fetch: async () => Response.json({ outputDirectory: path.resolve(outputDirectory), version: manifest.version, platform: process.platform }) },
    { path: '/api/dsh-swf-studio/export', methods: ['POST'], requestBody: 'streaming',
      fetch: async request => {
        if (busy) return Response.json({ error: '正在导出，请等待当前任务完成。' }, { status: 409 })
        busy = true
        try {
          const payload = await readJson(request)
          return Response.json(await exportProject(payload, { outputDirectory }))
        } catch (error) { return failure(error) } finally { busy = false }
      } },
    { path: '/api/dsh-swf-studio/reveal', methods: ['POST'], requestBody: 'streaming',
      fetch: async request => {
        try {
          const payload = await readJson(request)
          if (!payload || typeof payload !== 'object' || Array.isArray(payload) || Object.keys(payload).length !== 0) {
            throw new ExportError('此操作只支持打开固定的导出文件夹。')
          }
          return Response.json(await revealOutputDirectory(outputDirectory))
        } catch (error) { return failure(error) }
      } },
  ]
}

export function apply(ctx) {
  for (const route of createRoutes()) ctx.connection.fetch.register(route)
}
