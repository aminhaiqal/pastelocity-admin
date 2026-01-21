import { ProductAdapter } from '../product.adapter'
import { Product } from '@/domains/catalog'

describe('ProductAdapter', () => {
  const rawJson = {
    id: 1,
    collection_id: 10,
    name: 'T-shirt',
    color: 'Red',
    length: 'M',
    quantity: 50,
    price: 29.99,
    cutting_type: 'Standard',
    image_url: 'tshirt.png',
    description: 'A red T-shirt',
    created_at: '2026-01-18T00:00:00Z',
    updated_at: '2026-01-18T00:00:00Z',
  }

  it('should convert JSON to Product object', () => {
    const product: Product = ProductAdapter.fromJson(rawJson)

    expect(product.id).toBe(1)
    expect(product.collection_id).toBe(10)
    expect(product.name).toBe('T-shirt')
    expect(product.color).toBe('Red')
    expect(product.length).toBe('M')
    expect(product.quantity).toBe(50)
    expect(product.price).toBe(29.99)
    expect(product.cutting_type).toBe('Standard')
    expect(product.image_url).toBe('tshirt.png')
    expect(product.description).toBe('A red T-shirt')
    expect(product.created_at).toBe('2026-01-18T00:00:00.000Z') // ISO normalized
    expect(product.updated_at).toBe('2026-01-18T00:00:00.000Z')
  })

  it('should convert Product object back to JSON', () => {
    const product: Product = ProductAdapter.fromJson(rawJson)
    const json = ProductAdapter.toJson(product)

    expect(json.id).toBe(1)
    expect(json.collection_id).toBe(10)
    expect(json.name).toBe('T-shirt')
    expect(json.color).toBe('Red')
    expect(json.length).toBe('M')
    expect(json.quantity).toBe(50)
    expect(json.price).toBe(29.99)
    expect(json.cutting_type).toBe('Standard')
    expect(json.image_url).toBe('tshirt.png')
    expect(json.description).toBe('A red T-shirt')
    expect(json.created_at).toBe('2026-01-18T00:00:00.000Z')
    expect(json.updated_at).toBe('2026-01-18T00:00:00.000Z')
  })

  it('should handle partial Product (CreateProduct/UpdateProduct) without created_at/updated_at', () => {
    const partialProduct = {
      name: 'Hat',
      quantity: 5,
      price: 15,
    }

    const json = ProductAdapter.toJson(partialProduct)
    expect(json.name).toBe('Hat')
    expect(json.quantity).toBe(5)
    expect(json.price).toBe(15)
    expect(json.created_at).toBeUndefined()
    expect(json.updated_at).toBeUndefined()
  })
})
