import { DownloadFileUseCase } from "@/domains/file/file.usecase"
import { MinioFileRepository } from "@/services/minio.service"

export async function GET(
  _req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const repo = new MinioFileRepository()
    const useCase = new DownloadFileUseCase(repo)

    const stream = await useCase.execute(params.name)

    return new Response(stream as any, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `inline; filename="${params.name}"`,
      },
    })
  } catch {
    return new Response("File not found", { status: 404 })
  }
}
