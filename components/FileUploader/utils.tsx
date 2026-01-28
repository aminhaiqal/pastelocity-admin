import { sanitizeText } from "@/utils/helper"


export const getFileName = (fileOrUrl: string | File) => {
  if (typeof fileOrUrl === "string") return fileOrUrl.split("/").pop() || fileOrUrl
  return fileOrUrl.name
}

export const filterTopLevelFiles = (data: { url: string }[], collectionSlug?: string) =>
  data.filter(f => {
    if (!collectionSlug) return false
    const pathAfterSlug = f.url.split(`/${collectionSlug}/`)[1]
    return pathAfterSlug && !pathAfterSlug.includes("/")
  })

export const extractPathFromUrl = (url: string, collectionSlug?: string) => {
  if (!collectionSlug) return url
  const idx = url.indexOf(`/${collectionSlug}/`)
  return idx === -1 ? url : url.slice(idx + 1)
}

export const sanitizeFileName = (file: File) => sanitizeText(file.name)

export async function fetchRemoteFiles(uploadPath: string, allowedExtensions?: string[]) {
  try {
    const res = await fetch(`/api/files/${uploadPath}?list=true`)
    if (!res.ok) throw new Error("Failed to fetch remote files")

    const data: { url: string }[] = await res.json()
    const topLevel = filterTopLevelFiles(data, uploadPath)
    let urls = topLevel.map(f => f.url)

    // Filter by allowed extensions if provided
    if (allowedExtensions && allowedExtensions.length > 0) {
      const lowerExts = allowedExtensions.map(ext => ext.toLowerCase())
      urls = urls.filter(url =>
        lowerExts.some(ext => url.toLowerCase().endsWith(ext))
      )
    }

    return urls
  } catch (err) {
    console.error(err)
    throw err
  }
}
