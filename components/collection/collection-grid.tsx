"use client"

import { Product } from "@/services/products/types"

type Props = {
  products: Product[]
}

export default function CollectionGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        
        return (
          <div
            key={product.id}
            className={`cursor-pointer bg-white border rounded-xl shadow-sm overflow-hidden transition-shadow duration-200
              `}
          >
            {product.image_url ? (
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={product.image_url}
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
              <p className="text-sm text-gray-500">Description: {product.quantity}</p>
              <p className="text-sm font-medium text-gray-700">Stock Available: {product.cutting_type}</p>
            
              {/* Optional: admin actions */}
              <div className="mt-3 flex gap-2">
                <button className="text-sm text-indigo-600 hover:underline">Edit</button>
                <button className="text-sm text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
