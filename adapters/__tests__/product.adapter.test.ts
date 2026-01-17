import { ProductAdapter } from '../product.adapter'
import { Product } from '@/domains/catalog'

describe('ProductAdapter', () => {
  const rawJson = {
    id: 1,
    collectionId: 10,
    name: 'T-shirt',
    color: 'Red',
    length: 'M',
    quantity: 50,
    price: 29.99,
    cuttingType: 'Standard',
    imageUrl: 'tshirt.png',
    description: 'A red T-shirt',
    createdAt: '2026-01-18T00:00:00Z',
    updatedAt: '2026-01-18T00:00:00Z',
  }

  it('should convert JSON to Product object', () => {
    const product: Product = ProductAdapter.fromJson(rawJson)

    expect(product.id).toBe(1)
    expect(product.collectionId).toBe(10)
    expect(product.name).toBe('T-shirt')
    expect(product.color).toBe('Red')
    expect(product.length).toBe('M')
    expect(product.quantity).toBe(50)
    expect(product.price).toBe(29.99)
    expect(product.cuttingType).toBe('Standard')
    expect(product.imageUrl).toBe('tshirt.png')
    expect(product.description).toBe('A red T-shirt')
    expect(product.createdAt).toBe('2026-01-18T00:00:00.000Z') // ISO normalized
    expect(product.updatedAt).toBe('2026-01-18T00:00:00.000Z')
  })

  it('should convert Product object back to JSON', () => {
    const product: Product = ProductAdapter.fromJson(rawJson)
    const json = ProductAdapter.toJson(product)

    expect(json.id).toBe(1)
    expect(json.collectionId).toBe(10)
    expect(json.name).toBe('T-shirt')
    expect(json.color).toBe('Red')
    expect(json.length).toBe('M')
    expect(json.quantity).toBe(50)
    expect(json.price).toBe(29.99)
    expect(json.cuttingType).toBe('Standard')
    expect(json.imageUrl).toBe('tshirt.png')
    expect(json.description).toBe('A red T-shirt')
    expect(json.createdAt).toBe('2026-01-18T00:00:00.000Z')
    expect(json.updatedAt).toBe('2026-01-18T00:00:00.000Z')
  })

  it('should handle partial Product (CreateProduct/UpdateProduct) without createdAt/updatedAt', () => {
    const partialProduct = {
      name: 'Hat',
      quantity: 5,
      price: 15,
    }

    const json = ProductAdapter.toJson(partialProduct)
    expect(json.name).toBe('Hat')
    expect(json.quantity).toBe(5)
    expect(json.price).toBe(15)
    expect(json.createdAt).toBeUndefined()
    expect(json.updatedAt).toBeUndefined()
  })
})
