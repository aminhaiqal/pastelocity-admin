"use client"

import * as React from "react"
import { Product } from "@/services/products/types"
import ProductGrid from "@/components/products/product-grid"
import { ProductForm } from "@/components/products/product-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { IconPlus } from "@tabler/icons-react"
import { useState } from "react"
import { CollectionForm } from "@/components/collection/collection-form"
import CollectionGrid from "@/components/collection/collection-grid"

const dummyCollections: Product[] = [
  {
    id: 1,
    collection_id: "col_1",
    name: "Red Cotton Fabric",
    color: "Red",
    length: "54",
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
    length: "54",
    quantity: 20,
    price: 50.0,
    cutting_type: "Machine",
    image_url: "https://via.placeholder.com/150",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = React.useState<Product[]>(dummyCollections)
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
        <h1 className="text-2xl font-bold">Collection</h1>
        <div className="flex items-center gap-3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <IconPlus size={16} />
                New Collection
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>New Collection</DialogTitle>
              </DialogHeader>

              <CollectionForm onSubmit={handleAddProduct} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <CollectionGrid
        products={products}
      
      />
    </main>
  )
}
