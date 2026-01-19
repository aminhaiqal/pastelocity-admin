"use client"

import { Collection } from "@/domains/catalog"
import CollectionCard from "./collection-card"

type Props = {
  collection: Collection[]
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function CollectionGrid({ collection, onEdit, onDelete }: Props) {
  if (!collection || collection.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-gray-400">
        <p className="text-lg font-medium">No collections found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {collection.map((c) => (
        <CollectionCard
          key={c.id}
          collection={c}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
