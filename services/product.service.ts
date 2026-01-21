import {
  createProduct as dbCreateProduct,
  updateProduct as dbUpdateProduct,
  deleteProduct as dbDeleteProduct,
  getProduct as dbGetProduct,
  listProducts as dbListProducts,
  collection_id,
} from "@/domains/catalog"
import { Product, CreateProduct, UpdateProduct } from "@/domains/catalog"
import { handleProductCollection } from "./helpers/product-collection.helper"

const STRATEGY = process.env.PRODUCT_SEED_STRATEGY || "memory"

class ProductService {
  private inMemoryProducts: Product[] = []

  constructor() { }

  // -------------------
  // CRUD Operations
  // -------------------

  async createProduct(input: CreateProduct): Promise<Product> {
    if (STRATEGY === "memory") {
      const newProduct: Product = {
        id: this.inMemoryProducts.length + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...input,
        length: input.length !== undefined ? input.length.toString() : undefined,
        price: input.price.toString(),
      }
      this.inMemoryProducts.push(newProduct)
      return newProduct
    }
    // DB
    const product = await dbCreateProduct(input)
    await handleProductCollection(product, undefined, input.collection_id)
    return product
  }

  async getProduct(id: number): Promise<Product | undefined> {
    if (STRATEGY === "memory") {
      return this.inMemoryProducts.find(p => p.id === id)
    }
    return dbGetProduct(id)
  }

  async listProducts(): Promise<Product[]> {
    if (STRATEGY === "memory") return this.inMemoryProducts
    return dbListProducts()
  }

  async updateProduct(input: UpdateProduct & { collection_id?: collection_id }): Promise<Product> {
    if (STRATEGY === "memory") {
      const index = this.inMemoryProducts.findIndex(p => p.id === input.id)
      if (index === -1) throw new Error(`Product ${input.id} not found in memory`)

      const oldProduct = this.inMemoryProducts[index]

      const updated: Product = {
        ...oldProduct,
        ...input,
        length: input.length?.toString(),
        price: input.price?.toString() ?? oldProduct.price,
        updated_at: new Date().toISOString(),
      }

      this.inMemoryProducts[index] = updated

      // Handle collection changes
      await handleProductCollection(updated, oldProduct.collection_id, input.collection_id)

      return updated
    }

    // DB path
    const oldProduct = await dbGetProduct(input.id)
    const product = await dbUpdateProduct(input)
    await handleProductCollection(product, oldProduct.collection_id, input.collection_id)
    return product
  }

  async deleteProduct(id: number): Promise<Product | undefined> {
    if (STRATEGY === "memory") {
      const index = this.inMemoryProducts.findIndex(p => p.id === id)
      if (index === -1) throw new Error(`Product ${id} not found in memory`)
      const [deleted] = this.inMemoryProducts.splice(index, 1)
      return deleted
    }
    return dbDeleteProduct(id)
  }

  // -------------------
  // Seed Products
  // -------------------

  async seedProducts(products: CreateProduct[]): Promise<Product[]> {
    if (STRATEGY === "memory") {
      this.inMemoryProducts = products.map((p, index) => ({
        id: this.inMemoryProducts.length + index + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...p,
        length: p.length !== undefined ? p.length.toString() : undefined,
        price: p.price.toString(),
      }))
      console.log(`[ProductService] Seeded ${products.length} products in memory`)
      return this.inMemoryProducts
    } else if (STRATEGY === "db") {
      const created: Product[] = []
      for (const p of products) {
        const product = await dbCreateProduct(p)
        created.push(product)
      }
      console.log(`[ProductService] Seeded ${products.length} products in DB`)
      return created
    } else {
      throw new Error(`[ProductService] Unknown strategy: ${STRATEGY}`)
    }
  }

  clearMemory() {
    this.inMemoryProducts = []
  }
}

export const productService = new ProductService()
