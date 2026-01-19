"use server"

import { collectionService } from "@/services/collection.service"
import { CreateCollection, UpdateCollection } from "@/domains/catalog"

// READ
export async function listCollectionsAction() {
  return collectionService.listCollections()
}

// CREATE
export async function createCollectionAction(input: CreateCollection) {
  return collectionService.createCollection(input)
}

// UPDATE
export async function updateCollectionAction(input: UpdateCollection) {
  return collectionService.updateCollection(input)
}

// DELETE
export async function deleteCollectionAction(id: number) {
  return collectionService.deleteCollection(id)
}
