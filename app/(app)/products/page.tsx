"use client"

import * as React from "react"
import { Product } from "@/services/products/types"
import ProductGrid from "@/components/products/product-grid"
import { ProductForm } from "@/components/products/product-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { IconPlus } from "@tabler/icons-react"
import { useState } from "react"

const dummyProducts: Product[] = [
  {
    id: 1,
    collection_id: "col_1",
    name: "Red Cotton Fabric",
    color: "Red",
    length: "2m",
    quantity: 50,
    price: 25.5,
    cutting_type: "Manual",
    image_url: "https://via.placeholder.com/150",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-05",
  },
  {
    id: 2,
    name: "Blue Silk Fabric",
    color: "Blue",
    quantity: 20,
    price: 50.0,
    cutting_type: "Machine",
    image_url: "https://via.placeholder.com/150",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = React.useState<Product[]>(dummyProducts)
  const [open, setOpen] = React.useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  // handler when form is submitted
  const handleAddProduct = (values: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    const newProduct: Product = {
      ...values,
      id: 14,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setProducts((prev) => [...prev, newProduct])
    setOpen(false) // close modal
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <input
              type="text"
              placeholder="Search selected collection..."
              className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

              <ProductForm onSubmit={handleAddProduct} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <ProductGrid
        products={products}
        selectedIds={selectedIds}
        onSelect={(id) =>
          setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
          )
        }
      />
    </main>
  )
}
