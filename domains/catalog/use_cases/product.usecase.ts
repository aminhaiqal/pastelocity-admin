import { ProductFormValues } from "@/components/products/product-form"
import { useCollectionAssignment, useProducts } from "@/hooks/use-products"

interface AddOrEditProductParams {
  values: ProductFormValues
  editingProduct: any | null
}

export function useAddOrEditProduct() {
  const { createProduct, updateProduct } = useProducts()
  const { assignProduct, removeProduct } = useCollectionAssignment()

  async function addOrEditProduct({ values, editingProduct }: AddOrEditProductParams) {
    try {
      if (editingProduct) {
        // Update product
        await updateProduct(editingProduct.id, values)

        // Update collection assignment
        if (values.collection_id) {
          await assignProduct(editingProduct.id, values.collection_id)
        } else {
          await removeProduct(editingProduct.id)
        }

        return { message: "Product updated" }
      } else {
        // Create product
        const newProduct = await createProduct(values)

        // Assign collection if exists
        if (values.collection_id) {
          await assignProduct(newProduct.id, values.collection_id)
        }

        return { message: "Product added" }
      }
    } catch (err: any) {
      console.error(err)
      throw new Error(err?.message || "Failed to save product")
    }
  }

  return { addOrEditProduct }
}
