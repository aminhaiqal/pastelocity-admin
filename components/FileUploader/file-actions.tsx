import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface FileActionsProps {
  isLoading: boolean
  localFilesLength: number
  onClear: () => void
  onUpload: () => void
}

export default function FileActions({ isLoading, localFilesLength, onClear, onUpload }: FileActionsProps) {
  if (localFilesLength === 0) return null

  return (
    <div className="flex gap-2 mt-2">
      <Button variant="outline" onClick={onClear} disabled={isLoading}>Clear</Button>
      <Button onClick={onUpload} disabled={isLoading} className="flex gap-2">
        <Upload size={16} />
        Upload
      </Button>
    </div>
  )
}
