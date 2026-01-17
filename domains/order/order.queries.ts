import { orderApi } from "./order.api"
import { mapOrderDTO, mapOrderItemDTO } from "./order.mapper"
import { Order, OrderItem } from "./order.types"

export const orderQueries = {
  async getOrder(id: number): Promise<Order> {
    const { data } = await orderApi.getOrder(id)
    return mapOrderDTO(data)
  },

  async getOrdersByUser(userId: number): Promise<Order[]> {
    const { data } = await orderApi.getOrdersByUser(userId)
    return data.map(mapOrderDTO)
  },

  async getOrdersByShipping(shippingId: number): Promise<Order[]> {
    const { data } = await orderApi.getOrdersByShipping(shippingId)
    return data.map(mapOrderDTO)
  },

  async getOrderItem(id: number): Promise<OrderItem> {
    const { data } = await orderApi.getOrderItem(id)
    return mapOrderItemDTO(data)
  },

  async getOrderItemsByOrder(orderId: number): Promise<OrderItem[]> {
    const { data } = await orderApi.getOrderItemsByOrder(orderId)
    return data.map(mapOrderItemDTO)
  },

  async getOrderItemsByProduct(productId: number): Promise<OrderItem[]> {
    const { data } = await orderApi.getOrderItemsByProduct(productId)
    return data.map(mapOrderItemDTO)
  }
}
