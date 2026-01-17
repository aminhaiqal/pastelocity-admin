import { orderApi } from "./order.api"
import { mapOrderDTO, mapOrderItemDTO } from "./order.mapper"
import { Order, CreateOrder, UpdateOrder, OrderItem, CreateOrderItem, UpdateOrderItem } from "./order.types"

export const orderMutations = {
  async createOrder(payload: CreateOrder): Promise<Order> {
    const { data } = await orderApi.createOrder(payload)
    return mapOrderDTO(data)
  },

  async updateOrder(id: number, payload: UpdateOrder): Promise<Order> {
    const { data } = await orderApi.updateOrder(id, payload)
    return mapOrderDTO(data)
  },

  async createOrderItem(payload: CreateOrderItem): Promise<OrderItem> {
    const { data } = await orderApi.createOrderItem(payload)
    return mapOrderItemDTO(data)
  },

  async updateOrderItem(id: number, payload: UpdateOrderItem): Promise<OrderItem> {
    const { data } = await orderApi.updateOrderItem(id, payload)
    return mapOrderItemDTO(data)
  },

  async deleteOrderItem(id: number): Promise<OrderItem> {
    const { data } = await orderApi.deleteOrderItem(id)
    return mapOrderItemDTO(data)
  }
}
