import { FileRepository } from "@/domains/file/file.repository"
import { MINIO_BUCKET, minioClient } from "@/lib/minio"

export class MinioFileRepository implements FileRepository {
  async upload(
    file: Buffer,
    filename: string,
    mimeType: string
  ) {
    await minioClient.putObject(
      MINIO_BUCKET,
      filename,
      file,
      file.length,
      { "Content-Type": mimeType }
    )

    return {
      name: filename,
      size: file.length,
      mimeType,
    }
  }

  async getStream(name: string) {
    return minioClient.getObject(MINIO_BUCKET, name)
  }
}
