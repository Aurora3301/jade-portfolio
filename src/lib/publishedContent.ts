import { projects, coverFor, imagesFor, videosFor } from './publishedProjects'
import manifest from './publishedManifest.json'
import type { LayoutBlock, Project, SitePage } from '../types/portfolio'

export const mediaUrl = (file: string) => `${import.meta.env.BASE_URL}media/${file}`
const imageBlock = (file: string, title: string): LayoutBlock => ({ id: file, type: 'image', src: mediaUrl(file), alt: `${title} — design study` })

export const publishedProjects: Project[] = projects.map(project => {
  const cover = coverFor(project)
  const gallery = imagesFor(project).filter(file => file !== cover)
  return {
    slug: project.slug,
    title: project.title,
    category: project.category,
    cover_image: cover ? mediaUrl(cover) : null,
    context: [project.meta, project.credit].filter(Boolean).join('\n\n'),
    pending: project.pending,
    subtitle: project.pending ? project.hook : undefined,
    blocks: [
      { id: 'intro', type: 'text', content: project.hook },
      ...(cover ? [imageBlock(cover, project.title)] : []),
      ...project.sections.map((section, i): LayoutBlock => ({ id: `section-${i}`, type: 'text', title: section.title, content: section.text })),
      ...videosFor(project).map((file): LayoutBlock => ({ id: file, type: 'video', src: mediaUrl(file), alt: `${project.title} — project film`, poster: cover ? mediaUrl(cover) : undefined })),
      ...gallery.slice(0, 2).map(file => imageBlock(file, project.title)),
      ...(project.details ?? []).map((section, i): LayoutBlock => ({ id: `detail-${i}`, type: 'text', title: section.title, content: section.text })),
      ...gallery.slice(2).map(file => imageBlock(file, project.title)),
    ],
  }
})

export const publishedHome: SitePage = {
  slug: 'home', title: 'Jade L. — design portfolio',
  blocks: manifest.landing.map((file): LayoutBlock => ({ id: file, type: 'video', src: mediaUrl(file), poster: mediaUrl('home-poster.webp'), alt: 'Jade’s design and dining projects' })),
}

export function publishedPage(slug: string): SitePage {
  if (slug === 'home') return publishedHome
  if (slug === 'about') return { slug, title: 'About Me', blocks: [{ id: 'holding', type: 'text', content: 'Stay tuned.' }] }
  throw new Error(`Page not found: ${slug}`)
}
