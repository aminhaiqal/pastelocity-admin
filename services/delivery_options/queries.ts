import { DeliveryOption, DeliveryOptionRequest } from "./types"

const API_URL = process.env.API_URL!

export async function getDeliveryOptions(): Promise<DeliveryOption[]> {
  const res = await fetch(`${API_URL}/delivery_options`)
  if (!res.ok) throw new Error("Failed to fetch delivery options")
  return res.json()
}

export async function getDeliveryOption(id: number): Promise<DeliveryOption> {
  const res = await fetch(`${API_URL}/delivery_options/${id}`)
  if (!res.ok) throw new Error("Failed to fetch delivery option")
  return res.json()
}

export async function createDeliveryOption(
  payload: DeliveryOptionRequest
): Promise<DeliveryOption> {
  const res = await fetch(`${API_URL}/delivery_options`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create delivery option")
  return res.json()
}

export async function updateDeliveryOption(
  id: number,
  payload: DeliveryOptionRequest
): Promise<DeliveryOption> {
  const res = await fetch(`${API_URL}/delivery_options/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to update delivery option")
  return res.json()
}

export async function deleteDeliveryOption(id: number): Promise<DeliveryOption> {
  const res = await fetch(`${API_URL}/delivery_options/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete delivery option")
  return res.json()
}
