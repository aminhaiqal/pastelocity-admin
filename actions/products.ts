"use server"

import { productService } from "@/services/product.service"
import { CreateProduct } from "@/domains/catalog"

// READ
export async function listProductsAction() {
  return productService.listProducts()
}

// CREATE
export async function createProductAction(input: CreateProduct) {
  return productService.createProduct(input)
}
