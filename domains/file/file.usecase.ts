import { FileRepository } from "./file.repository"

export class UploadFileUseCase {
  constructor(private readonly repo: FileRepository) {}

  async execute(
    buffer: Buffer,
    path: string,
    mimeType: string
  ) {
    return this.repo.upload(buffer, path, mimeType)
  }
}

export class DownloadFileUseCase {
  constructor(private readonly repo: FileRepository) {}

  async execute(path: string) {
    return this.repo.getStream(path)
  }
}

export class ListCollectionFilesUseCase {
  constructor(private repo: FileRepository) {}

  execute(collectionSlug: string) {
    return this.repo.list(`${collectionSlug}/`)
  }
}

export class DeleteFileUseCase {
  constructor(private readonly repo: FileRepository) {}

  async execute(path: string): Promise<void> {
    await this.repo.delete(path)
  }
}