"use client"

import { useEffect, useState, useTransition } from "react"
import { Product, CreateProduct } from "@/domains/catalog"
import {
  listProductsAction,
  createProductAction,
} from "@/actions/products"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isPending, startTransition] = useTransition()

  // Load products on mount
  useEffect(() => {
    listProductsAction().then(setProducts)
  }, [])

  function createProduct(input: CreateProduct) {
    startTransition(async () => {
      const created = await createProductAction(input)
      setProducts((prev) => [...prev, created])
    })
  }

  return {
    products,
    createProduct,
    isPending,
  }
}
