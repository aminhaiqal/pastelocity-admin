export type ProductId = number

export type Product = {
  id: ProductId
  collection_id?: string
  name: string
  color?: string
  length?: string
  quantity: number
  price: number
  cutting_type?: string
  image_url?: string
  createdAt: string
  updatedAt: string
  description?: string
}

export type ProductRequest = {
  name: string
  description?: string
  color: string
  length?: number
  quantity: number
  price: number
  image_url?: string
}

export type UpdateProductInput = Partial<ProductRequest> & {
  id: ProductId
}
