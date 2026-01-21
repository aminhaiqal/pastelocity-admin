import { OrderAdapter } from '../order.adapter'
import { Order } from '@/domains/order'

describe('OrderAdapter', () => {
  const rawJson = {
    id: 1,
    userId: 101,
    total: '150.00',
    shippingId: 20,
    created_at: '2026-01-18T00:00:00Z',
    updated_at: '2026-01-18T00:00:00Z',
  }

  it('should convert JSON to Order object', () => {
    const order: Order = OrderAdapter.fromJson(rawJson)

    expect(order.id).toBe(1)
    expect(order.userId).toBe(101)
    expect(order.total).toBe('150.00')
    expect(order.shippingId).toBe(20)
    expect(order.created_at).toBe('2026-01-18T00:00:00.000Z')
    expect(order.updated_at).toBe('2026-01-18T00:00:00.000Z')
  })

  it('should convert Order object back to JSON', () => {
    const order: Order = OrderAdapter.fromJson(rawJson)
    const json = OrderAdapter.toJson(order)

    expect(json.id).toBe(1)
    expect(json.userId).toBe(101)
    expect(json.total).toBe('150.00')
    expect(json.shippingId).toBe(20)
    expect(json.created_at).toBe('2026-01-18T00:00:00.000Z')
    expect(json.updated_at).toBe('2026-01-18T00:00:00.000Z')
  })

  it('should handle partial Order (CreateOrder/UpdateOrder) without created_at/updated_at', () => {
    const partialOrder = {
      userId: 102,
      total: '75.50',
    }

    const json = OrderAdapter.toJson(partialOrder)
    expect(json.userId).toBe(102)
    expect(json.total).toBe('75.50')
    expect(json.created_at).toBeUndefined()
    expect(json.updated_at).toBeUndefined()
  })
})
