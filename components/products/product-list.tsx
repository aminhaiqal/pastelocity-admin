"use client"

import { Product } from "@/services/products/types"

type Props = {
  products: Product[]
}

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          {product.image_url ? (
            <div className="w-full h-48 overflow-hidden">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            {product.color && <p className="text-sm text-gray-500">Color: {product.color}</p>}
            {product.length && <p className="text-sm text-gray-500">Length: {product.length}</p>}
            <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
            <p className="mt-2 text-lg font-bold text-indigo-600">${product.price.toFixed(2)}</p>
            <button className="mt-3 bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-indigo-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
