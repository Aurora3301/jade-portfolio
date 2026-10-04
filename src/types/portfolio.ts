export type BlockType = 'text' | 'image' | 'gallery' | 'video' | 'link' | 'spacer' | 'contact'

export interface GridLayout {
  desktop: { column: number; span: number }
  tablet: { column: number; span: number }
  mobile: { column: number; span: number }
}

export interface LayoutBlock {
  id: string
  type: BlockType
  content?: string
  title?: string
  src?: string
  alt?: string
  poster?: string
  assetIds?: string[]
  items?: Array<{ src: string; alt: string }>
  layout?: GridLayout
}

export interface ProjectSummary {
  category?: string
  pending?: boolean
  subtitle?: string
  slug: string
  title: string
  cover_image: string | null
}

export interface Project extends ProjectSummary {
  blocks: LayoutBlock[]
  context?: string
}

export interface SitePage {
  slug: string
  title: string
  blocks: LayoutBlock[]
}

export interface Revision {
  id: number
  status: 'draft' | 'published'
  blocks: LayoutBlock[]
  created_at: string
}
