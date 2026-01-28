"use client"

import ProductGrid from "@/components/products/product-grid"
import { ProductForm, ProductFormValues } from "@/components/products/product-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { IconPlus } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { CollectionSearchBar } from "@/components/products/collection-search-bar"
import { Product } from "@/domains/catalog"
import { toast } from "sonner"
import { productToFormValues } from "@/utils/mapper"
import FileUploader from "@/components/FileUploader/file-uploader"
import { useAddOrEditProduct } from "@/domains/catalog/use_cases/product.usecase"
import { useProductStore } from "@/stores/product.store"

export default function ProductsPage() {
  const { products, fetchProducts, deleteProduct, isLoading } = useProductStore()
  const { addOrEditProduct } = useAddOrEditProduct()
  const [open, setOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  useEffect(() => {
    fetchProducts().catch((err) => {
      console.error("Failed to fetch products", err)
      toast.error("Failed to load products")
    })
  }, [])
  
  const handleFormSubmit = async (values: ProductFormValues) => {
    try {
      const result = await addOrEditProduct({ values, editingProduct })
      toast.success(result.message)
      setEditingProduct(null)
      setOpen(false)
    } catch (err: any) {
      toast.error(err?.message || "Failed to save product")
    }
  }

  const handleEdit = (id: number) => {
    const product = products.find((p) => p.id === id)
    if (!product) return
    setEditingProduct(product)
    setOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
      await deleteProduct(id)
      toast.success("Product deleted")
      setSelectedIds((prev) => prev.filter((i) => i !== id))
    } catch (err: any) {
      console.error(err)
      toast.error(err?.message || "Failed to delete product")
    }
  }

  return (
    <main className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>

        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <CollectionSearchBar
              onSelect={(collection) => {
                console.log("Selected or created collection:", collection)
              }}
            />
          )}

          {/* New / Edit Product Dialog */}
          <Dialog open={open} onOpenChange={(value) => {
            setOpen(value)
            if (!value) setEditingProduct(null)
          }}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <IconPlus size={16} />
                {editingProduct ? "Edit Product" : "New Product"}
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "New Product"}</DialogTitle>
              </DialogHeader>

              {editingProduct && (
                <FileUploader
                  collectionSlug={editingProduct.name}
                />
              )}

              <ProductForm
                initialData={editingProduct ? productToFormValues(editingProduct) : undefined}
                onSubmit={handleFormSubmit}
                isSubmitting={isLoading}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={products}
        selectedIds={selectedIds}
        onSelect={(id) => setSelectedIds((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  )
}
