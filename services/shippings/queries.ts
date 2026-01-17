import { Shipping, ShippingRequest } from "./types"

const API_URL = process.env.API_URL!

export async function getShippingsByUser(userId: number): Promise<Shipping[]> {
  const res = await fetch(`${API_URL}/shippings/user/${userId}`)
  if (!res.ok) throw new Error("Failed to fetch shippings by user")
  return res.json()
}

export async function getShipping(id: number): Promise<Shipping> {
  const res = await fetch(`${API_URL}/shippings/${id}`)
  if (!res.ok) throw new Error("Failed to fetch shipping")
  return res.json()
}

export async function getShippingsByDeliveryRate(
  deliveryRateId: number
): Promise<Shipping[]> {
  const res = await fetch(`${API_URL}/shippings/delivery-rate/${deliveryRateId}`)
  if (!res.ok) throw new Error("Failed to fetch shippings by delivery rate")
  return res.json()
}

export async function getShippingsByDeliveryOption(
  deliveryOptionId: number
): Promise<Shipping[]> {
  const res = await fetch(`${API_URL}/shippings/delivery-option/${deliveryOptionId}`)
  if (!res.ok) throw new Error("Failed to fetch shippings by delivery option")
  return res.json()
}

export async function createShipping(
  payload: ShippingRequest
): Promise<Shipping> {
  const res = await fetch(`${API_URL}/shippings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create shipping")
  return res.json()
}

export async function updateShipping(
  id: number,
  payload: ShippingRequest
): Promise<Shipping> {
  const res = await fetch(`${API_URL}/shippings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to update shipping")
  return res.json()
}

// ✅ Delete shipping
export async function deleteShipping(id: number): Promise<Shipping> {
  const res = await fetch(`${API_URL}/shippings/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete shipping")
  return res.json()
}
