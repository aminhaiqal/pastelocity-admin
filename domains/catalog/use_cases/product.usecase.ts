import { ProductFormValues } from "@/components/products/product-form"
import { useProductStore } from "@/stores/product.store"

interface AddOrEditProductParams {
  values: ProductFormValues
  editingProduct: { id: number } | null
}

export function useAddOrEditProduct() {
  const {
    createProduct,
    updateProduct,
    assignCollection,
    removeCollection,
  } = useProductStore()

  async function addOrEditProduct({ values, editingProduct }: AddOrEditProductParams) {
    let productId: number

    if (editingProduct) {
      const updated = await updateProduct(editingProduct.id, values)
      productId = updated.id

      if (values.collection_id) await assignCollection(productId, values.collection_id)
      else await removeCollection(productId)

      return { message: "Product updated", product: updated }
    } else {
      const newProduct = await createProduct(values)
      productId = newProduct.id

      if (values.collection_id) await assignCollection(productId, values.collection_id)

      return { message: "Product added", product: newProduct }
    }
  }

  return { addOrEditProduct }
}
