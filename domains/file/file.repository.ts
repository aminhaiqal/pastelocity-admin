import { FileObject } from "./file.entity"

export interface FileRepository {
  upload(
    file: Buffer,
    filename: string,
    mimeType: string
  ): Promise<FileObject>

  getStream(name: string): Promise<NodeJS.ReadableStream>
}
