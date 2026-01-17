// queries.ts
import { OrderItem, OrderItemRequest } from "./types"

const API_URL = process.env.API_URL!

export async function getOrderItemsByOrder(orderId: number): Promise<OrderItem[]> {
  const res = await fetch(`${API_URL}/order_items/order/${orderId}`)
  if (!res.ok) throw new Error("Failed to fetch order items for order")
  return res.json()
}

export async function getOrderItemsByProduct(productId: number): Promise<OrderItem[]> {
  const res = await fetch(`${API_URL}/order_items/product/${productId}`)
  if (!res.ok) throw new Error("Failed to fetch order items for product")
  return res.json()
}

export async function getOrderItem(id: number): Promise<OrderItem> {
  const res = await fetch(`${API_URL}/order_items/${id}`)
  if (!res.ok) throw new Error("Failed to fetch order item")
  return res.json()
}

export async function createOrderItem(payload: OrderItemRequest): Promise<OrderItem> {
  const res = await fetch(`${API_URL}/order_items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create order item")
  return res.json()
}

export async function updateOrderItem(id: number, payload: OrderItemRequest): Promise<OrderItem> {
  const res = await fetch(`${API_URL}/order_items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to update order item")
  return res.json()
}

export async function deleteOrderItem(id: number): Promise<OrderItem> {
  const res = await fetch(`${API_URL}/order_items/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete order item")
  return res.json()
}
