"use server"

import { shippingMutations, shippingQueries } from "@/domains/shipping"
import { DeliveryOption, CreateDeliveryOption, UpdateDeliveryOption } from "@/domains/shipping"

const STRATEGY = process.env.SHIPPING_SEED_STRATEGY || "memory"

class DeliveryOptionService {
  private inMemoryOptions: DeliveryOption[] = []

  constructor() {}

  // -------------------
  // CRUD Operations
  // -------------------
  async createOption(input: CreateDeliveryOption): Promise<DeliveryOption> {
    if (STRATEGY === "memory") {
      const newOption: DeliveryOption = {
        id: this.inMemoryOptions.length + 1,
        ...input,
      }
      this.inMemoryOptions.push(newOption)
      return newOption
    }
    return shippingMutations.createDeliveryOption(input)
  }

  async getOption(id: number): Promise<DeliveryOption | undefined> {
    if (STRATEGY === "memory") return this.inMemoryOptions.find(o => o.id === id)
    return shippingQueries.getDeliveryOption(id)
  }

  async listOptions(): Promise<DeliveryOption[]> {
    if (STRATEGY === "memory") return this.inMemoryOptions
    return shippingQueries.listDeliveryOptions()
  }

  async updateOption(input: UpdateDeliveryOption & { id: number }): Promise<DeliveryOption> {
    if (STRATEGY === "memory") {
      const index = this.inMemoryOptions.findIndex(o => o.id === input.id)
      if (index === -1) throw new Error(`DeliveryOption ${input.id} not found in memory`)
      const updated: DeliveryOption = { ...this.inMemoryOptions[index], ...input }
      this.inMemoryOptions[index] = updated
      return updated
    }
    throw new Error("Update not supported via API for DeliveryOption")
  }

  clearMemory() {
    this.inMemoryOptions = []
  }

  // -------------------
  // Seed
  // -------------------
  async seedOptions(inputs: CreateDeliveryOption[]): Promise<DeliveryOption[]> {
    if (STRATEGY === "memory") {
      this.inMemoryOptions = inputs.map((i, index) => ({
        id: this.inMemoryOptions.length + index + 1,
        ...i,
      }))
      return this.inMemoryOptions
    } else if (STRATEGY === "db") {
      const created: DeliveryOption[] = []
      for (const i of inputs) {
        const o = await shippingMutations.createDeliveryOption(i)
        created.push(o)
      }
      return created
    } else throw new Error(`Unknown strategy: ${STRATEGY}`)
  }
}

export const deliveryOptionService = new DeliveryOptionService()
