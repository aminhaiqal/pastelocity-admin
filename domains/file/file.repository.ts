import { FileObject } from "./file.entity"

export interface FileRepository {
  upload(
    buffer: Buffer,
    path: string,
    mimeType: string
  ): Promise<FileObject>

  getStream(path: string): Promise<NodeJS.ReadableStream>

  list(prefix?: string): Promise<FileObject[]>
  delete(path: string): Promise<void>
}
