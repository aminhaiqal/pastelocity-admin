import { OrderAdapter } from '../order.adapter'
import { Order } from '@/domains/order'

describe('OrderAdapter', () => {
  const rawJson = {
    id: 1,
    userId: 101,
    total: '150.00',
    shippingId: 20,
    createdAt: '2026-01-18T00:00:00Z',
    updatedAt: '2026-01-18T00:00:00Z',
  }

  it('should convert JSON to Order object', () => {
    const order: Order = OrderAdapter.fromJson(rawJson)

    expect(order.id).toBe(1)
    expect(order.userId).toBe(101)
    expect(order.total).toBe('150.00')
    expect(order.shippingId).toBe(20)
    expect(order.createdAt).toBe('2026-01-18T00:00:00.000Z')
    expect(order.updatedAt).toBe('2026-01-18T00:00:00.000Z')
  })

  it('should convert Order object back to JSON', () => {
    const order: Order = OrderAdapter.fromJson(rawJson)
    const json = OrderAdapter.toJson(order)

    expect(json.id).toBe(1)
    expect(json.userId).toBe(101)
    expect(json.total).toBe('150.00')
    expect(json.shippingId).toBe(20)
    expect(json.createdAt).toBe('2026-01-18T00:00:00.000Z')
    expect(json.updatedAt).toBe('2026-01-18T00:00:00.000Z')
  })

  it('should handle partial Order (CreateOrder/UpdateOrder) without createdAt/updatedAt', () => {
    const partialOrder = {
      userId: 102,
      total: '75.50',
    }

    const json = OrderAdapter.toJson(partialOrder)
    expect(json.userId).toBe(102)
    expect(json.total).toBe('75.50')
    expect(json.createdAt).toBeUndefined()
    expect(json.updatedAt).toBeUndefined()
  })
})
