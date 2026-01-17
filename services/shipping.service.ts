"use server"

import { shippingMutations, shippingQueries } from "@/domains/shipping"
import { Shipping, CreateShipping, UpdateShipping } from "@/domains/shipping"

const STRATEGY = process.env.SHIPPING_SEED_STRATEGY || "memory"

class ShippingService {
  private inMemoryShippings: Shipping[] = []

  constructor() {}

  // -------------------
  // CRUD Operations
  // -------------------
  async createShipping(input: CreateShipping): Promise<Shipping> {
    if (STRATEGY === "memory") {
      const newShipping: Shipping = {
        id: this.inMemoryShippings.length + 1,
        createdAt: new Date().toISOString(),
        ...input,
      }
      this.inMemoryShippings.push(newShipping)
      return newShipping
    }
    return shippingMutations.createShipping(input)
  }

  async getShipping(id: number): Promise<Shipping | undefined> {
    if (STRATEGY === "memory") return this.inMemoryShippings.find(s => s.id === id)
    return shippingQueries.getShipping(id)
  }

  async listShippingsByUser(userId: number): Promise<Shipping[]> {
    if (STRATEGY === "memory") return this.inMemoryShippings.filter(s => s.id === userId)
    return shippingQueries.listShippingsByUser(userId)
  }

  async updateShipping(id: number, input: UpdateShipping): Promise<Shipping> {
    if (STRATEGY === "memory") {
      const index = this.inMemoryShippings.findIndex(s => s.id === id)
      if (index === -1) throw new Error(`Shipping ${id} not found in memory`)
      const updated: Shipping = { ...this.inMemoryShippings[index], ...input }
      this.inMemoryShippings[index] = updated
      return updated
    }
    return shippingMutations.updateShipping(id, input)
  }

  async deleteShipping(id: number): Promise<Shipping | undefined> {
    if (STRATEGY === "memory") {
      const index = this.inMemoryShippings.findIndex(s => s.id === id)
      if (index === -1) throw new Error(`Shipping ${id} not found in memory`)
      const [deleted] = this.inMemoryShippings.splice(index, 1)
      return deleted
    }
    return shippingMutations.deleteShipping(id)
  }

  clearMemory() {
    this.inMemoryShippings = []
  }

  // -------------------
  // Seed Shippings
  // -------------------
  async seedShippings(inputs: CreateShipping[]): Promise<Shipping[]> {
    if (STRATEGY === "memory") {
      this.inMemoryShippings = inputs.map((i, index) => ({
        id: this.inMemoryShippings.length + index + 1,
        createdAt: new Date().toISOString(),
        ...i,
      }))
      return this.inMemoryShippings
    } else if (STRATEGY === "db") {
      const created: Shipping[] = []
      for (const i of inputs) {
        const s = await shippingMutations.createShipping(i)
        created.push(s)
      }
      return created
    } else throw new Error(`Unknown strategy: ${STRATEGY}`)
  }
}

export const shippingService = new ShippingService()
