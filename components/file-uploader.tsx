"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconTrash } from "@tabler/icons-react"

interface FileUploaderProps {
  files: File[]
  onFilesChange: (files: File[]) => void
  initialFileUrls?: string[]
}

export default function FileUploader({ files, onFilesChange, initialFileUrls }: FileUploaderProps) {
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

  // Remove a file by index
  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    onFilesChange(newFiles)
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent>
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

        {/* List uploaded files */}
        {(files.length > 0 || initialFileUrls?.length) && (
          <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
            {[...files].map((file, idx) => (
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
                  onClick={() => removeFile(idx)}
                />
              </div>
            ))}

            {/* initial file URLs (read-only, optional) */}
            {initialFileUrls?.map((url, idx) => (
              <div key={url + idx} className="flex justify-between items-center">
                <a href={url} target="_blank" className="text-primary underline break-all">
                  {url.split("/").pop()}
                </a>
                <IconTrash
                  size={16}
                  className="cursor-pointer text-destructive"
                  onClick={() => {
                    // optional: if you want to allow removing initial files
                    const newInitials = initialFileUrls.filter((_, i) => i !== idx)
                    // If you lift initialFileUrls to parent, call a setter here
                  }}
                />
              </div>
            ))}
          </div>
        )}

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
