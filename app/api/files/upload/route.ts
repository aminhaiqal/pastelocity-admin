import { NextResponse } from "next/server"
import { MinioFileRepository } from "@/services/minio.service"
import { UploadFileUseCase } from "@/domains/file/file.usecase"

export async function POST(req: Request) {
  const formData = await req.formData()

  const file = formData.get("file") as File | null
  const path = formData.get("path") as string | null

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 })
  }

  const objectName = path && !path.includes("..")
    ? path
    : file.name

  const buffer = Buffer.from(await file.arrayBuffer())

  const repo = new MinioFileRepository()
  const useCase = new UploadFileUseCase(repo)

  const result = await useCase.execute(
    buffer,
    objectName,
    file.type
  )

  return NextResponse.json({
    name: result.name,
    size: result.size,
    mimeType: result.mimeType,
    url: `/api/files/${result.name}`,
  })
}
