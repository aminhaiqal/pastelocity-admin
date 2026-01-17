"use server"

import { catalogMutations, catalogQueries } from "@/domains/catalog"
import { Collection, CollectionList, CreateCollection, UpdateCollection } from "@/domains/catalog"

const STRATEGY = process.env.PRODUCT_SEED_STRATEGY || "memory"

class CollectionService {
  private inMemoryCollections: Collection[] = []

  constructor() {}

  // -------------------
  // CRUD Operations
  // -------------------

  async createCollection(input: CreateCollection): Promise<Collection> {
    if (STRATEGY === "memory") {
      const newCollection: Collection = {
        id: this.inMemoryCollections.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: input.name,
        slug: input.name.toLowerCase().replace(/\s+/g, "-"),
        description: input.description,
        image: input.image,
        isAvailable: input.isAvailable,
        products: [],
      }
      this.inMemoryCollections.push(newCollection)
      return newCollection
    }
    return catalogMutations.createCollection(input)
  }

  async getCollection(id: number): Promise<Collection | undefined> {
    if (STRATEGY === "memory") {
      return this.inMemoryCollections.find(c => c.id === id)
    }
    return catalogQueries.getCollection(id)
  }

  async listCollections(): Promise<Collection[]> {
    if (STRATEGY === "memory") return this.inMemoryCollections
    // Fetch all collections with products
    const lists: CollectionList[] = await catalogQueries.listCollections()
    const fullCollections: Collection[] = []
    for (const c of lists) {
      const col = await catalogQueries.getCollection(c.id)
      fullCollections.push(col)
    }
    return fullCollections
  }

  async updateCollection(input: UpdateCollection): Promise<Collection> {
    if (STRATEGY === "memory") {
      const index = this.inMemoryCollections.findIndex(c => c.id === input.id)
      if (index === -1) throw new Error(`Collection ${input.id} not found in memory`)
      const updated: Collection = {
        ...this.inMemoryCollections[index],
        ...input,
        updatedAt: new Date().toISOString(),
      }
      this.inMemoryCollections[index] = updated
      return updated
    }
    return catalogMutations.updateCollection(input)
  }

  async deleteCollection(id: number): Promise<Collection | undefined> {
    if (STRATEGY === "memory") {
      const index = this.inMemoryCollections.findIndex(c => c.id === id)
      if (index === -1) throw new Error(`Collection ${id} not found in memory`)
      const [deleted] = this.inMemoryCollections.splice(index, 1)
      return deleted
    }
    return catalogMutations.deleteCollection(id)
  }

  // -------------------
  // Seed Collections
  // -------------------

  async seedCollections(collections: CreateCollection[]): Promise<Collection[]> {
    if (STRATEGY === "memory") {
      this.inMemoryCollections = collections.map((c, index) => ({
        id: this.inMemoryCollections.length + index + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: c.name,
        slug: c.name.toLowerCase().replace(/\s+/g, "-"),
        description: c.description,
        image: c.image,
        isAvailable: c.isAvailable,
        products: [],
      }))
      console.log(`[CollectionService] Seeded ${collections.length} collections in memory`)
      return this.inMemoryCollections
    } else if (STRATEGY === "db") {
      const created: Collection[] = []
      for (const c of collections) {
        const collection = await catalogMutations.createCollection(c)
        created.push(collection)
      }
      console.log(`[CollectionService] Seeded ${collections.length} collections in DB`)
      return created
    } else {
      throw new Error(`[CollectionService] Unknown strategy: ${STRATEGY}`)
    }
  }

  clearMemory() {
    this.inMemoryCollections = []
  }
}

// Export singleton
export const collectionService = new CollectionService()
