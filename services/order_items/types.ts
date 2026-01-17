export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price: string // BigDecimal comes as string from backend
  created_at: string // ISO string
}

export interface OrderItemRequest {
  order_id: number
  product_id: number
  quantity: number
  price: string
}
