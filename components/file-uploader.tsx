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
  // Helpers
  // -------------------------------
  const getFileName = (url: string) => url.split("/").pop() || url

  const filterTopLevelFiles = (data: { url: string }[]) =>
    data.filter(f => {
      const pathAfterSlug = f.url.split(`/${collectionSlug}/`)[1]
      return pathAfterSlug && !pathAfterSlug.includes("/")
    })

  // -------------------------------
  // Fetch remote files
  // -------------------------------
  useEffect(() => {
    if (!collectionSlug) return

    const fetchFiles = async () => {
      try {
        const res = await fetch(`/api/files/${collectionSlug}?list=true`)
        if (!res.ok) throw new Error("Failed to fetch remote files")
        const data: { url: string }[] = await res.json()
        const topLevel = filterTopLevelFiles(data)
        setRemoteFiles(topLevel.map(f => f.url))
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
    (acceptedFiles: File[]) => onFilesChange([...files, ...acceptedFiles]),
    [files, onFilesChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  })

  // -------------------------------
  // Remove handlers
  // -------------------------------
  const removeLocalFile = (index: number) => {
    const updated = [...files]
    updated.splice(index, 1)
    onFilesChange(updated)
  }

  const removeRemoteFile = (index: number) => {
    const updated = [...remoteFiles]
    updated.splice(index, 1)
    setRemoteFiles(updated)
    onRemoteFilesChange?.(updated)
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
          <div key={name + idx} className="flex justify-between items-center">
            <a href={url} target="_blank" className="text-primary underline break-all">
              {name}
            </a>
            <IconTrash
              size={16}
              className="cursor-pointer text-destructive"
              onClick={() => onRemove(idx)}
            />
          </div>
        )
      })}
    </>
  )

  const DropzoneArea = () => (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition ${
        isDragActive ? "border-primary bg-primary/10" : "border-muted hover:border-primary"
      }`}
    >
      <input {...getInputProps()} />
      <p className={isDragActive ? "text-primary font-medium" : "text-muted-foreground"}>
        {isDragActive ? "Drop files here..." : "Drag & drop files here, or click to select"}
      </p>
    </div>
  )

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent>
        <DropzoneArea />

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
