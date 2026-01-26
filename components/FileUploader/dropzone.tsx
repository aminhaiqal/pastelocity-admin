interface DropzoneProps {
  isDragActive: boolean
  isLoading: boolean
  onFilesAdded: (files: File[]) => void
  onDragEnter: () => void
  onDragLeave: () => void
}

export default function Dropzone({
  isDragActive,
  isLoading,
  onFilesAdded,
  onDragEnter,
  onDragLeave,
}: DropzoneProps) {
  return (
    <div
      onDragEnter={e => { e.preventDefault(); onDragEnter() }}
      onDragOver={e => e.preventDefault()}
      onDragLeave={e => { e.preventDefault(); onDragLeave() }}
      onDrop={e => {
        e.preventDefault()
        onDragLeave()
        const files = Array.from(e.dataTransfer.files)
        if (files.length) onFilesAdded(files)
      }}
      onClick={!isLoading ? () => document.getElementById("file-input")?.click() : undefined}
      className={`border-2 border-dashed rounded-md p-6 text-center transition
        ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
        ${isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <input
        id="file-input"
        type="file"
        multiple
        hidden
        onChange={e => {
          const files = e.target.files
          if (!files) return
          onFilesAdded(Array.from(files))
        }}
      />
      Drag & drop files here, or click to select
    </div>
  )
}
