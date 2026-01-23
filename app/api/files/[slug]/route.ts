import { NextRequest, NextResponse } from "next/server"
import { MinioFileRepository } from "@/services/minio.service"
import { DownloadFileUseCase } from "@/domains/file/file.usecase"

export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const params = await context.params
  const { slug } = params
  const repo = new MinioFileRepository()

  const url = new URL(req.url)
  const list = url.searchParams.get("list")

  try {
    if (list === "true") {
      const files = await repo.list(slug)
      return NextResponse.json(files.map(f => ({ url: `https://storage.pastelocity.com.my/public/${f.path}` })))
    } else {
      const useCase = new DownloadFileUseCase(repo)
      const stream = await useCase.execute(slug)
      return new Response(stream as any, {
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `inline; filename="${slug}"`,
        },
      })
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Not found" }, { status: 404 })
  }
}
