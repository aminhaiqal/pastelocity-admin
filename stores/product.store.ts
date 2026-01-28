import { create } from "zustand"
import { Product, CreateProduct, UpdateProduct } from "@/domains/catalog"
import {
  listProductsAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
  addProductIntoCollectionAction,
  removeProductFromCollectionAction,
} from "@/actions/products"

interface ProductState {
  products: Product[]
  isLoading: boolean

  fetchProducts: () => Promise<void>
  createProduct: (input: CreateProduct) => Promise<Product>
  updateProduct: (id: number, input: Omit<UpdateProduct, "id">) => Promise<Product>
  deleteProduct: (id: number) => Promise<void>

  // Collection assignment
  assignCollection: (productId: number, collectionId: number) => Promise<void>
  removeCollection: (productId: number) => Promise<void>
  assignments: Record<number, number>
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  assignments: {},

  fetchProducts: async () => {
    set({ isLoading: true })
    const data = await listProductsAction()
    set({ products: data, isLoading: false })
  },

  createProduct: async (input) => {
    const created = await createProductAction(input)
    set((state) => ({ products: [...state.products, created] }))
    return created
  },

  updateProduct: async (id, input) => {
    const updated = await updateProductAction({ id, ...input })
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? updated : p)),
    }))
    return updated
  },

  deleteProduct: async (id) => {
    await deleteProductAction(id)
    set((state) => ({ products: state.products.filter((p) => p.id !== id) }))
  },

  assignCollection: async (productId, collectionId) => {
    await addProductIntoCollectionAction(productId, collectionId)
    set((state) => ({
      assignments: { ...state.assignments, [productId]: collectionId },
    }))
  },

  removeCollection: async (productId) => {
    await removeProductFromCollectionAction(productId)
    set((state) => {
      const newAssignments = { ...state.assignments }
      delete newAssignments[productId]
      return { assignments: newAssignments }
    })
  },
}))
