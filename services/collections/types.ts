export interface CollectionList {
  id: number
  name: string
  slug: string
  image?: string
  is_available: boolean
}

export interface Collection {
  id: number
  name: string
  slug: string
  description?: string
  image?: string
  is_available: boolean
  created_at: string
  updated_at: string
  products?: Product[]
}

import { Product } from "../products/types"
