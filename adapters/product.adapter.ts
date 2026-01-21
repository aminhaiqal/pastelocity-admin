import { Product, CreateProduct, UpdateProduct } from "@/domains/catalog"

// Adapter for Product entity
export const ProductAdapter = {
  fromJson(json: any): Product {
    return {
      id: json.id,
      collection_id: json.collection_id,
      name: json.name,
      color: json.color,
      length: json.length,
      quantity: json.quantity,
      price: json.price,
      cutting_type: json.cutting_type,
      image_url: json.image_url,
      created_at: new Date(json.created_at).toISOString(),
      updated_at: new Date(json.updated_at).toISOString(),
    }
  },

  toJson(product: Product | CreateProduct | UpdateProduct) {
    const json: any = { ...product }
    if ("created_at" in product && product.created_at) json.created_at = product.created_at
    if ("updated_at" in product && product.updated_at) json.updated_at = product.updated_at
    return json
  },
}
