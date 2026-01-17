import { OrderItem, CreateOrderItem, UpdateOrderItem } from "@/domains/order"

export const OrderItemAdapter = {
  fromJson(json: any): OrderItem {
    return {
      id: json.id,
      orderId: json.orderId,
      productId: json.productId,
      quantity: json.quantity,
      price: json.price,
      createdAt: new Date(json.createdAt).toISOString(),
    }
  },

  toJson(orderItem: OrderItem | CreateOrderItem | UpdateOrderItem) {
    const json: any = { ...orderItem }

    // Only include createdAt if it exists (only full OrderItem has it)
    if ("createdAt" in orderItem && orderItem.createdAt) json.createdAt = orderItem.createdAt

    return json
  },
}
