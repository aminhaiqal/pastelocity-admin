"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useCollectionStore } from "@/stores/collection.store"
import { useProductStore } from "@/stores/product.store"
import { useEffect } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading: cl, fetchCollections } = useCollectionStore()
  const { isLoading: pl, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchCollections().catch((err) => {
      console.error("Failed to fetch collections", err)
      toast.error("Failed to load collections")
    })
  }, [fetchCollections])

  useEffect(() => {
    fetchProducts().catch((err) => {
      console.error("Failed to fetch products", err)
      toast.error("Failed to load products")
    })
  }, [fetchProducts])

  const isLoading = cl || pl

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="animate-spin text-gray-600" size={48} />
      </div>
    )
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
