import { Product, ProductId, ProductRequest } from "./types"

const API_URL = process.env.API_URL!

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function getProductById(id: ProductId): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch product")
  return res.json()
}

export async function getProductsByCollection(collectionId: number): Promise<Product[]> {
  const res = await fetch(`${API_URL}/collection/${collectionId}`)
  if (!res.ok) throw new Error("Failed to fetch products by collection")
  return res.json()
}

export async function createProduct(payload: ProductRequest): Promise<Product> {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create product")
  return res.json()
}

export async function updateProduct(id: ProductId, payload: ProductRequest): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to update product")
  return res.json()
}

export async function deleteProduct(id: ProductId): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete product")
  return res.json()
}

export async function addProductToCollection(productId: number, collectionId: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${productId}/collection/${collectionId}`, { method: "PUT" })
  if (!res.ok) throw new Error("Failed to add product to collection")
  return res.json()
}

export async function removeProductFromCollection(productId: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${productId}/collection`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to remove product from collection")
  return res.json()
}
