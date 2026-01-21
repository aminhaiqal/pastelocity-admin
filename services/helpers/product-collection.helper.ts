import { collectionService } from '../collection.service'
import { productService } from '../product.service'
import { CreateCollection } from '@/domains/catalog'
import { CreateProduct } from '@/domains/catalog'

interface ProductWithCollection extends CreateProduct {
  collectionName: string
}

/**
 * Add multiple products to a collection.
 * - Auto-creates the collection if it doesn't exist
 * - Updates collection.products
 * - Ignores duplicate products (by name + collection)
 */
export async function addProductsToCollection(products: ProductWithCollection[]) {
  const results: { collection_id: number; productIds: number[] }[] = []

  for (const productInput of products) {
    const { collectionName, ...prodData } = productInput

    let collection = (await collectionService.listCollections()).find(
      c => c.name.toLowerCase() === collectionName.toLowerCase()
    )

    if (!collection) {
      const newCollection: CreateCollection = {
        name: collectionName,
        isAvailable: true,
      }
      collection = await collectionService.createCollection(newCollection)
    }

    const existingProduct = (collection.products || []).find(
      p => p.name === prodData.name
    )

    if (existingProduct) {
      // skip duplicates
      continue
    }

    const newProduct = await productService.createProduct({
      ...prodData,
      collection_id: collection.id,
    })

    collection.products = collection.products || []
    collection.products.push(newProduct)

    results.push({
      collection_id: collection.id,
      productIds: [newProduct.id],
    })
  }

  return results
}
