export type OrderId = number
export type OrderItemId = number
export type UserId = number
export type ProductId = number
export type ShippingId = number

// -----------------------------
// Order
// -----------------------------
export interface Order {
  id: OrderId
  userId: UserId
  total: string   // BigDecimal from backend
  shippingId?: ShippingId
  createdAt: string
  updatedAt: string
}

export interface CreateOrder {
  userId: UserId
  total: string
  shippingId?: ShippingId
}

export interface UpdateOrder extends Partial<CreateOrder> {
  id: OrderId
}

// -----------------------------
// OrderItem
// -----------------------------
export interface OrderItem {
  id: OrderItemId
  orderId: OrderId
  productId: ProductId
  quantity: number
  price: string
  createdAt: string
}

export interface CreateOrderItem {
  orderId: OrderId
  productId: ProductId
  quantity: number
  price: string
}

export interface UpdateOrderItem extends Partial<CreateOrderItem> {
  id: OrderItemId
}
