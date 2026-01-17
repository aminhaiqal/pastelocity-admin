import { User, UserRequest } from "./types"

const API_URL = process.env.API_URL!

export async function getUser(id: number): Promise<User> {
  const res = await fetch(`${API_URL}/users/${id}`)
  if (!res.ok) throw new Error("Failed to fetch user")
  return res.json()
}

export async function createUser(payload: UserRequest): Promise<User> {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create user")
  return res.json()
}

export async function updateUser(
  id: number,
  payload: UserRequest
): Promise<User> {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to update user")
  return res.json()
}

export async function deleteUser(id: number): Promise<User> {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete user")
  return res.json()
}
