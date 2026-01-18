"use client"

import ProductGrid from "@/components/products/product-grid"
import { ProductForm } from "@/components/products/product-form"
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

export default function ProductsPage() {
  const { products, createProduct, isPending } = useProducts()
  const [open, setOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleAddProduct = async (values: any) => {
    await createProduct(values)
    setOpen(false)
  }

  return (
    <main className="p-6 space-y-6">
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

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <IconPlus size={16} />
                New Product
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>New Product</DialogTitle>
              </DialogHeader>

              <ProductForm
                onSubmit={handleAddProduct}
                isSubmitting={isPending}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

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
      />
    </main>
  )
}
