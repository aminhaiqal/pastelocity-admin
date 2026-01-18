import {
  createProduct as dbCreateProduct,
  updateProduct as dbUpdateProduct,
  deleteProduct as dbDeleteProduct,
  getProduct as dbGetProduct,
  listProducts as dbListProducts,
} from "@/domains/catalog"
import { Product, CreateProduct, UpdateProduct } from "@/domains/catalog"

const STRATEGY = process.env.PRODUCT_SEED_STRATEGY || "memory"

class ProductService {
  private inMemoryProducts: Product[] = []

  constructor() {}

  // -------------------
  // CRUD Operations
  // -------------------

  async createProduct(input: CreateProduct): Promise<Product> {
    if (STRATEGY === "memory") {
      const newProduct: Product = {
        id: this.inMemoryProducts.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...input,
      }
      this.inMemoryProducts.push(newProduct)
      return newProduct
    }
    // DB
    return dbCreateProduct(input)
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

  async updateProduct(input: UpdateProduct): Promise<Product> {
    if (STRATEGY === "memory") {
      const index = this.inMemoryProducts.findIndex(p => p.id === input.id)
      if (index === -1) throw new Error(`Product ${input.id} not found in memory`)
      const updated: Product = {
        ...this.inMemoryProducts[index],
        ...input,
        updatedAt: new Date().toISOString(),
      }
      this.inMemoryProducts[index] = updated
      return updated
    }
    return dbUpdateProduct(input)
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...p,
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
