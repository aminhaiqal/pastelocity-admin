"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface FileUploaderProps {
  files: File[]
  onFilesChange: (files: File[]) => void
  collectionSlug?: string
  onRemoteFilesChange?: (urls: string[]) => void
  onRemoteFileDelete?: (path: string) => Promise<void>
}

export default function FileUploader({
  files,
  onFilesChange,
  collectionSlug,
  onRemoteFilesChange,
  onRemoteFileDelete,
}: FileUploaderProps) {
  const [remoteFiles, setRemoteFiles] = useState<string[]>([])
  const [isDragActive, setIsDragActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // -------------------------------
  // Helpers
  // -------------------------------
  const getFileName = (url: string) => url.split("/").pop() || url

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
  // Manual Drag & Drop handlers
  // -------------------------------
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    if (droppedFiles.length > 0) {
      onFilesChange([...files, ...droppedFiles])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      onFilesChange([...files, ...Array.from(selectedFiles)])
    }
  }

  // -------------------------------
  // Remove handlers
  // -------------------------------
  const removeLocalFile = (index: number) => {
    const updated = [...files]
    updated.splice(index, 1)
    onFilesChange(updated)
  }

  const removeRemoteFile = async (index: number) => {
    const url = remoteFiles[index]
    if (!url || isLoading) return

    const path = extractPathFromUrl(url)

    try {
      setIsLoading(true)

      if (onRemoteFileDelete) {
        await onRemoteFileDelete(path)
      }

      const updated = remoteFiles.filter((_, i) => i !== index)
      setRemoteFiles(updated)
      onRemoteFilesChange?.(updated)
    } catch (err) {
      console.error("Failed to delete remote file", err)
      alert("Failed to delete file. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // -------------------------------
  // Subcomponents
  // -------------------------------
  const FileList = ({
    files,
    onRemove,
    isRemote = false,
  }: {
    files: (File | string)[]
    onRemove: (index: number) => void
    isRemote?: boolean
  }) => (
    <>
      {files.map((file, idx) => {
        const url = isRemote ? (file as string) : URL.createObjectURL(file as File)
        const name = isRemote ? getFileName(file as string) : (file as File).name
        return (
          <div key={name + idx} className="flex justify-between items-center gap-2">
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all flex-1">
              {name}
            </a>
            <Trash2
              size={16}
              className="cursor-pointer text-red-600 hover:text-red-700 flex-shrink-0"
              onClick={() => onRemove(idx)}
            />
          </div>
        )
      })}
    </>
  )

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent>
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={!isLoading ? () => document.getElementById("file-input")?.click() : undefined}
          className={`border-2 border-dashed rounded-md p-6 text-center transition ${isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            } ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
            }`}
        >
          <input
            id="file-input"
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className={isDragActive ? "text-blue-600 font-medium" : "text-gray-600"}>
            {isDragActive ? "Drop files here..." : "Drag & drop files here, or click to select"}
          </p>
        </div>

        {(files.length > 0 || remoteFiles.length > 0) && (
          <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
            <FileList files={files} onRemove={removeLocalFile} />
            <FileList files={remoteFiles} onRemove={removeRemoteFile} isRemote />
          </div>
        )}

        {files.length > 0 && (
          <Button className="mt-4" variant="outline" onClick={() => onFilesChange([])}>
            Clear All Files
          </Button>
        )}
      </CardContent>
    </Card>
  )
}