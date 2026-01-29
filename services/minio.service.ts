import { FileObject } from "@/domains/file/file.entity"
import { FileRepository } from "@/domains/file/file.repository"
import { MINIO_BUCKET, minioClient } from "@/lib/minio"
import { Readable } from "stream"

export class MinioFileRepository implements FileRepository {
  // Existing buffer upload
  async upload(file: Buffer, path: string, mimeType: string) {
    await minioClient.putObject(MINIO_BUCKET, path, file, file.length, {
      "Content-Type": mimeType,
    })

    return {
      name: path.split("/").pop()!,
      path,
      size: file.length,
      mimeType,
    }
  }

  async uploadStream(stream: Readable, path: string, mimeType: string) {
    await minioClient.putObject(MINIO_BUCKET, path, stream, undefined, {
      "Content-Type": mimeType,
    })

    return {
      name: path.split("/").pop()!,
      path,
      size: 0,
      mimeType,
    }
  }

  async getStream(name: string) {
    return minioClient.getObject(MINIO_BUCKET, name)
  }

  async list(prefix = ""): Promise<FileObject[]> {
    const stream = minioClient.listObjectsV2(MINIO_BUCKET, prefix, true)
    const files: FileObject[] = []

    for await (const obj of stream) {
      if (!obj.name) continue
      files.push({
        name: obj.name.split("/").pop()!,
        path: obj.name,
        size: obj.size,
        mimeType: obj.metaData?.["content-type"],
      })
    }

    return files
  }

  async delete(path: string): Promise<void> {
    await minioClient.removeObject(MINIO_BUCKET, path)
  }
}
