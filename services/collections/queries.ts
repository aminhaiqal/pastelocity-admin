import { Collection, CollectionList } from "./types"

const API_URL = process.env.API_URL!

export async function getCollections(): Promise<CollectionList[]> {
  const res = await fetch(`${API_URL}/collections`)
  if (!res.ok) throw new Error("Failed to fetch collections")
  return res.json()
}

export async function getCollection(id: number): Promise<Collection> {
  const res = await fetch(`${API_URL}/collections/${id}`)
  if (!res.ok) throw new Error("Failed to fetch collection")
  return res.json()
}

export interface CreateCollectionRequest {
  name: string
  description?: string
  image?: string
  is_available: boolean
}
export async function createCollection(payload: CreateCollectionRequest): Promise<Collection> {
  const res = await fetch(`${API_URL}/collections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create collection")
  return res.json()
}

export interface UpdateCollectionRequest {
  name?: string
  description?: string
  image?: string
  is_available?: boolean
}
export async function updateCollection(id: number, payload: UpdateCollectionRequest): Promise<Collection> {
  const res = await fetch(`${API_URL}/collections/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to update collection")
  return res.json()
}

export async function deleteCollection(id: number): Promise<Collection> {
  const res = await fetch(`${API_URL}/collections/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete collection")
  return res.json()
}
