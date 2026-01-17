// services/__tests__/order.service.test.ts
import { orderService } from '../order.service'
import { CreateOrder, UpdateOrder } from '@/domains/order'

describe('OrderService (memory strategy)', () => {
  beforeEach(() => {
    orderService.clearMemory()
    process.env.ORDER_SEED_STRATEGY = 'memory'
  })

  it('should create an order', async () => {
    const input: CreateOrder = {
      userId: 1,
      total: '100.00',
      shippingId: 1,
    }

    const order = await orderService.createOrder(input)

    expect(order.id).toBe(1)
    expect(order.userId).toBe(1)
    expect(order.total).toBe('100.00')
    expect(order.shippingId).toBe(1)
    expect(order.createdAt).toBeDefined()
    expect(order.updatedAt).toBeDefined()
  })

  it('should get an order by id', async () => {
    const created = await orderService.createOrder({
      userId: 2,
      total: '50.00',
    })

    const fetched = await orderService.getOrder(created.id)
    expect(fetched).toEqual(created)
  })

  it('should list all orders', async () => {
    await orderService.createOrder({ userId: 1, total: '10.00' })
    await orderService.createOrder({ userId: 2, total: '20.00' })

    const all = await orderService.listOrders()
    expect(all).toHaveLength(2)
    expect(all[0].userId).toBe(1)
    expect(all[1].userId).toBe(2)
  })

  it('should update an order', async () => {
    const created = await orderService.createOrder({ userId: 1, total: '10.00' })

    const updateInput: UpdateOrder = {
      id: created.id,
      total: '15.00',
      shippingId: 2,
    }

    const updated = await orderService.updateOrder(updateInput)

    expect(updated.id).toBe(created.id)
    expect(updated.total).toBe('15.00')
    expect(updated.shippingId).toBe(2)
    expect(updated.userId).toBe(1) // unchanged
    expect(updated.updatedAt).toBeDefined()
  })

  it('should throw when updating non-existent order', async () => {
    await expect(orderService.updateOrder({ id: 999, total: '0.00', userId: 1 }))
      .rejects
      .toThrow('Order 999 not found in memory')
  })

  it('should seed multiple orders', async () => {
    const seedData: CreateOrder[] = [
      { userId: 1, total: '100.00' },
      { userId: 2, total: '200.00', shippingId: 1 },
    ]

    const seeded = await orderService.seedOrders(seedData)

    expect(seeded).toHaveLength(2)
    expect(seeded[0].userId).toBe(1)
    expect(seeded[1].userId).toBe(2)

    const all = await orderService.listOrders()
    expect(all).toHaveLength(2)
  })

  it('should return undefined for non-existent id', async () => {
    const fetched = await orderService.getOrder(999)
    expect(fetched).toBeUndefined()
  })
})
