import { catalogApi } from "./catalog.api"
import { mapProductDTO, mapCollectionDTO } from "./catalog.mapper"
import { Product, CreateProduct, UpdateProduct, Collection, CreateCollection, UpdateCollection } from "./catalog.types"

export const catalogMutations = {
  async createProduct(input: CreateProduct): Promise<Product> {
    const { data } = await catalogApi.createProduct(input)
    return mapProductDTO(data)
  },

  async updateProduct(input: UpdateProduct): Promise<Product> {
    const { data } = await catalogApi.updateProduct(input.id, input)
    return mapProductDTO(data)
  },

  async deleteProduct(id: number): Promise<Product> {
    const { data } = await catalogApi.deleteProduct(id)
    return mapProductDTO(data)
  },

  async createCollection(input: CreateCollection): Promise<Collection> {
    const { data } = await catalogApi.createCollection(input)
    return mapCollectionDTO(data)
  },

  async updateCollection(input: UpdateCollection): Promise<Collection> {
    const { data } = await catalogApi.updateCollection(input.id, input)
    return mapCollectionDTO(data)
  },

  async deleteCollection(id: number): Promise<Collection> {
    const { data } = await catalogApi.deleteCollection(id)
    return mapCollectionDTO(data)
  },
}
