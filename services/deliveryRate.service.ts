"use server"

import { shippingMutations, shippingQueries } from "@/domains/shipping"
import { DeliveryRate, CreateDeliveryRate, UpdateDeliveryRate } from "@/domains/shipping"

const STRATEGY = process.env.SHIPPING_SEED_STRATEGY || "memory"

class DeliveryRateService {
  private inMemoryRates: DeliveryRate[] = []

  constructor() {}

  // -------------------
  // CRUD Operations
  // -------------------
  async createRate(input: CreateDeliveryRate): Promise<DeliveryRate> {
    if (STRATEGY === "memory") {
      const newRate: DeliveryRate = {
        id: this.inMemoryRates.length + 1,
        ...input,
      }
      this.inMemoryRates.push(newRate)
      return newRate
    }
    return shippingMutations.createDeliveryRate(input)
  }

  async getRate(id: number): Promise<DeliveryRate | undefined> {
    if (STRATEGY === "memory") return this.inMemoryRates.find(r => r.id === id)
    return shippingQueries.getDeliveryRate(id)
  }

  async listRatesByOption(optionId: number): Promise<DeliveryRate[]> {
    if (STRATEGY === "memory") return this.inMemoryRates.filter(r => r.deliveryOptionId === optionId)
    return shippingQueries.listRatesByDeliveryOption(optionId)
  }

  async updateRate(input: UpdateDeliveryRate & { id: number }): Promise<DeliveryRate> {
    if (STRATEGY === "memory") {
      const index = this.inMemoryRates.findIndex(r => r.id === input.id)
      if (index === -1) throw new Error(`DeliveryRate ${input.id} not found in memory`)
      const updated: DeliveryRate = { ...this.inMemoryRates[index], ...input }
      this.inMemoryRates[index] = updated
      return updated
    }
    throw new Error("Update not supported via API for DeliveryRate")
  }

  clearMemory() {
    this.inMemoryRates = []
  }

  // -------------------
  // Seed
  // -------------------
  async seedRates(inputs: CreateDeliveryRate[]): Promise<DeliveryRate[]> {
    if (STRATEGY === "memory") {
      this.inMemoryRates = inputs.map((i, index) => ({
        id: this.inMemoryRates.length + index + 1,
        ...i,
      }))
      return this.inMemoryRates
    } else if (STRATEGY === "db") {
      const created: DeliveryRate[] = []
      for (const i of inputs) {
        const r = await shippingMutations.createDeliveryRate(i)
        created.push(r)
      }
      return created
    } else throw new Error(`Unknown strategy: ${STRATEGY}`)
  }
}

export const deliveryRateService = new DeliveryRateService()
