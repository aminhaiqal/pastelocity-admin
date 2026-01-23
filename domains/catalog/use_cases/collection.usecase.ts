import { CollectionFormValues } from "@/components/collections/collection-form"
import { collectionService } from "@/services/collection.service"
import { Collection } from "@/domains/catalog"

export interface AddOrEditCollectionParams {
  values: CollectionFormValues
  editingCollection?: Collection | null
  file?: File | null
}

export const addOrEditCollection = async ({
  values,
  editingCollection,
  file,
}: AddOrEditCollectionParams) => {
  try {
    let uploadedFilePath: string | null = null

    // Upload image only if user selected a file
    if (file) {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("File upload failed")

      const data = await res.json()
      uploadedFilePath = data.url
    }

    if (editingCollection?.id) {
      const payload = {
        id: editingCollection.id,
        name: values.name,
        description: values.description ?? "",
        is_available: values.isAvailable ?? false,
        image: uploadedFilePath ?? editingCollection.image ?? undefined,
      }

      const result = await collectionService.updateCollection(payload)
      return { message: "Collection updated", collection: result }
    } else {
      const payload = {
        name: values.name,
        description: values.description ?? "",
        is_available: values.isAvailable ?? false,
        image: uploadedFilePath ?? undefined,
      }

      const result = await collectionService.createCollection(payload)
      return { message: "Collection added", collection: result }
    }
  } catch (err: any) {
    console.error(err)
    throw new Error(err?.message || "Failed to save collection")
  }
}
