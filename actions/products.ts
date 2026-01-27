"use server"

import { productService } from "@/services/product.service"
import { CreateProduct, UpdateProduct } from "@/domains/catalog"

// READ
export async function listProductsAction() {
  return productService.listProducts()
}

// CREATE
export async function createProductAction(input: CreateProduct) {
  return productService.createProduct(input)
}

// UPDATE
export async function updateProductAction(input: UpdateProduct) {
  return productService.updateProduct(input)
}

// DELETE
export async function deleteProductAction(id: number) {
  return productService.deleteProduct(id)
}

// ADD INTO COLLECTION
export async function addProductIntoCollectionAction(product_id: number, collection_id: number) {
  return productService.addProductIntoCollection(product_id, collection_id)
}

// REMOVE FROM COLLECTION
export async function removeProductFromCollectionAction(product_id: number) {
  return productService.removeProductFromCollection(product_id)
}