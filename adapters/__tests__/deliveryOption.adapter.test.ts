import { DeliveryOptionAdapter } from '../deliveryOption.adapter'
import { DeliveryOption } from '@/domains/shipping'

describe('DeliveryOptionAdapter', () => {
  const rawJson = {
    id: 1,
    country: 'US',
    region: 'East Coast',
    shippingFee: '10.00',
    estimate: '3-5 days',
    exclusion: 'None',
    freeShippingMinPurchase: '100.00',
  }

  it('should convert JSON to DeliveryOption object', () => {
    const option: DeliveryOption = DeliveryOptionAdapter.fromJson(rawJson)

    expect(option.id).toBe(1)
    expect(option.country).toBe('US')
    expect(option.region).toBe('East Coast')
    expect(option.shippingFee).toBe('10.00')
    expect(option.estimate).toBe('3-5 days')
    expect(option.exclusion).toBe('None')
    expect(option.freeShippingMinPurchase).toBe('100.00')
  })

  it('should convert DeliveryOption object back to JSON', () => {
    const option: DeliveryOption = DeliveryOptionAdapter.fromJson(rawJson)
    const json = DeliveryOptionAdapter.toJson(option)

    expect(json.id).toBe(1)
    expect(json.country).toBe('US')
    expect(json.region).toBe('East Coast')
    expect(json.shippingFee).toBe('10.00')
    expect(json.estimate).toBe('3-5 days')
    expect(json.exclusion).toBe('None')
    expect(json.freeShippingMinPurchase).toBe('100.00')
  })

  it('should handle Create/Update payload without id', () => {
    const partialOption = {
      country: 'US',
      region: 'West Coast',
      shippingFee: '15.00',
    }

    const json = DeliveryOptionAdapter.toJson(partialOption)

    expect(json.id).toBeUndefined()
    expect(json.country).toBe('US')
    expect(json.region).toBe('West Coast')
    expect(json.shippingFee).toBe('15.00')
  })
})
