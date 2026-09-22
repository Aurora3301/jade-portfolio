import fs from 'node:fs/promises'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import sharp from 'sharp'
const source = process.argv[2]
if (!source) throw new Error('Usage: npm run media -- /absolute/path/to/jade_web')
const out = path.resolve('public/media')
await fs.mkdir(out, { recursive: true })
const groups = {
  eggy: 'Branding/eggy - Rebranding Century Egg',
  daynight: 'Branding/白夜製作 - Branding for Drama Production',
  gutter: 'Branding/gutter',
  glimmera: 'entertainment:concept/Glimmera - Disney Immagineering Competition 2025',
  marine: 'entertainment:concept/The Unseen Marine',
  landing: 'landing page animation',
  logo: 'logo',
}
const manifest = {}
for (const [group, folder] of Object.entries(groups)) {
  manifest[group] = []
  const files = (await fs.readdir(path.join(source, folder), { recursive: true })).sort()
  for (const file of files) {
    if (!/\.(png|jpg|jpeg|gif|mp4|mov)$/i.test(file)) continue
    const input = path.join(source, folder, file)
    const video = /\.(mp4|mov)$/i.test(file)
    const name = `${group}-${manifest[group].length}.${video ? 'mp4' : 'webp'}`
    const output = path.join(out, name)
    if (video) {
      execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', input, '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease:force_divisible_by=2', '-c:v', 'libx264', '-preset', 'fast', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', ...(group === 'landing' ? ['-an'] : ['-c:a', 'aac', '-b:a', '128k']), output])
    } else {
      await sharp(input).rotate().resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true }).webp({ quality: 83 }).toFile(output)
    }
    manifest[group].push(name)
    console.log(`${file} -> ${name}`)
  }
}
await fs.mkdir('src', { recursive: true })
await fs.writeFile('src/media-manifest.json', JSON.stringify(manifest, null, 2) + '\n')
await fs.writeFile('public/media/source-map.json', JSON.stringify(groups, null, 2) + '\n')
execFileSync('ffmpeg', ['-y', '-v', 'error', '-ss', '1', '-i', path.join(out, manifest.landing[0]), '-frames:v', '1', path.join(out, 'home-poster.webp')])
