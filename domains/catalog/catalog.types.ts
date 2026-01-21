export type ProductId = number
export type collection_id = number

// -----------------------------
// Product
// -----------------------------
export interface Product {
  id: ProductId
  collection_id?: collection_id
  name: string
  description: string
  color?: string
  length?: string
  quantity: number
  price: string
  cutting_type: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface CreateProduct {
  name: string
  description: string
  color?: string
  length?: number
  quantity: number
  price: number
  cutting_type: string
  image_url?: string
  collection_id?: collection_id
}

export interface UpdateProduct extends Partial<CreateProduct> {
  id: ProductId
}

// -----------------------------
// Collection
// -----------------------------
export interface CollectionList {
  id: collection_id
  name: string
  slug: string
  image?: string
  is_available: boolean
}

export interface Collection {
  id: collection_id
  name: string
  slug: string
  description?: string
  image?: string
  is_available: boolean
  created_at: string
  updated_at: string
  products?: Product[]
}

export interface CreateCollection {
  name: string
  description?: string
  image?: string
  is_available: boolean
}

export interface UpdateCollection extends Partial<CreateCollection> {
  id: collection_id
}
