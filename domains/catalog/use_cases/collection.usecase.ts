import { CollectionFormValues } from "@/components/collections/collection-form"
import { collectionService } from "@/services/collection.service"
import { Collection, CreateCollection, UpdateCollection } from "@/domains/catalog"

export interface AddOrEditCollectionParams {
  values: CollectionFormValues
  editingCollection?: Collection | null
  image?: string
}

export const addOrEditCollection = async ({
  values,
  editingCollection,
  image,
}: AddOrEditCollectionParams) => {
  try {
    // ------------------------
    // UPDATE
    // ------------------------
    if (editingCollection?.id) {
      const payload: UpdateCollection = {
        id: editingCollection.id,
        ...basePayload(values, image ?? editingCollection.image),
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


const basePayload = (values: CollectionFormValues, image?: string) => ({
  name: values.name,
  description: values.description ?? "",
  is_available: values.isAvailable ?? false,
  image,
})