import { existsSync } from 'node:fs'
import { publishedProjects, publishedHome } from '../publishedContent'
import manifest from '../publishedManifest.json'
import { projects } from '../publishedProjects'

describe('published media restoration', () => {
  it('renders every original project media file exactly once and preserves its cover', () => {
    for (const source of projects.filter(p => p.group)) {
      const project = publishedProjects.find(p => p.slug === source.slug)!
      const expected = (manifest as Record<string, string[]>)[source.group!]
      const actual = project.blocks.filter(b => b.src).map(b => b.src!.split('/').pop())
      expect(actual.sort()).toEqual([...expected].sort())
      expect(project.cover_image).toContain(source.cover)
      expect(project.context).toContain(source.credit)
    }
  })
  it('includes the six landing films in the published rotation order with a poster', () => {
    expect(publishedHome.blocks.map(b => b.src!.split('/').pop())).toEqual(manifest.landing)
    expect(publishedHome.blocks.every(b => b.poster?.endsWith('home-poster.webp'))).toBe(true)
  })
  it('has every referenced asset on disk and retains the pending project', () => {
    for (const file of [...Object.values(manifest).flat(), 'home-poster.webp']) expect(existsSync(`public/media/${file}`)).toBe(true)
    expect(publishedProjects.find(p => p.slug === 'from-the-ground')?.pending).toBe(true)
  })
})
