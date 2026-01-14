"use client"

import * as React from "react"
import { Product } from "@/services/products/types"
import ProductGrid from "@/components/products/product-grid"
import { ProductForm } from "@/components/products/product-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { IconPlus } from "@tabler/icons-react"

const dummyProducts: Product[] = [
  {
    id: "prod_1",
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
    id: "prod_2",
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

  // handler when form is submitted
  const handleAddProduct = (values: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    const newProduct: Product = {
      ...values,
      id: `prod_${Date.now()}`,
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
            />
          </DialogContent>
        </Dialog>
      </div>

      <ProductGrid products={products} />
    </main>
  )
}
