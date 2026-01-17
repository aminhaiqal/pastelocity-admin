import { DeliveryRate, DeliveryRateRequest } from "./types"

const API_URL = process.env.API_URL!

export async function getDeliveryRate(id: number): Promise<DeliveryRate> {
  const res = await fetch(`${API_URL}/delivery_rates/${id}`)
  if (!res.ok) throw new Error("Failed to fetch delivery rate")
  return res.json()
}

export async function getDeliveryRatesByDeliveryOption(
  deliveryOptionId: number
): Promise<DeliveryRate[]> {
  const res = await fetch(
    `${API_URL}/delivery_rates/delivery-option/${deliveryOptionId}`
  )
  if (!res.ok) throw new Error("Failed to fetch delivery rates by delivery option")
  return res.json()
}

export async function createDeliveryRate(
  payload: DeliveryRateRequest
): Promise<DeliveryRate> {
  const res = await fetch(`${API_URL}/delivery_rates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create delivery rate")
  return res.json()
}

export async function updateDeliveryRate(
  id: number,
  payload: DeliveryRateRequest
): Promise<DeliveryRate> {
  const res = await fetch(`${API_URL}/delivery_rates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to update delivery rate")
  return res.json()
}

export async function deleteDeliveryRate(id: number): Promise<DeliveryRate> {
  const res = await fetch(`${API_URL}/delivery_rates/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete delivery rate")
  return res.json()
}
