import manifest from './media-manifest.json'
export const media = (path: string) => `${import.meta.env.BASE_URL}media/${path}`
export const assets = manifest as Record<string, string[]>
