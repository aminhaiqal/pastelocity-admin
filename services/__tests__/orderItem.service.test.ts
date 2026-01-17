import { orderItemService } from '../orderItem.service'
import { CreateOrderItem, UpdateOrderItem } from '@/domains/order'

describe('OrderItemService (memory strategy)', () => {
  beforeEach(() => {
    orderItemService.clearMemory()
    process.env.ORDER_SEED_STRATEGY = 'memory'
  })

  it('should create an order item', async () => {
    const input: CreateOrderItem = {
      orderId: 1,
      productId: 2,
      quantity: 3,
      price: '30.00',
    }

    const item = await orderItemService.createOrderItem(input)

    expect(item.id).toBe(1)
    expect(item.orderId).toBe(1)
    expect(item.productId).toBe(2)
    expect(item.quantity).toBe(3)
    expect(item.price).toBe('30.00')
    expect(item.createdAt).toBeDefined()
  })

  it('should get an order item by id', async () => {
    const created = await orderItemService.createOrderItem({
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: '10.00',
    })

    const fetched = await orderItemService.getOrderItem(created.id)
    expect(fetched).toEqual(created)
  })

  it('should list all order items', async () => {
    await orderItemService.createOrderItem({ orderId: 1, productId: 1, quantity: 1, price: '10.00' })
    await orderItemService.createOrderItem({ orderId: 1, productId: 2, quantity: 2, price: '20.00' })

    const all = await orderItemService.listOrderItems()
    expect(all).toHaveLength(2)
    expect(all[0].productId).toBe(1)
    expect(all[1].productId).toBe(2)
  })

  it('should update an order item', async () => {
    const created = await orderItemService.createOrderItem({
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: '10.00',
    })

    const updateInput: UpdateOrderItem = {
      id: created.id,
      quantity: 5,
      price: '50.00',
    }

    const updated = await orderItemService.updateOrderItem(updateInput)

    expect(updated.id).toBe(created.id)
    expect(updated.quantity).toBe(5)
    expect(updated.price).toBe('50.00')
    expect(updated.orderId).toBe(1) // unchanged
    expect(updated.productId).toBe(1) // unchanged
  })

  it('should throw when updating non-existent order item', async () => {
    await expect(orderItemService.updateOrderItem({ id: 999, quantity: 1 }))
      .rejects
      .toThrow('OrderItem 999 not found in memory')
  })

  it('should delete an order item', async () => {
    const created = await orderItemService.createOrderItem({
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: '10.00',
    })

    const deleted = await orderItemService.deleteOrderItem(created.id)
    expect(deleted).toEqual(created)

    const all = await orderItemService.listOrderItems()
    expect(all).toHaveLength(0)
  })

  it('should throw when deleting non-existent order item', async () => {
    await expect(orderItemService.deleteOrderItem(999))
      .rejects
      .toThrow('OrderItem 999 not found in memory')
  })

  it('should seed multiple order items', async () => {
    const seedData: CreateOrderItem[] = [
      { orderId: 1, productId: 1, quantity: 1, price: '10.00' },
      { orderId: 1, productId: 2, quantity: 2, price: '20.00' },
    ]

    const seeded = await orderItemService.seedOrderItems(seedData)

    expect(seeded).toHaveLength(2)
    expect(seeded[0].productId).toBe(1)
    expect(seeded[1].productId).toBe(2)

    const all = await orderItemService.listOrderItems()
    expect(all).toHaveLength(2)
  })

  it('should return undefined for non-existent id', async () => {
    const fetched = await orderItemService.getOrderItem(999)
    expect(fetched).toBeUndefined()
  })
})
