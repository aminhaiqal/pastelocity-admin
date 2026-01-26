"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Upload } from "lucide-react"
import { sanitizeText } from "@/utils/helper"

interface FileUploaderProps {
  collectionSlug?: string
  onFileUploaded?: (url: string) => void
}


export default function FileUploader({ collectionSlug, onFileUploaded }: FileUploaderProps) {
  const [localFiles, setLocalFiles] = useState<File[]>([])
  const [remoteFiles, setRemoteFiles] = useState<string[]>([])
  const [isDragActive, setIsDragActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // -------------------------------
  // Helpers
  // -------------------------------
const getFileName = (fileOrUrl: string | File) => {
  if (typeof fileOrUrl === "string") return fileOrUrl.split("/").pop() || fileOrUrl
  return fileOrUrl.name
}

  const filterTopLevelFiles = (data: { url: string }[]) =>
    data.filter(f => {
      const pathAfterSlug = f.url.split(`/${collectionSlug}/`)[1]
      return pathAfterSlug && !pathAfterSlug.includes("/")
    })

  const extractPathFromUrl = (url: string) => {
    const idx = url.indexOf(`/${collectionSlug}/`)
    return idx === -1 ? url : url.slice(idx + 1)
  }

  // -------------------------------
  // Fetch remote files
  // -------------------------------
  useEffect(() => {
    if (!collectionSlug) return

    const fetchFiles = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/files/${collectionSlug}?list=true`)
        if (!res.ok) throw new Error("Failed to fetch remote files")

        const data: { url: string }[] = await res.json()
        const topLevel = filterTopLevelFiles(data)
        setRemoteFiles(topLevel.map(f => f.url))
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFiles()
  }, [collectionSlug])

  // -------------------------------
  // Upload handler
  // -------------------------------
const handleUpload = async () => {
  if (!localFiles.length || !collectionSlug) return

  try {
    setIsLoading(true)

    const formData = new FormData()
    localFiles.forEach(file => {
      const safeName = sanitizeText(file.name)
      formData.append("file", file)
      formData.append("path", `${collectionSlug}/${safeName}`)
    })

    const res = await fetch("/api/files/upload", { method: "POST", body: formData })
    if (!res.ok) throw new Error("Upload failed")

    // Normalize response as an array
    const uploaded = await res.json()
    const uploadedUrls = Array.isArray(uploaded) ? uploaded : [uploaded]

    // Add uploaded files to remoteFiles state
    setRemoteFiles(prev => [...prev, ...uploadedUrls])
    setLocalFiles([])

    // Call callback with first uploaded file
    if (onFileUploaded && uploadedUrls.length) {
      onFileUploaded(uploadedUrls[0])
    }
  } catch (err) {
    console.error(err)
    alert("Failed to upload files")
  } finally {
    setIsLoading(false)
  }
}

  // -------------------------------
  // Drag & Drop handlers
  // -------------------------------
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    if (droppedFiles.length > 0) {
      setLocalFiles(prev => [...prev, ...droppedFiles])
    }
  }

  // -------------------------------
  // Remove handlers
  // -------------------------------
  const removeLocalFile = (index: number) => {
    setLocalFiles(prev => prev.filter((_, i) => i !== index))
  }
  const removeRemoteFile = async (index: number) => {
    const url = remoteFiles[index]
    if (!url || isLoading || !collectionSlug) return

    const path = extractPathFromUrl(url)

    try {
      setIsLoading(true)

      const res = await fetch(`/api/files/${collectionSlug}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      })

      if (!res.ok) throw new Error("Failed to delete remote file")

      const updated = remoteFiles.filter((_, i) => i !== index)
      setRemoteFiles(updated)
    } catch (err) {
      console.error(err)
      alert("Failed to delete file")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent className="space-y-4">
        {/* Dropzone */}
        <div
          onDragEnter={e => { e.preventDefault(); setIsDragActive(true) }}
          onDragOver={e => e.preventDefault()}
          onDragLeave={e => { e.preventDefault(); setIsDragActive(false) }}
          onDrop={handleDrop}
          onClick={!isLoading ? () => document.getElementById("file-input")?.click() : undefined}
          className={`border-2 border-dashed rounded-md p-6 text-center transition
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        `}
        >
          <input
            id="file-input"
            type="file"
            multiple
            hidden
            onChange={e => {
              const selectedFiles = e.target.files
              if (!selectedFiles) return
              setLocalFiles(prev => [...prev, ...Array.from(selectedFiles)])
            }}
          />
          Drag & drop files here, or click to select
        </div>

        {/* Files */}
        {localFiles.length > 0 && (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {localFiles.map((file, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="break-all">{file.name}</span>
                <Trash2
                  className="cursor-pointer text-red-600 hover:text-red-700"
                  onClick={() => removeLocalFile(i)}
                />
              </div>
            ))}
          </div>
        )}

        {remoteFiles.length > 0 && (
          <div className="space-y-2 max-h-60 overflow-y-auto mt-2">
            {remoteFiles.map((url, i) => (
              <div key={i} className="flex justify-between items-center">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {getFileName(url)}
                </a>
                <Trash2
                  size={20}
                  className="cursor-pointer text-red-600 hover:text-red-700"
                  onClick={() => removeRemoteFile(i)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {localFiles.length > 0 && (
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => setLocalFiles([])}
              disabled={isLoading}
            >
              Clear
            </Button>

            <Button
              onClick={handleUpload}
              disabled={isLoading || !collectionSlug}
              className="flex gap-2"
            >
              <Upload size={16} />
              Upload
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )

}
