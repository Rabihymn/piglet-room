import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const ROOT = process.cwd()
const PUBLIC_DIR = path.join(ROOT, 'public')

const WIDTHS = [480, 768, 1200, 1600]
const QUALITY = 78

const IMAGE_EXT_RE = /\.(png|jpe?g)$/i
const ALREADY_OPT_RE = /\.w\d+\.webp$/i

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      yield* walk(p)
    } else if (e.isFile()) {
      yield p
    }
  }
}

function outPathFor(filePath, width) {
  const dir = path.dirname(filePath)
  const base = path.basename(filePath).replace(IMAGE_EXT_RE, '')
  return path.join(dir, `${base}.w${width}.webp`)
}

async function fileExists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function optimizeOne(filePath) {
  const rel = path.relative(PUBLIC_DIR, filePath)
  const img = sharp(filePath, { failOn: 'none' })
  const meta = await img.metadata()

  if (!meta.width) return { rel, generated: 0, skipped: WIDTHS.length }

  let generated = 0
  let skipped = 0

  for (const w of WIDTHS) {
    const target = outPathFor(filePath, w)
    if (await fileExists(target)) {
      skipped++
      continue
    }
    const resizeW = Math.min(w, meta.width)
    await img
      .clone()
      .resize({ width: resizeW, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(target)
    generated++
  }

  return { rel, generated, skipped }
}

async function runPool(items, worker, concurrency = 4) {
  let i = 0
  const results = []
  const workers = Array.from({ length: concurrency }, async () => {
    while (i < items.length) {
      const idx = i++
      results[idx] = await worker(items[idx])
    }
  })
  await Promise.all(workers)
  return results
}

const args = new Set(process.argv.slice(2))
const dryRun = args.has('--dry-run')
const concurrencyArg = [...args].find(a => a.startsWith('--concurrency='))
const concurrency = concurrencyArg ? Number(concurrencyArg.split('=')[1]) : 4

async function main() {
  const files = []
  for await (const p of walk(PUBLIC_DIR)) {
    if (ALREADY_OPT_RE.test(p)) continue
    if (!IMAGE_EXT_RE.test(p)) continue
    files.push(p)
  }

  if (dryRun) {
    console.log(`Found ${files.length} images in public/`)
    process.exit(0)
  }

  console.log(`Optimizing ${files.length} images → webp variants (${WIDTHS.join(', ')}w), concurrency=${concurrency}`)

  const results = await runPool(files, optimizeOne, concurrency)

  const totals = results.reduce(
    (acc, r) => {
      acc.generated += r.generated
      acc.skipped += r.skipped
      return acc
    },
    { generated: 0, skipped: 0 }
  )

  console.log(`Done. Generated: ${totals.generated}, skipped(existing): ${totals.skipped}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

