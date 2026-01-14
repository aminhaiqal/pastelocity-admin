import { Product, ProductId } from "./types"

const API_URL = process.env.API_URL!

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, {
    next: { revalidate: 60 }, // ISR
  })

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
}

export async function getProductById(
  id: ProductId
): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    cache: "no-store", // always fresh
  })

  if (!res.ok) {
    throw new Error("Failed to fetch product")
  }

  return res.json()
}
