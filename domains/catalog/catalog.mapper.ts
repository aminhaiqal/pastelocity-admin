import { Product, Collection, CollectionList } from "./catalog.types"

export const mapProductDTO = (dto: any): Product => ({
  id: dto.id,
  collection_id: dto.collection_id,
  slug: dto.slug,
  name: dto.name,
  description: dto.description,
  color: dto.color,
  length: dto.length,
  quantity: dto.quantity,
  price: dto.price,
  cutting_type: dto.cutting_type,
  created_at: dto.created_at,
  updated_at: dto.updated_at,
})

export const mapCollectionDTO = (dto: any): Collection => ({
  id: dto.id,
  name: dto.name,
  slug: dto.slug,
  description: dto.description,
  image: dto.image,
  is_available: dto.is_available,
  created_at: dto.created_at,
  updated_at: dto.updated_at,
  products: dto.products?.map(mapProductDTO),
})

export const mapCollectionListDTO = (dto: any): CollectionList => ({
  id: dto.id,
  name: dto.name,
  slug: dto.slug,
  image: dto.image,
  is_available: dto.is_available,
})
