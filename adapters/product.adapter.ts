import { Product, CreateProduct, UpdateProduct } from "@/domains/catalog"

// Adapter for Product entity
export const ProductAdapter = {
  fromJson(json: any): Product {
    return {
      id: json.id,
      collectionId: json.collectionId,
      name: json.name,
      color: json.color,
      length: json.length,
      quantity: json.quantity,
      price: json.price,
      cuttingType: json.cuttingType,
      imageUrl: json.imageUrl,
      description: json.description,
      createdAt: new Date(json.createdAt).toISOString(),
      updatedAt: new Date(json.updatedAt).toISOString(),
    }
  },

  toJson(product: Product | CreateProduct | UpdateProduct) {
    const json: any = { ...product }
    if ("createdAt" in product && product.createdAt) json.createdAt = product.createdAt
    if ("updatedAt" in product && product.updatedAt) json.updatedAt = product.updatedAt
    return json
  },
}
