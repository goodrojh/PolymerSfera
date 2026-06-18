import sharp from 'sharp'
import { renameSync, statSync, readdirSync } from 'fs'
import path from 'path'

const dir = './src/assets'

async function inPlace(file, fn) {
  const src = path.join(dir, file)
  const tmp = src + '.tmp'
  const buf = await fn(sharp(await import('fs').then(m => m.readFileSync(src)))).toBuffer()
  await sharp(buf).toFile(tmp)
  renameSync(tmp, src)
  console.log('OK', file)
}

await inPlace('hero-warehouse.jpg', s => s.resize({ width: 1920, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }))
await inPlace('pain-concrete.jpg', s => s.resize({ width: 1400, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }))
await inPlace('logo-polimersfera.png', s => s.resize({ width: 640, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true, quality: 90 }))
await inPlace('logo-lendingsfera.png', s => s.resize({ width: 512, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true, quality: 90 }))

console.log('--- sizes (KB) ---')
for (const f of readdirSync(dir)) {
  console.log((statSync(path.join(dir, f)).size / 1024).toFixed(0).padStart(6), f)
}
