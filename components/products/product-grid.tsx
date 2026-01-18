"use client"

import { Product } from "@/domains/catalog"
import ProductCard from "./product-card"

type Props = {
  products: Product[]
  selectedIds: number[]
  onSelect: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function ProductGrid({ products, selectedIds, onSelect, onEdit, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={selectedIds.includes(product.id)}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
