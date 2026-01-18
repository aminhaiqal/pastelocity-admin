"use client"

import { useEffect, useState, useTransition } from "react"
import { Product, CreateProduct, UpdateProduct } from "@/domains/catalog"
import {
  listProductsAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from "@/actions/products"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isPending, startTransition] = useTransition()

  // Load products on mount
  useEffect(() => {
    startTransition(async () => {
      const data = await listProductsAction()
      setProducts(data)
    })
  }, [])

  // Create product
  function createProduct(input: CreateProduct) {
    startTransition(async () => {
      const created = await createProductAction(input)
      setProducts((prev) => [...prev, created])
    })
  }

  // Update product
  function updateProduct(id: number, input: Omit<UpdateProduct, "id">) {
    startTransition(async () => {
      const updated = await updateProductAction({ id, ...input })
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      )
    })
  }

  // Delete product
  function deleteProduct(id: number) {
    startTransition(async () => {
      await deleteProductAction(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
    })
  }

  return {
    products,
    isPending,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
