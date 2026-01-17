import { OrderItemAdapter } from '../orderItem.adapter'
import { OrderItem } from '@/domains/order'

describe('OrderItemAdapter', () => {
  const rawJson = {
    id: 1,
    orderId: 1001,
    productId: 2001,
    quantity: 3,
    price: '45.00',
    createdAt: '2026-01-18T00:00:00Z',
  }

  it('should convert JSON to OrderItem object', () => {
    const orderItem: OrderItem = OrderItemAdapter.fromJson(rawJson)

    expect(orderItem.id).toBe(1)
    expect(orderItem.orderId).toBe(1001)
    expect(orderItem.productId).toBe(2001)
    expect(orderItem.quantity).toBe(3)
    expect(orderItem.price).toBe('45.00')
    expect(orderItem.createdAt).toBe('2026-01-18T00:00:00.000Z')
  })

  it('should convert OrderItem object back to JSON', () => {
    const orderItem: OrderItem = OrderItemAdapter.fromJson(rawJson)
    const json = OrderItemAdapter.toJson(orderItem)

    expect(json.id).toBe(1)
    expect(json.orderId).toBe(1001)
    expect(json.productId).toBe(2001)
    expect(json.quantity).toBe(3)
    expect(json.price).toBe('45.00')
    expect(json.createdAt).toBe('2026-01-18T00:00:00.000Z')
  })

  it('should handle partial OrderItem (CreateOrderItem/UpdateOrderItem) without createdAt', () => {
    const partialItem = {
      orderId: 1002,
      productId: 2002,
      quantity: 2,
      price: '30.50',
    }

    const json = OrderItemAdapter.toJson(partialItem)
    expect(json.orderId).toBe(1002)
    expect(json.productId).toBe(2002)
    expect(json.quantity).toBe(2)
    expect(json.price).toBe('30.50')
    expect(json.createdAt).toBeUndefined()
  })
})
