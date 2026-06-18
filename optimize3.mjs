import sharp from 'sharp'
import { readFileSync } from 'fs'
const buf = await sharp(readFileSync('./assets/solution-floor-new.png'))
  .resize({ width: 1400, withoutEnlargement: true })
  .jpeg({ quality: 80, mozjpeg: true })
  .toBuffer()
await sharp(buf).toFile('./src/assets/solution-floor.jpg')
console.log('done', (buf.length / 1024).toFixed(0), 'KB')
