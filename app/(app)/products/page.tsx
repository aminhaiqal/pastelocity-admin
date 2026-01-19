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
import { useState } from "react"
import { CollectionSearchBar } from "@/components/products/collection-search-bar"
import { useProducts } from "@/hooks/use-products"
import { Product } from "@/domains/catalog"
import { toast } from "sonner"

export default function ProductsPage() {
  const { products, createProduct, updateProduct, deleteProduct, isPending } = useProducts()
  const [open, setOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  // Handle form submission for create or edit
  const handleAddOrEditProduct = async (values: ProductFormValues) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, values)
        toast.success("Product updated")
        setEditingProduct(null)
      } else {
        await createProduct(values)
        toast.success("Product added")
      }
      setOpen(false)
    } catch (err: any) {
      console.error(err)
      toast.error(err?.message || "Failed to save product")
    }
  }

  // Edit button clicked on card
  const handleEdit = (id: number) => {
    const product = products.find((p) => p.id === id)
    if (!product) return
    setEditingProduct(product)
    setOpen(true) // open the dialog with pre-filled ProductForm
  }

  // Delete button clicked on card
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
          <Dialog open={open} onOpenChange={setOpen}>
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

              <ProductForm
                initialData={editingProduct || undefined}
                onSubmit={handleAddOrEditProduct}
                isSubmitting={isPending}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={products}
        selectedIds={selectedIds}
        onSelect={(id) =>
          setSelectedIds((prev) =>
            prev.includes(id)
              ? prev.filter((i) => i !== id)
              : [...prev, id]
          )
        }
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  )
}
