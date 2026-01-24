import { NextRequest, NextResponse } from "next/server"
import { MinioFileRepository } from "@/services/minio.service"
import {
  DeleteFileUseCase,
  DownloadFileUseCase,
} from "@/domains/file/file.usecase"

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params
  const { slug } = params
  const repo = new MinioFileRepository()

  const url = new URL(req.url)
  const list = url.searchParams.get("list")

  try {
    if (list === "true") {
      const files = await repo.list(slug)
      return NextResponse.json(
        files.map(f => ({
          url: `https://storage.pastelocity.com.my/public/${f.path}`,
        }))
      )
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
    return NextResponse.json(
      { error: err.message || "Not found" },
      { status: 404 }
    )
  }
}

// -------------------------
// DELETE /api/files/[slug]
// -------------------------
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params
  const { path } = await req.json()

  if (!path) {
    return NextResponse.json(
      { error: "path is required" },
      { status: 400 }
    )
  }

  if (!path.startsWith(`${slug}/`)) {
    return NextResponse.json(
      { error: "Invalid path for this collection" },
      { status: 400 }
    )
  }

  const repo = new MinioFileRepository()
  const useCase = new DeleteFileUseCase(repo)

  try {
    await useCase.execute(path)
    return new NextResponse(null, { status: 204 })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to delete file" },
      { status: 500 }
    )
  }
}
