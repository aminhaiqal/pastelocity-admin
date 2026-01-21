import { OrderItem, CreateOrderItem, UpdateOrderItem } from "@/domains/order"

export const OrderItemAdapter = {
  fromJson(json: any): OrderItem {
    return {
      id: json.id,
      orderId: json.orderId,
      productId: json.productId,
      quantity: json.quantity,
      price: json.price,
      created_at: new Date(json.created_at).toISOString(),
    }
  },

  toJson(orderItem: OrderItem | CreateOrderItem | UpdateOrderItem) {
    const json: any = { ...orderItem }

    // Only include created_at if it exists (only full OrderItem has it)
    if ("created_at" in orderItem && orderItem.created_at) json.created_at = orderItem.created_at

    return json
  },
}
