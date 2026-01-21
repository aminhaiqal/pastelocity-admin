import { Order, CreateOrder, UpdateOrder } from "@/domains/order"

export const OrderAdapter = {
  fromJson(json: any): Order {
    return {
      id: json.id,
      userId: json.userId,
      total: json.total,
      shippingId: json.shippingId,
      created_at: new Date(json.created_at).toISOString(),
      updated_at: new Date(json.updated_at).toISOString(),
    }
  },

  toJson(order: Order | CreateOrder | UpdateOrder) {
    const json: any = { ...order }

    // Only include created_at/updated_at if they exist (only full Order has them)
    if ("created_at" in order && order.created_at) json.created_at = order.created_at
    if ("updated_at" in order && order.updated_at) json.updated_at = order.updated_at

    return json
  },
}
