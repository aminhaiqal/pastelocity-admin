import { CollectionFormValues } from "@/components/collections/collection-form"
import { collectionService } from "@/services/collection.service"
import { Collection, CreateCollection, UpdateCollection } from "@/domains/catalog"
import { sanitizeText, toSlug } from "@/utils/helper"

export interface AddOrEditCollectionParams {
  values: CollectionFormValues
  editingCollection?: Collection | null
  files?: File[]
}

export const addOrEditCollection = async ({
  values,
  editingCollection,
  files = [],
}: AddOrEditCollectionParams) => {
  try {
    const collectionSlug = editingCollection
      ? editingCollection.slug
      : toSlug(values.name)

    const uploadedImage = files[0]
      ? await uploadCollectionImage(files[0], collectionSlug)
      : undefined

    const image = uploadedImage ?? editingCollection?.image

    // ------------------------
    // UPDATE
    // ------------------------
    if (editingCollection?.id) {
      const payload: UpdateCollection = {
        id: editingCollection.id,
        ...basePayload(values, image),
      }

      return {
        message: "Collection updated",
        collection: await collectionService.updateCollection(payload),
      }
    }

    // ------------------------
    // CREATE
    // ------------------------
    const payload: CreateCollection = basePayload(values, image)

    return {
      message: "Collection added",
      collection: await collectionService.createCollection(payload),
    }
  } catch (err: any) {
    console.error(err)
    throw new Error(err?.message || "Failed to save collection")
  }
}

const uploadCollectionImage = async (
  file: File,
  collectionSlug: string
): Promise<string> => {
  const safeName = sanitizeText(file.name)

  const formData = new FormData()
  formData.append("file", file)
  formData.append("path", `${collectionSlug}/${safeName}`)

  const res = await fetch("/api/files/upload", {
    method: "POST",
    body: formData,
  })

  if (!res.ok) throw new Error("File upload failed")

  const data = await res.json()
  return data.url as string
}

const basePayload = (values: CollectionFormValues, image?: string) => ({
  name: values.name,
  description: values.description ?? "",
  is_available: values.isAvailable ?? false,
  image,
})