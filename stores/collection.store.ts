import { create } from "zustand"
import { Collection, CreateCollection, UpdateCollection } from "@/domains/catalog"
import {
    listCollectionsAction,
    createCollectionAction,
    updateCollectionAction,
    deleteCollectionAction,
} from "@/actions/collections"

interface CollectionState {
    collections: Collection[]
    isLoading: boolean
    collectionMap: Record<number, Collection>

    fetchCollections: () => Promise<void>
    createCollection: (input: CreateCollection) => Promise<Collection>
    updateCollection: (id: number, input: Omit<UpdateCollection, "id">) => Promise<Collection>
    deleteCollection: (id: number) => Promise<void>
}

export const useCollectionStore = create<CollectionState>((set) => ({
    collections: [],
    isLoading: false,
    collectionMap: {},

    // Fetch collections from backend
    fetchCollections: async () => {
        set({ isLoading: true })
        try {
        const data = await listCollectionsAction()
        const map: Record<number, Collection> = {}
        data.forEach((c) => (map[c.id] = c))
        set({ collections: data, collectionMap: map })
        } catch (err) {
        console.error(err)
        } finally {
        set({ isLoading: false })
        }
    },

    // Create collection
    createCollection: async (input) => {
        const newCollection = await createCollectionAction(input)
        set((state) => ({ collections: [...state.collections, newCollection] }))
        return newCollection
    },

    // Update collection
    updateCollection: async (id, input) => {
        const updated = await updateCollectionAction({ id, ...input })
        set((state) => ({
            collections: state.collections.map((c) => (c.id === id ? updated : c)),
        }))
        return updated
    },

    // Delete collection
    deleteCollection: async (id) => {
        await deleteCollectionAction(id)
        set((state) => ({
            collections: state.collections.filter((c) => c.id !== id),
        }))
    },
}))
