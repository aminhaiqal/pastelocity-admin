import {
  createCollection as dbCreateCollection,
  updateCollection as dbUpdateCollection,
  deleteCollection as dbDeleteCollection,
  getCollection as dbGetCollection,
  listCollections as dbListCollections,
} from "@/domains/catalog"
import { Collection, CollectionList, CreateCollection, UpdateCollection } from "@/domains/catalog"


class CollectionService {
  private inMemoryCollections: Collection[] = []

  constructor() {}

  // -------------------
  // CRUD Operations
  // -------------------

  async createCollection(input: CreateCollection): Promise<Collection> {
    if (process.env.PRODUCT_SEED_STRATEGY === "memory") {
      const newCollection: Collection = {
        id: this.inMemoryCollections.length + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        name: input.name,
        slug: input.name.toLowerCase().replace(/\s+/g, "-"),
        description: input.description,
        image: input.image,
        is_available: input.is_available,
        products: [],
      }
      this.inMemoryCollections.push(newCollection)
      return newCollection
    }
    return dbCreateCollection(input)
  }

  async getCollection(id: number): Promise<Collection | undefined> {
    if (process.env.PRODUCT_SEED_STRATEGY === "memory") {
      return this.inMemoryCollections.find(c => c.id === id)
    }
    return dbGetCollection(id)
  }

  async listCollections(): Promise<Collection[]> {
    if (process.env.PRODUCT_SEED_STRATEGY === "memory") return this.inMemoryCollections
    // Fetch all collections with products
    const lists: CollectionList[] = await dbListCollections()
    const fullCollections: Collection[] = []
    for (const c of lists) {
      const col = await dbGetCollection(c.id)
      fullCollections.push(col)
    }
    return fullCollections
  }

  async updateCollection(input: UpdateCollection): Promise<Collection> {
    if (process.env.PRODUCT_SEED_STRATEGY === "memory") {
      const index = this.inMemoryCollections.findIndex(c => c.id === input.id)
      if (index === -1) throw new Error(`Collection ${input.id} not found in memory`)
      const updated: Collection = {
        ...this.inMemoryCollections[index],
        ...input,
        created_at: new Date().toISOString(),
      }
      this.inMemoryCollections[index] = updated
      return updated
    }
    return dbUpdateCollection(input)
  }

  async deleteCollection(id: number): Promise<Collection | undefined> {
    if (process.env.PRODUCT_SEED_STRATEGY === "memory") {
      const index = this.inMemoryCollections.findIndex(c => c.id === id)
      if (index === -1) throw new Error(`Collection ${id} not found in memory`)
      const [deleted] = this.inMemoryCollections.splice(index, 1)
      return deleted
    }
    return dbDeleteCollection(id)
  }

  // -------------------
  // Seed Collections
  // -------------------

  async seedCollections(collections: CreateCollection[]): Promise<Collection[]> {
    if (process.env.PRODUCT_SEED_STRATEGY === "memory") {
      this.inMemoryCollections = collections.map((c, index) => ({
        id: this.inMemoryCollections.length + index + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        name: c.name,
        slug: c.name.toLowerCase().replace(/\s+/g, "-"),
        description: c.description,
        image: c.image,
        is_available: c.is_available,
        products: [],
      }))
      console.log(`[CollectionService] Seeded ${collections.length} collections in memory`)
      return this.inMemoryCollections
    } else if (process.env.PRODUCT_SEED_STRATEGY === "db") {
      const created: Collection[] = []
      for (const c of collections) {
        const collection = await dbCreateCollection(c)
        created.push(collection)
      }
      console.log(`[CollectionService] Seeded ${collections.length} collections in DB`)
      return created
    } else {
      throw new Error(`[CollectionService] Unknown strategy: ${process.env.PRODUCT_SEED_STRATEGY}`)
    }
  }

  clearMemory() {
    this.inMemoryCollections = []
  }
}

// Export singleton
export const collectionService = new CollectionService()
