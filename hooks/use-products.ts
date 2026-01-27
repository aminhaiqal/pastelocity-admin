"use client"

import { useEffect, useState, useTransition } from "react"
import { Product, CreateProduct, UpdateProduct } from "@/domains/catalog"
import {
  listProductsAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
  addProductIntoCollectionAction,
  removeProductFromCollectionAction,
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
    let created: Product
    startTransition(async () => {
      const created = await createProductAction(input)
      setProducts((prev) => [...prev, created])
    })
    return created!
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

export function useCollectionAssignment() {
  const [isPending, startTransition] = useTransition()
  const [assignments, setAssignments] = useState<Record<number, number>>({}) 
  // key = product_id, value = collection_id

  // Assign product to collection
  function assignProduct(product_id: number, collection_id: number) {
    startTransition(async () => {
      await addProductIntoCollectionAction(product_id, collection_id)
      setAssignments((prev) => ({
        ...prev,
        [product_id]: collection_id,
      }))
    })
  }

  // Remove product from collection
  function removeProduct(product_id: number) {
    startTransition(async () => {
      await removeProductFromCollectionAction(product_id)
      setAssignments((prev) => {
        const newAssignments = { ...prev }
        delete newAssignments[product_id]
        return newAssignments
      })
    })
  }

  return {
    assignments,
    isPending,
    assignProduct,
    removeProduct,
  }
}