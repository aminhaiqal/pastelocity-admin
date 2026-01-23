import { FileRepository } from "./file.repository"

export class UploadFileUseCase {
  constructor(private readonly repo: FileRepository) {}

  async execute(
    buffer: Buffer,
    filename: string,
    mimeType: string
  ) {
    return this.repo.upload(buffer, filename, mimeType)
  }
}

export class DownloadFileUseCase {
  constructor(private readonly repo: FileRepository) {}

  async execute(filename: string) {
    return this.repo.getStream(filename)
  }
}