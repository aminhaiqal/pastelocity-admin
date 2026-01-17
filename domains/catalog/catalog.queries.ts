import { catalogApi } from "./catalog.api"
import { mapProductDTO, mapCollectionDTO, mapCollectionListDTO } from "./catalog.mapper"
import { Product, Collection, CollectionList } from "./catalog.types"

export const catalogQueries = {
  async listProducts(): Promise<Product[]> {
    const { data } = await catalogApi.listProducts()
    return data.map(mapProductDTO)
  },

  async getProduct(id: number): Promise<Product> {
    const { data } = await catalogApi.getProduct(id)
    return mapProductDTO(data)
  },

  async listCollections(): Promise<CollectionList[]> {
    const { data } = await catalogApi.listCollections()
    return data.map(mapCollectionListDTO)
  },

  async getCollection(id: number): Promise<Collection> {
    const { data } = await catalogApi.getCollection(id)
    return mapCollectionDTO(data)
  },
}
