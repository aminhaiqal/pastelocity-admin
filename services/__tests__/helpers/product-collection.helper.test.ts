import { handleProductCollection } from '@/services/helpers/product-collection.helper'
import { addProductIntoCollection, removeProductFromCollection, Product } from '@/domains/catalog'

jest.mock('../../../domains/catalog', () => ({
  addProductIntoCollection: jest.fn(),
  removeProductFromCollection: jest.fn(),
}))

describe('handleProductCollection', () => {
  const product: Product = {
    id: 1,
    name: 'Test Product',
    quantity: 1,
    price: '100',
    description: 'Test Desc',
    cutting_type: 'Standard',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should add product when oldCollectionId is null and newCollectionId exists', async () => {
    await handleProductCollection(product, undefined, 5)

    expect(addProductIntoCollection).toHaveBeenCalledWith(product.id, 5)
    expect(removeProductFromCollection).not.toHaveBeenCalled()
  })

  it('should remove old and add new when collectionId changes', async () => {
    await handleProductCollection(product, 3, 7)

    expect(removeProductFromCollection).toHaveBeenCalledWith(product.id)
    expect(addProductIntoCollection).toHaveBeenCalledWith(product.id, 7)
  })

  it('should remove product when newCollectionId is null and oldCollectionId exists', async () => {
    await handleProductCollection(product, 2, undefined)

    expect(removeProductFromCollection).toHaveBeenCalledWith(product.id)
    expect(addProductIntoCollection).not.toHaveBeenCalled()
  })

  it('should do nothing when both old and new collectionId are null', async () => {
    await handleProductCollection(product, undefined, undefined)

    expect(removeProductFromCollection).not.toHaveBeenCalled()
    expect(addProductIntoCollection).not.toHaveBeenCalled()
  })

  it('should do nothing when oldCollectionId equals newCollectionId', async () => {
    await handleProductCollection(product, 4, 4)

    expect(removeProductFromCollection).not.toHaveBeenCalled()
    expect(addProductIntoCollection).not.toHaveBeenCalled()
  })
})
