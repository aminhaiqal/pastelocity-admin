import {
  createProduct as dbCreateProduct,
  updateProduct as dbUpdateProduct,
  deleteProduct as dbDeleteProduct,
  addProductIntoCollection as dbAddProductIntoCollection,
  removeProductFromCollection as dbRemoveProductFromCollection,
  getProduct as dbGetProduct,
  listProducts as dbListProducts,
  collection_id,
} from "@/domains/catalog"
import { Product, CreateProduct, UpdateProduct } from "@/domains/catalog"
import { handleProductCollection } from "./helpers/product-collection.helper"


class ProductService {
  private inMemoryProducts: Product[] = []

  constructor() { }

  // -------------------
  // CRUD Operations
  // -------------------

  async createProduct(input: CreateProduct): Promise<Product> {
    if (process.env.PRODUCT_SEED_STRATEGY === "memory") {
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
    return dbCreateProduct(input)
  }

  async getProduct(id: number): Promise<Product | undefined> {
    if (process.env.PRODUCT_SEED_STRATEGY === "memory") {
      return this.inMemoryProducts.find(p => p.id === id)
    }
    return dbGetProduct(id)
  }

  async listProducts(): Promise<Product[]> {
    if (process.env.PRODUCT_SEED_STRATEGY === "memory") return this.inMemoryProducts
    return dbListProducts()
  }

  async updateProduct(input: UpdateProduct & { collection_id?: collection_id }): Promise<Product> {
    if (process.env.PRODUCT_SEED_STRATEGY === "memory") {
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
    return dbUpdateProduct(input)
  }

  async deleteProduct(id: number): Promise<Product | undefined> {
    if (process.env.PRODUCT_SEED_STRATEGY === "memory") {
      const index = this.inMemoryProducts.findIndex(p => p.id === id)
      if (index === -1) throw new Error(`Product ${id} not found in memory`)
      const [deleted] = this.inMemoryProducts.splice(index, 1)
      return deleted
    }
    return dbDeleteProduct(id)
  }

  async addProductIntoCollection(product_id: number, collection_id: number): Promise<Product> {
    if (process.env.PRODUCT_SEED_STRATEGY === "memory") {
      const product = this.inMemoryProducts.find(p => p.id === product_id)
      if (!product) throw new Error(`Product ${product_id} not found in memory`)
      // Assign collection_id
      const updated: Product = {
        ...product,
        collection_id,
        updated_at: new Date().toISOString(),
      }
      const index = this.inMemoryProducts.findIndex(p => p.id === product_id)
      this.inMemoryProducts[index] = updated
      return updated
    }

    // DB path
    return dbAddProductIntoCollection(product_id, collection_id)
  }

  async removeProductFromCollection(product_id: number): Promise<Product> {
    if (process.env.PRODUCT_SEED_STRATEGY === "memory") {
      const product = this.inMemoryProducts.find(p => p.id === product_id)
      if (!product) throw new Error(`Product ${product_id} not found in memory`)
      // Remove collection_id
      const updated: Product = {
        ...product,
        collection_id: undefined,
        updated_at: new Date().toISOString(),
      }
      const index = this.inMemoryProducts.findIndex(p => p.id === product_id)
      this.inMemoryProducts[index] = updated
      return updated
    }

    // DB path
    return dbRemoveProductFromCollection(product_id)
  }

  clearMemory() {
    this.inMemoryProducts = []
  }
}

export const productService = new ProductService()
