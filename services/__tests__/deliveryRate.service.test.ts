import { deliveryRateService } from '../deliveryRate.service'
import { CreateDeliveryRate, UpdateDeliveryRate, DeliveryRate } from '@/domains/shipping'

describe('DeliveryRateService (memory strategy)', () => {
  beforeEach(() => {
    deliveryRateService.clearMemory()
    process.env.SHIPPING_SEED_STRATEGY = 'memory'
  })

  it('should create a delivery rate', async () => {
    const input: CreateDeliveryRate = {
      country: 'US',
      deliveryOptionId: 1,
    }

    const rate = await deliveryRateService.createRate(input)

    expect(rate.id).toBe(1)
    expect(rate.country).toBe('US')
    expect(rate.deliveryOptionId).toBe(1)
  })

  it('should get a delivery rate by id', async () => {
    const created = await deliveryRateService.createRate({ country: 'CA', deliveryOptionId: 2 })
    const fetched = await deliveryRateService.getRate(created.id)
    expect(fetched).toEqual(created)
  })

  it('should list rates by delivery option', async () => {
    await deliveryRateService.createRate({ country: 'US', deliveryOptionId: 1 })
    await deliveryRateService.createRate({ country: 'CA', deliveryOptionId: 1 })
    await deliveryRateService.createRate({ country: 'MX', deliveryOptionId: 2 })

    const option1Rates = await deliveryRateService.listRatesByOption(1)
    expect(option1Rates).toHaveLength(2)
    expect(option1Rates.map(r => r.country)).toEqual(['US', 'CA'])

    const option2Rates = await deliveryRateService.listRatesByOption(2)
    expect(option2Rates).toHaveLength(1)
    expect(option2Rates[0].country).toBe('MX')
  })

  it('should update a delivery rate', async () => {
    const created = await deliveryRateService.createRate({ country: 'Old Country', deliveryOptionId: 1 })

    const updateInput: UpdateDeliveryRate & { id: number } = {
      id: created.id,
      country: 'New Country',
    }

    const updated = await deliveryRateService.updateRate(updateInput)

    expect(updated.id).toBe(created.id)
    expect(updated.country).toBe('New Country')
    expect(updated.deliveryOptionId).toBe(1) // unchanged
  })

  it('should throw when updating non-existent delivery rate', async () => {
    await expect(
      deliveryRateService.updateRate({ id: 999, country: 'Fail', deliveryOptionId: 1 })
    ).rejects.toThrow('DeliveryRate 999 not found in memory')
  })

  it('should seed multiple delivery rates', async () => {
    const seedData: CreateDeliveryRate[] = [
      { country: 'A', deliveryOptionId: 1 },
      { country: 'B', deliveryOptionId: 2 },
    ]

    const seeded = await deliveryRateService.seedRates(seedData)

    expect(seeded).toHaveLength(2)
    expect(seeded[0].country).toBe('A')
    expect(seeded[1].country).toBe('B')

    const allRatesOption1 = await deliveryRateService.listRatesByOption(1)
    expect(allRatesOption1).toHaveLength(1)
    expect(allRatesOption1[0].country).toBe('A')
  })

  it('should return undefined for non-existent id', async () => {
    const fetched = await deliveryRateService.getRate(999)
    expect(fetched).toBeUndefined()
  })
})
