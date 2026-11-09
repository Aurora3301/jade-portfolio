import { projects, coverFor, imagesFor, videosFor } from './publishedProjects'
import manifest from './publishedManifest.json'
import type { LayoutBlock, Project, SitePage } from '../types/portfolio'

export const mediaUrl = (file: string) => `${import.meta.env.BASE_URL}media/${file}`
const imageBlock = (file: string, title: string): LayoutBlock => ({ id: file, type: 'image', src: mediaUrl(file), alt: `${title} — design study` })

function projectBlocks(project: (typeof projects)[number]): LayoutBlock[] {
  const cover = coverFor(project)
  const gallery = imagesFor(project).filter(file => file !== cover)
  if (project.slug === 'gutter') {
    const details = project.details ?? []
    return [
      { id: 'intro', type: 'text', content: project.hook },
      ...(cover ? [imageBlock(cover, project.title)] : []),
      ...project.sections.map((section, i): LayoutBlock => ({ id: `section-${i}`, type: 'text', title: section.title, content: section.text })),
      ...videosFor(project).map((file): LayoutBlock => ({ id: file, type: 'video', src: mediaUrl(file), alt: `${project.title} — project film`, poster: cover ? mediaUrl(cover) : undefined })),
      ...['gutter-0.webp', 'gutter-1.webp'].map(file => imageBlock(file, project.title)),
      { id: 'detail-0', type: 'text', title: details[0]?.title, content: details[0]?.text, disclosure: details[0]?.disclosure },
      imageBlock('gutter-2.webp', project.title),
      { id: 'detail-1', type: 'text', title: details[1]?.title, content: details[1]?.text, disclosure: details[1]?.disclosure },
      imageBlock('gutter-3.webp', project.title),
      ...['gutter-5.gif', 'gutter-8.gif'].map(file => imageBlock(file, project.title)),
    ]
  }
  return [
    { id: 'intro', type: 'text', content: project.hook },
    ...(cover ? [imageBlock(cover, project.title)] : []),
    ...project.sections.map((section, i): LayoutBlock => ({ id: `section-${i}`, type: 'text', title: section.title, content: section.text })),
    ...videosFor(project).map((file): LayoutBlock => ({ id: file, type: 'video', src: mediaUrl(file), alt: `${project.title} — project film`, poster: cover ? mediaUrl(cover) : undefined })),
    ...gallery.slice(0, 2).map(file => imageBlock(file, project.title)),
    ...(project.details ?? []).map((section, i): LayoutBlock => ({ id: `detail-${i}`, type: 'text', title: section.title, content: section.text })),
    ...gallery.slice(2).map(file => imageBlock(file, project.title)),
  ]
}

export const publishedProjects: Project[] = projects.filter(project => !project.hidden).map(project => {
  const cover = coverFor(project)
  return {
    slug: project.slug,
    title: project.title,
    category: project.category,
    cover_image: cover ? mediaUrl(cover) : null,
    context: [project.meta, project.credit].filter(Boolean).join('\n\n'),
    pending: project.pending,
    subtitle: project.pending ? project.hook : undefined,
    blocks: projectBlocks(project),
  }
})

export const publishedHome: SitePage = {
  slug: 'home', title: 'Jade L. — design portfolio',
  blocks: manifest.landing.map((file): LayoutBlock => ({ id: file, type: 'video', src: mediaUrl(file), poster: mediaUrl('home-poster.webp'), alt: 'Jade’s design and dining projects' })),
}

export function publishedPage(slug: string): SitePage {
  if (slug === 'home') return publishedHome
  if (slug === 'about') return { slug, title: 'About me', blocks: [] }
  throw new Error(`Page not found: ${slug}`)
}
