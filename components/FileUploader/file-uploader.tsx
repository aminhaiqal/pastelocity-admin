"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Dropzone from "./dropzone"
import FileList from "./file-list"
import FileActions from "./file-actions"
import { filterTopLevelFiles, extractPathFromUrl, sanitizeFileName, fetchRemoteFiles } from "./utils"
import { sanitizeText } from "@/utils/helper"

interface FileUploaderProps {
  uploadPath?: string
}

export default function FileUploader({ uploadPath }: FileUploaderProps) {
  const [localFiles, setLocalFiles] = useState<File[]>([])
  const [remoteFiles, setRemoteFiles] = useState<string[]>([])
  const [isDragActive, setIsDragActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch remote files
  useEffect(() => {
    if (!uploadPath) return

    const fetchFiles = async () => {
      setIsLoading(true)
      try {
        // Pass allowed extensions if you want, or omit for all files
        const files = await fetchRemoteFiles(uploadPath, [".png", ".jpg", ".jpeg", ".gif", ".webp"])
        setRemoteFiles(files)
      } catch (err) {
        console.error("Failed to fetch remote files:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFiles()
  }, [uploadPath])

  // Upload handler
  const handleUpload = async () => {
    if (!localFiles.length || !uploadPath) return
    try {
      setIsLoading(true)
      const formData = new FormData()
      localFiles.forEach(file => {
      const safeName = sanitizeText(file.name)
      formData.append("file", file)
      formData.append("path", `${uploadPath}/${safeName}`)
    })
      const res = await fetch("/api/files/upload", { method: "POST", body: formData })
      if (!res.ok) throw new Error("Upload failed")
      const uploaded = await res.json()
      const uploadedUrls = Array.isArray(uploaded) ? uploaded : [uploaded]
      setRemoteFiles(prev => [...prev, ...uploadedUrls])
      setLocalFiles([])
    } catch (err) {
      console.error(err)
      alert("Failed to upload files")
    } finally {
      setIsLoading(false)
    }
  }

  // Remove handlers
  const removeLocalFile = (index: number) => setLocalFiles(prev => prev.filter((_, i) => i !== index))
  const removeRemoteFile = async (index: number) => {
    if (!uploadPath) return
    const path = extractPathFromUrl(remoteFiles[index], uploadPath)
    try {
      setIsLoading(true)
      const res = await fetch(`/api/files/${uploadPath}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      })
      if (!res.ok) throw new Error("Failed to delete remote file")
      setRemoteFiles(prev => prev.filter((_, i) => i !== index))
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
        <Dropzone
          isDragActive={isDragActive}
          isLoading={isLoading}
          onFilesAdded={files => setLocalFiles(prev => [...prev, ...files])}
          onDragEnter={() => setIsDragActive(true)}
          onDragLeave={() => setIsDragActive(false)}
        />
        <FileList
          localFiles={localFiles}
          remoteFiles={remoteFiles}
          removeLocalFile={removeLocalFile}
          removeRemoteFile={removeRemoteFile}
        />
        <FileActions
          isLoading={isLoading}
          localFilesLength={localFiles.length}
          onClear={() => setLocalFiles([])}
          onUpload={handleUpload}
        />
      </CardContent>
    </Card>
  )
}
