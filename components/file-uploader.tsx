"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FileUploaderProps {
  file?: File | null
  onFileSelect: (file: File | null) => void
  initialFileUrl?: string // optional, for edit mode
}

export default function FileUploader({ file, onFileSelect, initialFileUrl }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFileSelect(acceptedFiles[0] || null) // only support single file
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // single file only
  })

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
            <p className="text-primary font-medium">Drop file here...</p>
          ) : (
            <p className="text-muted-foreground">
              Drag & drop a file here, or click to select
            </p>
          )}
        </div>

        {/* Show selected file or initial file URL */}
        {(file || initialFileUrl) && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Selected file:
            </p>
            <a
              href={file ? URL.createObjectURL(file) : initialFileUrl}
              target="_blank"
              className="text-primary underline break-all"
            >
              {file ? file.name : initialFileUrl?.split("/").pop()}
            </a>
          </div>
        )}

        {/* Clear button */}
        {(file || initialFileUrl) && (
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => onFileSelect(null)}
          >
            Clear File
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
