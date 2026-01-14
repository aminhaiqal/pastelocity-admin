"use client"

import { Product } from "@/services/products/types"

type Props = {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  return (
    <div className="grid gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-start gap-4 rounded-lg border p-4"
        >
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-24 h-24 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <h2 className="font-medium">{product.name}</h2>
            {product.color && (
              <p className="text-sm text-gray-500">Color: {product.color}</p>
            )}
            {product.length && (
              <p className="text-sm text-gray-500">Length: {product.length}</p>
            )}
            <p className="text-sm text-gray-500">
              Quantity: {product.quantity}
            </p>
            <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
