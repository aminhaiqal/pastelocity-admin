"use server"

import { orderMutations, orderQueries } from "@/domains/order"
import { OrderItem, CreateOrderItem, UpdateOrderItem } from "@/domains/order"

const STRATEGY = process.env.ORDER_SEED_STRATEGY || "memory"

class OrderItemService {
  private inMemoryOrderItems: OrderItem[] = []

  constructor() {}

  // -------------------
  // CRUD Operations
  // -------------------

  async createOrderItem(input: CreateOrderItem): Promise<OrderItem> {
    if (STRATEGY === "memory") {
      const newItem: OrderItem = {
        id: this.inMemoryOrderItems.length + 1,
        created_at: new Date().toISOString(),
        ...input,
      }
      this.inMemoryOrderItems.push(newItem)
      return newItem
    }
    return orderMutations.createOrderItem(input)
  }

  async getOrderItem(id: number): Promise<OrderItem | undefined> {
    if (STRATEGY === "memory") {
      return this.inMemoryOrderItems.find(i => i.id === id)
    }
    return orderQueries.getOrderItem(id)
  }

  async listOrderItems(): Promise<OrderItem[]> {
    if (STRATEGY === "memory") return this.inMemoryOrderItems
    return this.inMemoryOrderItems // optional: fetch all via DB if API supports
  }

  async updateOrderItem(input: UpdateOrderItem): Promise<OrderItem> {
    if (STRATEGY === "memory") {
      const index = this.inMemoryOrderItems.findIndex(i => i.id === input.id)
      if (index === -1) throw new Error(`OrderItem ${input.id} not found in memory`)
      const updated: OrderItem = {
        ...this.inMemoryOrderItems[index],
        ...input,
      }
      this.inMemoryOrderItems[index] = updated
      return updated
    }
    return orderMutations.updateOrderItem(input.id, input)
  }

  async deleteOrderItem(id: number): Promise<OrderItem | undefined> {
    if (STRATEGY === "memory") {
      const index = this.inMemoryOrderItems.findIndex(i => i.id === id)
      if (index === -1) throw new Error(`OrderItem ${id} not found in memory`)
      const [deleted] = this.inMemoryOrderItems.splice(index, 1)
      return deleted
    }
    return orderMutations.deleteOrderItem(id)
  }

  async clearMemory() {
    this.inMemoryOrderItems = []
  }

  // -------------------
  // Seed Order Items
  // -------------------
  async seedOrderItems(items: CreateOrderItem[]): Promise<OrderItem[]> {
    if (STRATEGY === "memory") {
      this.inMemoryOrderItems = items.map((i, index) => ({
        id: this.inMemoryOrderItems.length + index + 1,
        created_at: new Date().toISOString(),
        ...i,
      }))
      console.log(`[OrderItemService] Seeded ${items.length} items in memory`)
      return this.inMemoryOrderItems
    } else if (STRATEGY === "db") {
      const created: OrderItem[] = []
      for (const i of items) {
        const item = await orderMutations.createOrderItem(i)
        created.push(item)
      }
      console.log(`[OrderItemService] Seeded ${items.length} items in DB`)
      return created
    } else {
      throw new Error(`[OrderItemService] Unknown strategy: ${STRATEGY}`)
    }
  }
}

export const orderItemService = new OrderItemService()
