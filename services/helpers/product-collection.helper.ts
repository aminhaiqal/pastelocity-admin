import { addProductIntoCollection, Product, removeProductFromCollection } from '@/domains/catalog'

export async function handleProductCollection(product: Product, oldCollectionId?: number, newCollectionId?: number) {
  if (newCollectionId != null && oldCollectionId == null) {
    // From null → number: add
    await addProductIntoCollection(product.id, newCollectionId)
  } else if (newCollectionId != null && oldCollectionId != null && newCollectionId !== oldCollectionId) {
    // Number changed: remove old, add new
    await removeProductFromCollection(product.id)
    await addProductIntoCollection(product.id, newCollectionId)
  } else if (newCollectionId == null && oldCollectionId != null) {
    // From number → null: remove
    await removeProductFromCollection(product.id)
  }
}
