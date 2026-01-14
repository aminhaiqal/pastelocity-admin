"use server"

import { revalidatePath } from "next/cache"
import { CreateProductInput, UpdateProductInput } from "./types"

const API_URL = process.env.API_URL!

export async function createProduct(data: CreateProductInput) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Failed to create product")
  }

  revalidatePath("/products")
}

export async function updateProduct(data: UpdateProductInput) {
  const res = await fetch(`${API_URL}/products/${data.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Failed to update product")
  }

  revalidatePath(`/products/${data.id}`)
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error("Failed to delete product")
  }

  revalidatePath("/products")
}
