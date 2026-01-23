import { FileRepository } from "@/domains/file/file.repository"
import { UploadFileUseCase } from "@/domains/file/file.usecase"


describe("UploadFileUseCase", () => {
  it("uploads file via repository", async () => {
    const mockRepo: FileRepository = {
      upload: jest.fn().mockResolvedValue({
        name: "test.txt",
        size: 4,
        mimeType: "text/plain",
      }),
      getStream: jest.fn(),
    }

    const useCase = new UploadFileUseCase(mockRepo)

    const result = await useCase.execute(
      Buffer.from("test"),
      "test.txt",
      "text/plain"
    )

    expect(mockRepo.upload).toHaveBeenCalled()
    expect(result.name).toBe("test.txt")
  })
})
