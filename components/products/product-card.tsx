"use client"

import { Product } from "@/domains/catalog"
import { Button } from "@/components/ui/button" // shadcn button

type Props = {
  product: Product
  isSelected: boolean
  onSelect: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function ProductCard({ product, isSelected, onSelect, onEdit, onDelete }: Props) {
  return (
    <div
      onClick={() => onSelect(product.id)}
      className={`cursor-pointer bg-white border rounded-xl shadow-sm overflow-hidden transition-shadow duration-200
        ${isSelected ? "border-indigo-500 shadow-md" : "border-gray-200 hover:shadow-md"}
      `}
    >
      {product.imageUrl ? (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        {product.color && <p className="text-sm text-gray-500">Color: {product.color}</p>}
        {product.length && <p className="text-sm text-gray-500">Length: {product.length} inch</p>}
        <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
        <p className="text-sm font-medium text-gray-700">Cutting Type: {product.cuttingType}</p>
        <p className="text-sm font-medium text-gray-700">Price: RM{product.price.toFixed(2)}</p>

        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              if (onEdit) onEdit(product.id)
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation()
              if (onDelete) onDelete(product.id)
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
