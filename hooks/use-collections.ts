"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
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

// Hook to manage collections
export function useCollections() {
  const queryClient = useQueryClient()

  // -----------------------------
  // Query: list collections
  // -----------------------------
  const { data: collections = [], isLoading, isFetching } = useQuery<Collection[]>({
    queryKey: ["collections"],
    queryFn: listCollectionsAction,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })

  // -----------------------------
  // Mutations: create/update/delete
  // -----------------------------
  const createCollection = useMutation({
    mutationFn: (input: CreateCollection) => createCollectionAction(input),
    onSuccess: (newCollection) => {
      // Update cached collections
      queryClient.setQueryData<Collection[]>(["collections"], (old = []) => [...old, newCollection])
    },
  })

  const updateCollection = useMutation({
    mutationFn: ({ id, input }: { id: number; input: Omit<UpdateCollection, "id"> }) =>
      updateCollectionAction({ id, ...input }),
    onSuccess: (updatedCollection) => {
      queryClient.setQueryData<Collection[]>(["collections"], (old = []) =>
        old.map((c) => (c.id === updatedCollection.id ? updatedCollection : c))
      )
    },
  })

  const deleteCollection = useMutation({
    mutationFn: (id: number) => deleteCollectionAction(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Collection[]>(["collections"], (old = []) =>
        old.filter((c) => c.id !== id)
      )
    },
  })

  return {
    collections,
    isLoading,
    isFetching,
    createCollection,
    updateCollection,
    deleteCollection,
    refetch: () => queryClient.invalidateQueries({ queryKey: ["collections"] })
  }
}
