"use server"

import { catalogApi } from "./catalog.api"
import { mapProductDTO, mapCollectionDTO, mapCollectionListDTO } from "./catalog.mapper"
import { Product, Collection, CollectionList } from "./catalog.types"

// PRODUCTS
export async function listProducts(): Promise<Product[]> {
  const { data } = await catalogApi.listProducts()
  return data.map(mapProductDTO)
}

export async function getProduct(id: number): Promise<Product> {
  const { data } = await catalogApi.getProduct(id)
  return mapProductDTO(data)
}

// COLLECTIONS
export async function listCollections(): Promise<CollectionList[]> {
  const { data } = await catalogApi.listCollections()
  return data.map(mapCollectionListDTO)
}

export async function getCollection(id: number): Promise<Collection> {
  const { data } = await catalogApi.getCollection(id)
  return mapCollectionDTO(data)
}
