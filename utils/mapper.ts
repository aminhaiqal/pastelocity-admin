import { Product } from "@/domains/catalog"
import { cutting_type } from "@/enums"

export function productToFormValues(product: Product) {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    color: product.color ?? "",
    length: Number(product.length),
    quantity: product.quantity,
    price: Number(product.price),
    image_url: product.image_url ?? "",
    cutting_type: product.cutting_type as cutting_type,
    collection_id: product.collection_id,
  }
}
