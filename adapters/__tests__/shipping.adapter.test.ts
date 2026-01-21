import { ShippingAdapter } from '../shipping.adapter'
import { Shipping } from '@/domains/shipping'

describe('ShippingAdapter', () => {
  const rawJson = {
    id: 1,
    address1: '123 Main St',
    address2: 'Apt 4B',
    zip: '90210',
    city: 'Los Angeles',
    stateName: 'California',
    deliveryOptionId: 20,
    created_at: '2026-01-18T00:00:00Z',
  }

  it('should convert JSON to Shipping object', () => {
    const shipping: Shipping = ShippingAdapter.fromJson(rawJson)

    expect(shipping.id).toBe(1)
    expect(shipping.address1).toBe('123 Main St')
    expect(shipping.address2).toBe('Apt 4B')
    expect(shipping.zip).toBe('90210')
    expect(shipping.city).toBe('Los Angeles')
    expect(shipping.stateName).toBe('California')
    expect(shipping.deliveryOptionId).toBe(20)
    expect(shipping.created_at).toBe('2026-01-18T00:00:00.000Z')
  })

  it('should convert Shipping object back to JSON', () => {
    const shipping: Shipping = ShippingAdapter.fromJson(rawJson)
    const json = ShippingAdapter.toJson(shipping)

    expect(json.id).toBe(1)
    expect(json.address1).toBe('123 Main St')
    expect(json.address2).toBe('Apt 4B')
    expect(json.zip).toBe('90210')
    expect(json.city).toBe('Los Angeles')
    expect(json.stateName).toBe('California')
    expect(json.deliveryOptionId).toBe(20)
    expect(json.created_at).toBe('2026-01-18T00:00:00.000Z')
  })

  it('should handle partial Shipping (Create/Update) without created_at', () => {
    const partialShipping = {
      address1: '456 Elm St',
      zip: '10001',
      city: 'New York',
      stateName: 'NY',
    }

    const json = ShippingAdapter.toJson(partialShipping)
    expect(json.address1).toBe('456 Elm St')
    expect(json.zip).toBe('10001')
    expect(json.city).toBe('New York')
    expect(json.stateName).toBe('NY')
    expect(json.created_at).toBeUndefined()
  })
})
