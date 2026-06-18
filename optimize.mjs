import sharp from 'sharp'
import { readdirSync } from 'fs'
import path from 'path'

const dir = './src/assets'

// Фотографии PNG -> JPG (с ресайзом), уже-JPG пересжать, логотипы PNG оптимизировать.
const photosToJpg = [
  ['case-food.png', 1100],
  ['case-showroom.png', 1100],
  ['case-3d-ocean.png', 1100],
  ['case-parking.png', 1100],
  ['solution-floor.png', 1400],
  ['process-roller.png', 1400],
]
const jpgRecompress = [
  ['hero-warehouse.jpg', 1920],
  ['pain-concrete.jpg', 1400],
]
const logos = [
  ['logo-polimersfera.png', 640],
  ['logo-lendingsfera.png', 512],
]

for (const [f, w] of photosToJpg) {
  const out = path.join(dir, f.replace('.png', '.jpg'))
  await sharp(path.join(dir, f)).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(out)
  console.log('JPG', out)
}
for (const [f, w] of jpgRecompress) {
  const buf = await sharp(path.join(dir, f)).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toBuffer()
  await sharp(buf).toFile(path.join(dir, f))
  console.log('JPG~', f)
}
for (const [f, w] of logos) {
  const buf = await sharp(path.join(dir, f)).resize({ width: w, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer()
  await sharp(buf).toFile(path.join(dir, f))
  console.log('PNG', f)
}
console.log('--- sizes ---')
for (const f of readdirSync(dir)) {
  const { size } = await import('fs').then(m => m.statSync(path.join(dir, f)))
  console.log((size / 1024).toFixed(0).padStart(6), 'KB', f)
}
