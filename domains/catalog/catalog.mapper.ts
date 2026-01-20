import { Product, Collection, CollectionList } from "./catalog.types"

export const mapProductDTO = (dto: any): Product => ({
  id: dto.id,
  collectionId: dto.collection_id,
  name: dto.name,
  color: dto.color,
  length: dto.length,
  quantity: dto.quantity,
  price: dto.price,
  cuttingType: dto.cutting_type,
  imageUrl: dto.image_url,
  description: dto.description,
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
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
