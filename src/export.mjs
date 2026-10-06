import { mkdir, mkdtemp, realpath, rename, rmdir, unlink, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import path from 'node:path'
import { normalizeProject } from './scene.mjs'
import { encodeSwf, encodeFloorSwf } from './swf.mjs'

export const DEFAULT_OUTPUT_DIRECTORY = path.join(homedir(), 'Downloads', 'IPZSK-SWF')
const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
const MAX_POSTER_BYTES = 8 * 1024 * 1024

export class ExportError extends Error {
  constructor(message, status = 400) {
    super(message)
    this.name = 'ExportError'
    this.status = status
  }
}

/** Keep Chinese titles while removing characters forbidden in Windows filenames. */
export function safeBasename(title) {
  let value = [...title.normalize('NFC').replace(/[<>:"/\\|?*\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ').trim()].slice(0, 60).join('').replace(/[. ]+$/g, '')
  if (!value || /^\.+$/.test(value)) value = 'SWF场景'
  if (/^(?:con|prn|aux|nul|com[1-9¹²³]|lpt[1-9¹²³])(?:\.|$)/i.test(value)) value = `_${value}`
  return value
}

function decodeBase64(value, expectedBytes, label) {
  const expectedLength = 4 * Math.ceil(expectedBytes / 3)
  if (typeof value !== 'string' || value.length !== expectedLength
    || !/^[A-Za-z0-9+/]*={0,2}$/.test(value)) {
    throw new ExportError(`${label}数据无效，请刷新预览后重新导出。`)
  }
  const bytes = Buffer.from(value, 'base64')
  if (bytes.length !== expectedBytes || bytes.toString('base64') !== value) {
    throw new ExportError(`${label}数据与画面尺寸不一致，请重新导出。`)
  }
  return bytes
}

/** Validate the PNG container and dimensions without loading another image runtime. */
function decodePoster(value, project) {
  if (value === undefined) return undefined
  const prefix = 'data:image/png;base64,'
  if (typeof value !== 'string' || !value.startsWith(prefix)) throw new ExportError('预览封面必须为 PNG 图片。')
  const encoded = value.slice(prefix.length)
  if (!encoded.length || encoded.length > 4 * Math.ceil(MAX_POSTER_BYTES / 3)
    || !/^[A-Za-z0-9+/]*={0,2}$/.test(encoded)) throw new ExportError('预览封面数据无效或超过 8 MB。')
  const bytes = Buffer.from(encoded, 'base64')
  if (bytes.toString('base64') !== encoded || bytes.length < 45 || !bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new ExportError('预览封面必须为有效的 PNG 图片。')
  }
  let cursor = 8, imageData = false, ended = false
  while (cursor < bytes.length) {
    if (cursor + 12 > bytes.length) throw new ExportError('PNG 封面文件不完整。')
    const size = bytes.readUInt32BE(cursor), type = bytes.toString('ascii', cursor + 4, cursor + 8)
    if (size > bytes.length - cursor - 12) throw new ExportError('PNG 封面文件不完整。')
    if (cursor === 8) {
      if (type !== 'IHDR' || size !== 13 || bytes.readUInt32BE(cursor + 8) !== project.width
        || bytes.readUInt32BE(cursor + 12) !== project.height) throw new ExportError('PNG 封面尺寸与工程不一致。')
    } else if (type === 'IHDR') throw new ExportError('PNG 封面结构无效。')
    if (type === 'IDAT' && size > 0) imageData = true
    cursor += size + 12
    if (type === 'IEND') {
      if (size !== 0 || cursor !== bytes.length) throw new ExportError('PNG 封面结构无效。')
      ended = true
      break
    }
  }
  if (!imageData || !ended) throw new ExportError('PNG 封面文件不完整。')
  return bytes
}

async function writeAtomic(filename, data) {
  const temporary = `${filename}.tmp`
  try {
    await writeFile(temporary, data, { flag: 'wx', mode: 0o600 })
    // The parent directory was exclusively created by mkdtemp for this export.
    await rename(temporary, filename)
  } catch (error) {
    await unlink(temporary).catch(() => {})
    throw error
  }
}

/** Export one validated scene into its own new directory; existing exports are never reused. */
export async function exportProject(payload, { outputDirectory = DEFAULT_OUTPUT_DIRECTORY } = {}) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new ExportError('导出内容必须为工程对象。')
  let project
  try { project = normalizeProject(payload.project) } catch (error) {
    throw new ExportError(error instanceof Error ? error.message : '工程内容无效。')
  }
  const pixelBytes = project.width * project.height * 4
  const background = decodeBase64(payload.background, pixelBytes, '背景图层')
  const foreground = decodeBase64(payload.foreground, pixelBytes, '文字图层')
  const poster = decodePoster(payload.poster, project)
  const sprites = project.profile==='floorled' ? [0,1,2].map(i=>decodeBase64(payload.sprites?.[i],48*48*4,'动效图层')) : undefined
  const swf = project.profile==='floorled' ? encodeFloorSwf({...project,background,foreground,sprites}) : encodeSwf({ ...project, background, foreground })
  const basename = safeBasename(project.title)
  let directory
  const written = []
  try {
    const root = path.resolve(outputDirectory)
    await mkdir(root, { recursive: true })
    directory = await realpath(await mkdtemp(path.join(root, `${basename}-`)))
    const absolutePath = path.join(directory, `${basename}.swf`)
    const projectPath = path.join(directory, 'project.json')
    const posterPath = poster ? path.join(directory, 'preview.png') : undefined
    for (const [filename, contents] of [
      [absolutePath, swf], [projectPath, `${JSON.stringify(project, null, 2)}\n`],
      ...(posterPath ? [[posterPath, poster]] : []),
    ]) {
      await writeAtomic(filename, contents)
      written.push(filename)
    }
    return { absolutePath, projectPath, ...(posterPath ? { posterPath } : {}), bytes: swf.length,
      width: project.width, height: project.height, fps: project.fps, duration: project.duration }
  } catch (error) {
    // Clean up only paths allocated by this failed export; older exports are untouched.
    await Promise.allSettled(written.map(filename => unlink(filename)))
    if (directory) await rmdir(directory).catch(() => {})
    throw new ExportError('无法保存导出文件，请检查下载文件夹是否可写、磁盘空间是否充足。', 500)
  }
}
