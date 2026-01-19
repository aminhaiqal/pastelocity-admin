"use client"

import { useEffect, useState, useTransition } from "react"
import {
  Collection,
  CreateCollection,
  UpdateCollection,
} from "@/domains/catalog"
import {
  listCollectionsAction,
  createCollectionAction,
  updateCollectionAction,
  deleteCollectionAction,
} from "@/actions/collections"

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [isPending, startTransition] = useTransition()

  // Load collections on mount
  useEffect(() => {
    startTransition(async () => {
      const data = await listCollectionsAction()
      setCollections(data)
    })
  }, [])

  // Create collection
  function createCollection(input: CreateCollection) {
    startTransition(async () => {
      const created = await createCollectionAction(input)
      setCollections((prev) => [...prev, created])
    })
  }

  // Update collection
  function updateCollection(id: number, input: Omit<UpdateCollection, "id">) {
    startTransition(async () => {
      const updated = await updateCollectionAction({ id, ...input })
      setCollections((prev) =>
        prev.map((c) => (c.id === id ? updated : c))
      )
    })
  }

  // Delete collection
  function deleteCollection(id: number) {
    startTransition(async () => {
      await deleteCollectionAction(id)
      setCollections((prev) => prev.filter((c) => c.id !== id))
    })
  }

  return {
    collections,
    isPending,
    createCollection,
    updateCollection,
    deleteCollection,
  }
}
