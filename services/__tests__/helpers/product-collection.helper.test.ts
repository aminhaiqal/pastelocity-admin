import { collectionService } from '@/services/collection.service'
import { productService } from '@/services/product.service'
import { addProductsToCollection } from '@/services/helpers/product-collection.helper'

describe('addProductsToCollection', () => {
  beforeEach(() => {
    collectionService.clearMemory()
    productService.clearMemory()
  })

  it('should create a collection and add products', async () => {
    const products = [
      { collectionName: 'Summer', name: 'Sunglasses', quantity: 5, price: 20 },
      { collectionName: 'Summer', name: 'Hat', quantity: 10, price: 15 },
    ]

    const result = await addProductsToCollection(products)

    expect(result).toHaveLength(2)
    expect(result[0].collection_id).toBe(1)
    expect(result[1].collection_id).toBe(1)

    const collections = await collectionService.listCollections()
    expect(collections).toHaveLength(1)
    expect(collections[0].name).toBe('Summer')
    expect(collections[0].products).toHaveLength(2)
    expect(collections[0].products?.map(p => p.name)).toEqual(['Sunglasses', 'Hat'])

    const allProducts = await productService.listProducts()
    expect(allProducts).toHaveLength(2)
    expect(allProducts.map(p => p.name)).toEqual(['Sunglasses', 'Hat'])
  })

  it('should not duplicate products', async () => {
    const products = [
      { collectionName: 'Winter', name: 'Scarf', quantity: 3, price: 12 },
    ]

    await addProductsToCollection(products)
    await addProductsToCollection(products) // same product again

    const collections = await collectionService.listCollections()
    expect(collections).toHaveLength(1)
    expect(collections[0].products).toHaveLength(1) // duplicate ignored

    const allProducts = await productService.listProducts()
    expect(allProducts).toHaveLength(1)
  })

  it('should create multiple collections', async () => {
    const products = [
      { collectionName: 'Summer', name: 'Sunglasses', quantity: 5, price: 20 },
      { collectionName: 'Winter', name: 'Gloves', quantity: 4, price: 10 },
    ]

    await addProductsToCollection(products)

    const collections = await collectionService.listCollections()
    expect(collections).toHaveLength(2)
    expect(collections.map(c => c.name)).toEqual(['Summer', 'Winter'])
  })
})
