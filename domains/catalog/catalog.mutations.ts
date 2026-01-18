"use server"

import { catalogApi } from "./catalog.api"
import { mapProductDTO, mapCollectionDTO } from "./catalog.mapper"
import { Product, CreateProduct, UpdateProduct, Collection, CreateCollection, UpdateCollection } from "./catalog.types"

// PRODUCTS
export async function createProduct(input: CreateProduct): Promise<Product> {
  const { data } = await catalogApi.createProduct(input)
  return mapProductDTO(data)
}

export async function updateProduct(input: UpdateProduct): Promise<Product> {
  const { data } = await catalogApi.updateProduct(input.id, input)
  return mapProductDTO(data)
}

export async function deleteProduct(id: number): Promise<Product> {
  const { data } = await catalogApi.deleteProduct(id)
  return mapProductDTO(data)
}

// COLLECTIONS
export async function createCollection(input: CreateCollection): Promise<Collection> {
  const { data } = await catalogApi.createCollection(input)
  return mapCollectionDTO(data)
}

export async function updateCollection(input: UpdateCollection): Promise<Collection> {
  const { data } = await catalogApi.updateCollection(input.id, input)
  return mapCollectionDTO(data)
}

export async function deleteCollection(id: number): Promise<Collection> {
  const { data } = await catalogApi.deleteCollection(id)
  return mapCollectionDTO(data)
}
