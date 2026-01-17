// services/__tests__/shipping.service.test.ts
import { shippingService } from '../shipping.service'
import { CreateShipping, UpdateShipping } from '@/domains/shipping'

describe('ShippingService (memory strategy)', () => {
  beforeEach(() => {
    shippingService.clearMemory()
    process.env.SHIPPING_SEED_STRATEGY = 'memory'
  })

  it('should create a shipping record', async () => {
    const input: CreateShipping = {
      address1: '123 Main St',
      address2: 'Apt 4',
      zip: '12345',
      city: 'Cityville',
      stateName: 'State',
      deliveryRateId: 1,
      deliveryOptionId: 2,
    }

    const shipping = await shippingService.createShipping(input)

    expect(shipping.id).toBe(1)
    expect(shipping.address1).toBe('123 Main St')
    expect(shipping.address2).toBe('Apt 4')
    expect(shipping.zip).toBe('12345')
    expect(shipping.city).toBe('Cityville')
    expect(shipping.stateName).toBe('State')
    expect(shipping.deliveryRateId).toBe(1)
    expect(shipping.deliveryOptionId).toBe(2)
    expect(shipping.createdAt).toBeDefined()
  })

  it('should get a shipping by id', async () => {
    const created = await shippingService.createShipping({
      address1: '456 Another St',
      zip: '67890',
      city: 'Townsville',
      stateName: 'Province',
    })

    const fetched = await shippingService.getShipping(created.id)
    expect(fetched).toEqual(created)
  })

  it('should list shippings by user (id in this mock)', async () => {
    await shippingService.createShipping({
      address1: 'Addr 1',
      zip: '11111',
      city: 'C1',
      stateName: 'S1',
    })
    await shippingService.createShipping({
      address1: 'Addr 2',
      zip: '22222',
      city: 'C2',
      stateName: 'S2',
    })

    // in-memory mock uses id as "userId" for demonstration
    const list = await shippingService.listShippingsByUser(1)
    expect(list).toHaveLength(1)
    expect(list[0].address1).toBe('Addr 1')
  })

  it('should update a shipping', async () => {
    const created = await shippingService.createShipping({
      address1: 'Old Address',
      zip: '00000',
      city: 'Old City',
      stateName: 'Old State',
    })

    const updateInput: UpdateShipping = {
      address1: 'New Address',
      city: 'New City',
      zip: '99999',
      stateName: 'New State',
    }

    const updated = await shippingService.updateShipping(created.id, updateInput)

    expect(updated.id).toBe(created.id)
    expect(updated.address1).toBe('New Address')
    expect(updated.city).toBe('New City')
    expect(updated.zip).toBe('99999')
    expect(updated.stateName).toBe('New State')
    expect(updated.address2).toBeUndefined() // unchanged optional field
  })

  it('should throw when updating non-existent shipping', async () => {
    await expect(
      shippingService.updateShipping(999, { address1: 'Fail', zip: '0', city: 'X', stateName: 'Y' })
    ).rejects.toThrow('Shipping 999 not found in memory')
  })

  it('should delete a shipping', async () => {
    const created = await shippingService.createShipping({
      address1: 'To Delete',
      zip: '33333',
      city: 'DeleteCity',
      stateName: 'DeleteState',
    })

    const deleted = await shippingService.deleteShipping(created.id)
    expect(deleted).toEqual(created)

    const all = await shippingService.listShippingsByUser(created.id)
    expect(all).toHaveLength(0)
  })

  it('should throw when deleting non-existent shipping', async () => {
    await expect(shippingService.deleteShipping(999)).rejects.toThrow('Shipping 999 not found in memory')
  })

  it('should seed multiple shippings', async () => {
    const seedData: CreateShipping[] = [
      { address1: 'A1', zip: '10000', city: 'C1', stateName: 'S1' },
      { address1: 'B2', zip: '20000', city: 'C2', stateName: 'S2' },
    ]

    const seeded = await shippingService.seedShippings(seedData)

    expect(seeded).toHaveLength(2)
    expect(seeded[0].address1).toBe('A1')
    expect(seeded[1].address1).toBe('B2')

    const all = await shippingService.listShippingsByUser(1)
    expect(all).toHaveLength(1)
  })

  it('should return undefined for non-existent id', async () => {
    const fetched = await shippingService.getShipping(999)
    expect(fetched).toBeUndefined()
  })
})
