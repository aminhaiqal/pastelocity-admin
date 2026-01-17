import { Order, CreateOrder, UpdateOrder } from "@/domains/order"

export const OrderAdapter = {
  fromJson(json: any): Order {
    return {
      id: json.id,
      userId: json.userId,
      total: json.total,
      shippingId: json.shippingId,
      createdAt: new Date(json.createdAt).toISOString(),
      updatedAt: new Date(json.updatedAt).toISOString(),
    }
  },

  toJson(order: Order | CreateOrder | UpdateOrder) {
    const json: any = { ...order }

    // Only include createdAt/updatedAt if they exist (only full Order has them)
    if ("createdAt" in order && order.createdAt) json.createdAt = order.createdAt
    if ("updatedAt" in order && order.updatedAt) json.updatedAt = order.updatedAt

    return json
  },
}
