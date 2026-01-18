export type ProductId = number
export type CollectionId = number

// -----------------------------
// Product
// -----------------------------
export interface Product {
  id: ProductId
  collectionId?: CollectionId
  name: string
  color?: string
  length?: number
  quantity: number
  price: number
  cuttingType?: string
  imageUrl?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface CreateProduct {
  name: string
  description?: string
  color?: string
  length?: number
  quantity: number
  price: number
  imageUrl?: string
  collectionId?: CollectionId
}

export interface UpdateProduct extends Partial<CreateProduct> {
  id: ProductId
}

// -----------------------------
// Collection
// -----------------------------
export interface CollectionList {
  id: CollectionId
  name: string
  slug: string
  image?: string
  isAvailable: boolean
}

export interface Collection {
  id: CollectionId
  name: string
  slug: string
  description?: string
  image?: string
  isAvailable: boolean
  createdAt: string
  updatedAt: string
  products?: Product[]
}

export interface CreateCollection {
  name: string
  description?: string
  image?: string
  isAvailable: boolean
}

export interface UpdateCollection extends Partial<CreateCollection> {
  id: CollectionId
}
