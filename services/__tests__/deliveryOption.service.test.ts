import { deliveryOptionService } from '../deliveryOption.service'
import { CreateDeliveryOption, UpdateDeliveryOption, DeliveryOption } from '@/domains/shipping'

describe('DeliveryOptionService (memory strategy)', () => {
  beforeEach(() => {
    // Clear memory before each test
    deliveryOptionService.clearMemory()
    process.env.SHIPPING_SEED_STRATEGY = 'memory'
  })

  it('should create a delivery option', async () => {
    const input: CreateDeliveryOption = {
      region: 'US',
      shippingFee: '10.00',
      estimate: '2-3 days',
      freeShippingMinPurchase: '50.00',
    }

    const option = await deliveryOptionService.createOption(input)

    expect(option.id).toBe(1)
    expect(option.region).toBe('US')
    expect(option.shippingFee).toBe('10.00')
    expect(option.estimate).toBe('2-3 days')
    expect(option.freeShippingMinPurchase).toBe('50.00')
    expect(option.exclusion).toBeUndefined()
  })

  it('should get a delivery option by id', async () => {
    const created = await deliveryOptionService.createOption({
      region: 'EU',
      shippingFee: '5.00',
    })
    const fetched = await deliveryOptionService.getOption(created.id)
    expect(fetched).toEqual(created)
  })

  it('should list all delivery options', async () => {
    await deliveryOptionService.createOption({ region: 'Asia', shippingFee: '3.00' })
    await deliveryOptionService.createOption({ region: 'Europe', shippingFee: '7.00', estimate: '5-7 days' })

    const all = await deliveryOptionService.listOptions()
    expect(all).toHaveLength(2)
    expect(all[0].region).toBe('Asia')
    expect(all[1].region).toBe('Europe')
  })

  it('should update a delivery option', async () => {
    const created = await deliveryOptionService.createOption({
      region: 'Old Region',
      shippingFee: '5.00',
      estimate: '3-5 days',
    })

    const updateInput: UpdateDeliveryOption & { id: number } = {
      id: created.id,
      region: 'New Region',
      shippingFee: '6.00',
    }

    const updated = await deliveryOptionService.updateOption(updateInput)

    expect(updated.id).toBe(created.id)
    expect(updated.region).toBe('New Region')
    expect(updated.shippingFee).toBe('6.00')
    expect(updated.estimate).toBe('3-5 days') // unchanged
  })

  it('should throw when updating non-existent delivery option', async () => {
    await expect(
      deliveryOptionService.updateOption({ id: 999, region: 'Fail', shippingFee: '0.00' })
    ).rejects.toThrow('DeliveryOption 999 not found in memory')
  })

  it('should seed multiple delivery options', async () => {
    const seedData: CreateDeliveryOption[] = [
      { region: 'A', shippingFee: '1.00' },
      { region: 'B', shippingFee: '2.00', estimate: '2-3 days' },
    ]

    const seeded = await deliveryOptionService.seedOptions(seedData)

    expect(seeded).toHaveLength(2)
    expect(seeded[0].region).toBe('A')
    expect(seeded[1].region).toBe('B')

    const all = await deliveryOptionService.listOptions()
    expect(all).toHaveLength(2)
  })

  it('should return undefined for non-existent id', async () => {
    const fetched = await deliveryOptionService.getOption(999)
    expect(fetched).toBeUndefined()
  })
})
