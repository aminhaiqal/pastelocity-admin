import { FileRepository } from "@/domains/file/file.repository"
import { MINIO_BUCKET, minioClient } from "@/lib/minio"

export class MinioFileRepository implements FileRepository {
  async upload(
    file: Buffer,
    path: string,
    mimeType: string
  ) {
    await minioClient.putObject(
      MINIO_BUCKET,
      path,
      file,
      file.length,
      { "Content-Type": mimeType }
    )

    return {
      name: path.split("/").pop()!,
      path,
      size: file.length,
      mimeType,
    }
  }

  async getStream(name: string) {
    return minioClient.getObject(MINIO_BUCKET, name)
  }

  async list(prefix = "") {
    const stream = minioClient.listObjectsV2(
      MINIO_BUCKET,
      prefix,
      true
    )

    const files: any[] = []

    for await (const obj of stream) {
      files.push({
        name: obj.name.split("/").pop(),
        path: obj.name,
        size: obj.size,
        mimeType: obj.metaData?.["content-type"],
      })
    }

    return files
  }

}
