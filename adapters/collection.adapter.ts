import { Collection, CreateCollection, UpdateCollection } from "@/domains/catalog"
import { ProductAdapter } from "./product.adapter"

// Adapter for Collection entity
export const CollectionAdapter = {
  fromJson(json: any): Collection {
    return {
      id: json.id,
      name: json.name,
      slug: json.slug,
      description: json.description,
      image: json.image,
      is_available: json.isAvailable,
      created_at: new Date(json.createdAt).toISOString(),
      updated_at: new Date(json.updatedAt).toISOString(),
      products: json.products?.map(ProductAdapter.fromJson),
    }
  },

  toJson(collection: Collection | CreateCollection | UpdateCollection) {
    const json: any = { ...collection }

    if ("products" in collection && collection.products) {
      json.products = collection.products.map(ProductAdapter.toJson)
    }

    return json
  },
}
