import { Order, OrderItem } from "./order.types"

export const mapOrderDTO = (dto: any): Order => ({
  id: dto.id,
  userId: dto.user_id,
  total: dto.total,
  shippingId: dto.shipping_id,
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
})

export const mapOrderItemDTO = (dto: any): OrderItem => ({
  id: dto.id,
  orderId: dto.order_id,
  productId: dto.product_id,
  quantity: dto.quantity,
  price: dto.price,
  createdAt: dto.created_at,
})
