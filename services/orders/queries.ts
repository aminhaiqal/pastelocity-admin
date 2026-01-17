import { Order, OrderRequest } from "./types"

const API_URL = process.env.API_URL!

export async function getOrder(id: number): Promise<Order> {
  const res = await fetch(`${API_URL}/orders/${id}`)
  if (!res.ok) throw new Error("Failed to fetch order")
  return res.json()
}

export async function getOrdersByUser(userId: number): Promise<Order[]> {
  const res = await fetch(`${API_URL}/orders/user/${userId}`)
  if (!res.ok) throw new Error("Failed to fetch orders for user")
  return res.json()
}

export async function getOrdersByShipping(shippingId: number): Promise<Order[]> {
  const res = await fetch(`${API_URL}/orders/shipping/${shippingId}`)
  if (!res.ok) throw new Error("Failed to fetch orders for shipping")
  return res.json()
}

export async function updateOrder(id: number, payload: OrderRequest): Promise<Order> {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to update order")
  return res.json()
}
