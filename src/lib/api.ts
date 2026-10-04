import type { Project, ProjectSummary, Revision, SitePage } from '../types/portfolio'
import { publishedProjects, publishedPage } from './publishedContent'

// GitHub Pages serves the checked-in portfolio without a backend.
const usePublishedContent = true

function csrfToken(): string | undefined {
  return document.cookie.split('; ').find((item) => item.startsWith('csrftoken='))?.split('=')[1]
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const method = init?.method ?? 'GET'
  if (!['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(method)) await fetch('/api/auth/csrf', { credentials: 'include' })
  const response = await fetch(`/api/${path}`, { credentials: 'include', ...init, headers: { 'Content-Type': 'application/json', ...(csrfToken() ? { 'X-CSRFToken': csrfToken() } : {}), ...(init?.headers ?? {}) } })
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json() as Promise<T>
}

export const getProject = async (slug: string): Promise<Project> => {
  if (!usePublishedContent) return request<Project>(`public/projects/${slug}`)
  const project = publishedProjects.find(item => item.slug === slug)
  if (!project) throw new Error(`Project not found: ${slug}`)
  return project
}
export const getProjects = async (): Promise<ProjectSummary[]> => usePublishedContent ? publishedProjects : request<ProjectSummary[]>('public/projects')
export const getSitePage = async (slug: string): Promise<SitePage> => usePublishedContent ? publishedPage(slug) : request<SitePage>(`public/site-pages/${slug}`)
export const getDraft = (id: string) => request<{ id: number; blocks: Project['blocks'] }>(`editor/projects/${id}/draft`)
export const saveDraft = (id: string, blocks: Project['blocks']) => request(`editor/projects/${id}/draft`, { method: 'PATCH', body: JSON.stringify({ blocks }) })
export const publishDraft = (id: string) => request(`editor/projects/${id}/publish`, { method: 'POST', body: '{}' })
export const getRevisions = (id: string) => request<Revision[]>(`editor/projects/${id}/revisions`)
export const rollbackRevision = (projectId: string, revisionId: number) => request<Revision>(`editor/projects/${projectId}/revisions/${revisionId}/rollback`, { method: 'POST', body: '{}' })
export const submitEnquiry = (payload: { name: string; email: string; message: string }) => request('contact/enquiries', { method: 'POST', body: JSON.stringify(payload) })
