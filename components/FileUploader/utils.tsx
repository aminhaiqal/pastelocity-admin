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
