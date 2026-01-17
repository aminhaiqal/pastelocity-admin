import { DeliveryRateAdapter } from '../deliveryRate.adapter'
import { DeliveryRate } from '@/domains/shipping'

describe('DeliveryRateAdapter', () => {
  const rawJson = {
    id: 1,
    country: 'USA',
    deliveryOptionId: 10,
  }

  it('should convert JSON to DeliveryRate object', () => {
    const rate: DeliveryRate = DeliveryRateAdapter.fromJson(rawJson)

    expect(rate.id).toBe(1)
    expect(rate.country).toBe('USA')
    expect(rate.deliveryOptionId).toBe(10)
  })

  it('should convert DeliveryRate object back to JSON', () => {
    const rate: DeliveryRate = DeliveryRateAdapter.fromJson(rawJson)
    const json = DeliveryRateAdapter.toJson(rate)

    expect(json.id).toBe(1)
    expect(json.country).toBe('USA')
    expect(json.deliveryOptionId).toBe(10)
  })

  it('should handle partial object (Create/Update) without id', () => {
    const partialRate = {
      country: 'Canada',
      deliveryOptionId: 20,
    }

    const json = DeliveryRateAdapter.toJson(partialRate)
    expect(json.country).toBe('Canada')
    expect(json.deliveryOptionId).toBe(20)
    expect(json.id).toBeUndefined()
  })
})
