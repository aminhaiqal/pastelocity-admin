export interface Order {
  id: number
  user_id: number
  total: string // BigDecimal comes as string from backend
  shipping_id?: number
  created_at: string // ISO string
  updated_at: string
}

export interface OrderRequest {
  user_id: number
  total: string
  shipping_id?: number
}
