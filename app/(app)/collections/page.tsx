"use client"

import CollectionGrid from "@/components/collections/collection-grid"
import { CollectionForm, CollectionFormValues } from "@/components/collections/collection-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { IconPlus } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Collection } from "@/domains/catalog"
import { addOrEditCollection } from "@/domains/catalog/use_cases/collection.usecase"
import FileUploader from "@/components/FileUploader/file-uploader"
import { useCollectionStore } from "@/stores/collection.store"

export default function CollectionsPage() {
  const { collections, isLoading, deleteCollection } = useCollectionStore()
  const [open, setOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null)
  
  const handleFormSubmit = async (values: CollectionFormValues) => {
    try {
      const result = await addOrEditCollection({
        values,
        editingCollection,
      })

      toast.success(result.message)
      const savedCollection: Collection = result.collection

      setEditingCollection(savedCollection)
      setOpen(true)
    } catch (err: any) {
      toast.error(err?.message || "Failed to save collection")
    }
  }

  // Edit button clicked
  const handleEdit = (id: number) => {
    const collection = collections.find((c) => c.id === id)
    if (!collection) return
    setEditingCollection(collection)
    setOpen(true)
  }

  // Delete button clicked
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this collection?")) return
    try {
      await deleteCollection(id)
      toast.success("Collection deleted")
    } catch (err: any) {
      console.error(err)
      toast.error(err?.message || "Failed to delete collection")
    }
  }

  return (
    <main className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Collections</h1>

        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen)

          if (!isOpen) {
            setEditingCollection(null)
          }
        }}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <IconPlus size={16} />
              {editingCollection ? "Edit Collection" : "New Collection"}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingCollection ? "Edit Collection" : "New Collection"}
              </DialogTitle>
            </DialogHeader>

            <CollectionForm
              initialData={editingCollection || undefined}
              onSubmit={handleFormSubmit}
              isSubmitting={isLoading}
            />
            
            {editingCollection && (
              <FileUploader
                uploadPath={editingCollection.slug}
              />
            )}

          </DialogContent>
        </Dialog>
      </div>

      {/* Collection Grid */}
      <CollectionGrid
        collection={collections}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  )
}
