"use client"

import { useState, useEffect } from "react"
import { Product } from "@/domains/catalog"
import { Button } from "@/components/ui/button"
import { fetchRemoteFiles } from "../FileUploader/utils"
import { useCollectionStore } from "@/stores/collection.store"

type Props = {
  product: Product
  isSelected: boolean
  onSelect: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function ProductCard({ product, isSelected, onSelect, onEdit, onDelete }: Props) {
  const collectionMap = useCollectionStore((state) => state.collectionMap)
  const [images, setImages] = useState<string[]>([])
  const [currentImage, setCurrentImage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const collection = collectionMap[product.collection_id]

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true)
      try {
        // Fetch only image files
        const urls = await fetchRemoteFiles(`${collection.slug}/${product.slug}`, [".png", ".jpg", ".jpeg", ".gif", ".webp"])
        setImages(urls)
      } catch (err) {
        console.error("Failed to fetch product images:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadImages()
  }, [collection.name, product.name])

  const hasMultiple = images.length > 1

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div
      onClick={() => onSelect(product.id)}
      className={`cursor-pointer bg-white border rounded-xl shadow-sm overflow-hidden transition-shadow duration-200
        ${isSelected ? "border-indigo-500 shadow-md" : "border-gray-200 hover:shadow-md"}
      `}
    >
      <div className="relative w-full h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
        {isLoading ? (
          <span className="text-gray-400">Loading...</span>
        ) : images.length > 0 ? (
          <>
            <img
              src={images[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {hasMultiple && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1"
                >
                  ◀
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1"
                >
                  ▶
                </button>
              </>
            )}
          </>
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-gray-900">{collection.name} - {product.name}</h3>
        {product.color && <p className="text-sm text-gray-500">Color: {product.color}</p>}
        {product.length && <p className="text-sm text-gray-500">Length: {product.length} inch</p>}
        <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
        <p className="text-sm font-medium text-gray-700">Cutting Type: {product.cutting_type}</p>
        <p className="text-sm font-medium text-gray-700">Price: RM{Number(product.price).toFixed(2)}</p>

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
