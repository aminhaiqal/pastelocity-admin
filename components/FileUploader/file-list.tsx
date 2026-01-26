import React from "react"
import { Trash2 } from "lucide-react"
import { getFileName } from "./utils"

interface FileListProps {
  localFiles: File[]
  remoteFiles: string[]
  removeLocalFile: (index: number) => void
  removeRemoteFile: (index: number) => void
}

export default function FileList({
  localFiles,
  remoteFiles,
  removeLocalFile,
  removeRemoteFile,
}: FileListProps) {
  return (
    <>
      {localFiles.length > 0 && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {localFiles.map((file, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="break-all">{file.name}</span>
              <Trash2
                size={20}
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
    </>
  )
}
