"use client"

import { Collection } from "@/domains/catalog"
import { Button } from "@/components/ui/button"

type Props = {
  collection: Collection
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function CollectionCard({ collection, onEdit, onDelete }: Props) {
  return (
    <div
      className="cursor-pointer bg-white border rounded-xl shadow-sm overflow-hidden transition-shadow duration-200
        border-gray-200 hover:shadow-md"
    >
      {collection.image ? (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-gray-900">{collection.name}</h3>
        <p className="text-sm text-gray-500">
          {collection.description || "No description"}
        </p>
        <p className="text-sm font-medium text-gray-700">
          {collection.isAvailable ? "Available" : "Not Available"}
        </p>

        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              if (onEdit) onEdit(collection.id)
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation()
              if (onDelete) onDelete(collection.id)
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
