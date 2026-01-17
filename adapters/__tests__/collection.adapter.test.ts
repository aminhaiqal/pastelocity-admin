import { CollectionAdapter } from '../collection.adapter'
import { ProductAdapter } from '../product.adapter'
import { Collection } from '@/domains/catalog'

describe('CollectionAdapter', () => {
  const rawJson = {
    id: 1,
    name: 'Summer Collection',
    slug: 'summer-collection',
    description: 'A collection of summer products',
    image: 'image.png',
    isAvailable: true,
    createdAt: '2026-01-18T00:00:00Z',
    updatedAt: '2026-01-18T00:00:00Z',
    products: [
      {
        id: 101,
        name: 'T-shirt',
        quantity: 10,
        price: 20,
        createdAt: '2026-01-18T00:00:00Z',
        updatedAt: '2026-01-18T00:00:00Z',
      },
    ],
  }

  it('should convert JSON to Collection object', () => {
    const collection: Collection = CollectionAdapter.fromJson(rawJson)

    expect(collection.id).toBe(1)
    expect(collection.name).toBe('Summer Collection')
    expect(collection.products).toHaveLength(1)
    expect(collection.products![0].name).toBe('T-shirt')
    expect(collection.createdAt).toBe('2026-01-18T00:00:00.000Z') // ISO normalized
  })

  it('should convert Collection object back to JSON', () => {
    const collection: Collection = CollectionAdapter.fromJson(rawJson)
    const json = CollectionAdapter.toJson(collection)

    expect(json.id).toBe(1)
    expect(json.name).toBe('Summer Collection')
    expect(json.products).toHaveLength(1)
    expect(json.products[0].name).toBe('T-shirt')
  })

  it('should handle collection without products', () => {
    const raw = { ...rawJson, products: undefined }
    const collection: Collection = CollectionAdapter.fromJson(raw)
    const json = CollectionAdapter.toJson(collection)

    expect(collection.products).toBeUndefined()
    expect(json.products).toBeUndefined()
  })
})
