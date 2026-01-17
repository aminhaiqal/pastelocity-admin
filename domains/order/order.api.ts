import api from "@/lib/api"
import { Order, CreateOrder, UpdateOrder, OrderItem, CreateOrderItem, UpdateOrderItem, OrderId, UserId, ShippingId, OrderItemId, ProductId } from "./order.types"

export const orderApi = {
  // -----------------------------
  // Orders
  // -----------------------------
  getOrder: (id: OrderId) => api.get<Order>(`/orders/${id}`),
  getOrdersByUser: (userId: UserId) => api.get<Order[]>(`/orders/user/${userId}`),
  getOrdersByShipping: (shippingId: ShippingId) => api.get<Order[]>(`/orders/shipping/${shippingId}`),
  createOrder: (payload: CreateOrder) => api.post<Order>("/orders", payload),
  updateOrder: (id: OrderId, payload: UpdateOrder) => api.put<Order>(`/orders/${id}`, payload),

  // -----------------------------
  // Order Items
  // -----------------------------
  getOrderItem: (id: OrderItemId) => api.get<OrderItem>(`/order_items/${id}`),
  getOrderItemsByOrder: (orderId: OrderId) => api.get<OrderItem[]>(`/order_items/order/${orderId}`),
  getOrderItemsByProduct: (productId: ProductId) => api.get<OrderItem[]>(`/order_items/product/${productId}`),
  createOrderItem: (payload: CreateOrderItem) => api.post<OrderItem>("/order_items", payload),
  updateOrderItem: (id: OrderItemId, payload: UpdateOrderItem) => api.put<OrderItem>(`/order_items/${id}`, payload),
  deleteOrderItem: (id: OrderItemId) => api.delete<OrderItem>(`/order_items/${id}`)
}
