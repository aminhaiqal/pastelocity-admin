"use client"

import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconTrash } from "@tabler/icons-react"

interface FileUploaderProps {
  files: File[] 
  onFilesChange: (files: File[]) => void
  collectionSlug?: string
  onRemoteFilesChange?: (urls: string[]) => void
}

export default function FileUploader({
  files,
  onFilesChange,
  collectionSlug,
  onRemoteFilesChange,
}: FileUploaderProps) {
  const [remoteFiles, setRemoteFiles] = useState<string[]>([])

  // -------------------------------
  // Fetch remote files for collection
  // -------------------------------
useEffect(() => {
  if (!collectionSlug) return

  const fetchFiles = async () => {
    try {
      const res = await fetch(`/api/files/${collectionSlug}?list=true`)
      if (!res.ok) throw new Error("Failed to fetch remote files")
      const data: { url: string }[] = await res.json()

      const filtered = data.filter(f => {
        const pathAfterSlug = f.url.split(`/${collectionSlug}/`)[1]
        return pathAfterSlug && !pathAfterSlug.includes("/")
      })

      setRemoteFiles(filtered.map(f => f.url))
    } catch (err) {
      console.error(err)
    }
  }

  fetchFiles()
}, [collectionSlug])


  // -------------------------------
  // Dropzone
  // -------------------------------
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesChange([...files, ...acceptedFiles])
    },
    [files, onFilesChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  })

  // -------------------------------
  // Remove a local file
  // -------------------------------
  const removeLocalFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    onFilesChange(newFiles)
  }

  // -------------------------------
  // Remove a remote file
  // -------------------------------
  const removeRemoteFile = (index: number) => {
    const newRemoteFiles = [...remoteFiles]
    newRemoteFiles.splice(index, 1)
    setRemoteFiles(newRemoteFiles)
    onRemoteFilesChange?.(newRemoteFiles)
    // Optionally: call API to delete remote file from MinIO
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent>
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-muted hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-primary font-medium">Drop files here...</p>
          ) : (
            <p className="text-muted-foreground">
              Drag & drop files here, or click to select
            </p>
          )}
        </div>

        {/* File lists */}
        {(files.length > 0 || remoteFiles.length > 0) && (
          <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
            {/* Local files */}
            {files.map((file, idx) => (
              <div key={file.name + idx} className="flex justify-between items-center">
                <a
                  href={URL.createObjectURL(file)}
                  target="_blank"
                  className="text-primary underline break-all"
                >
                  {file.name}
                </a>
                <IconTrash
                  size={16}
                  className="cursor-pointer text-destructive"
                  onClick={() => removeLocalFile(idx)}
                />
              </div>
            ))}

            {/* Remote files */}
            {remoteFiles.map((fileUrl, idx) => (
              <div key={fileUrl + idx} className="flex justify-between items-center">
                <a
                  href={fileUrl}
                  target="_blank"
                  className="text-primary underline break-all"
                >
                  {fileUrl.split("/").pop()}
                </a>
                <IconTrash
                  size={16}
                  className="cursor-pointer text-destructive"
                  onClick={() => removeRemoteFile(idx)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Clear all local files */}
        {files.length > 0 && (
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => onFilesChange([])}
          >
            Clear All Files
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
