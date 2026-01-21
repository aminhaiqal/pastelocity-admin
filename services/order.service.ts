"use server"

import { orderMutations, orderQueries } from "@/domains/order"
import { Order, CreateOrder, UpdateOrder } from "@/domains/order"

const STRATEGY = process.env.ORDER_SEED_STRATEGY || "memory"

class OrderService {
  private inMemoryOrders: Order[] = []

  constructor() {}

  // -------------------
  // CRUD Operations
  // -------------------

  async createOrder(input: CreateOrder): Promise<Order> {
    if (STRATEGY === "memory") {
      const newOrder: Order = {
        id: this.inMemoryOrders.length + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...input,
      }
      this.inMemoryOrders.push(newOrder)
      return newOrder
    }
    return orderMutations.createOrder(input)
  }

  async getOrder(id: number): Promise<Order | undefined> {
    if (STRATEGY === "memory") {
      return this.inMemoryOrders.find(o => o.id === id)
    }
    return orderQueries.getOrder(id)
  }

  async listOrders(): Promise<Order[]> {
    if (STRATEGY === "memory") return this.inMemoryOrders
    // optional: list all orders by fetching users or shipping?
    return this.inMemoryOrders // if DB API has no "list all", you might need custom endpoint
  }

  async updateOrder(input: UpdateOrder): Promise<Order> {
    if (STRATEGY === "memory") {
      const index = this.inMemoryOrders.findIndex(o => o.id === input.id)
      if (index === -1) throw new Error(`Order ${input.id} not found in memory`)
      const updated: Order = {
        ...this.inMemoryOrders[index],
        ...input,
        updated_at: new Date().toISOString(),
      }
      this.inMemoryOrders[index] = updated
      return updated
    }
    return orderMutations.updateOrder(input.id, input)
  }

  async clearMemory() {
    this.inMemoryOrders = []
  }

  // -------------------
  // Seed Orders
  // -------------------
  async seedOrders(orders: CreateOrder[]): Promise<Order[]> {
    if (STRATEGY === "memory") {
      this.inMemoryOrders = orders.map((o, index) => ({
        id: this.inMemoryOrders.length + index + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...o,
      }))
      console.log(`[OrderService] Seeded ${orders.length} orders in memory`)
      return this.inMemoryOrders
    } else if (STRATEGY === "db") {
      const created: Order[] = []
      for (const o of orders) {
        const order = await orderMutations.createOrder(o)
        created.push(order)
      }
      console.log(`[OrderService] Seeded ${orders.length} orders in DB`)
      return created
    } else {
      throw new Error(`[OrderService] Unknown strategy: ${STRATEGY}`)
    }
  }
}

export const orderService = new OrderService()
