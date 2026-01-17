import api from "@/lib/api"
import { 
  Product, CreateProduct, UpdateProduct, 
  Collection, CollectionList, CreateCollection, UpdateCollection 
} from "./catalog.types"

export const catalogApi = {
  // -----------------------------
  // Product endpoints
  // -----------------------------
  listProducts: () => api.get<Product[]>("/products"),
  getProduct: (id: number) => api.get<Product>(`/products/${id}`),
  getProductsByCollection: (collectionId: number) =>
    api.get<Product[]>(`/collections/${collectionId}/products`),
  createProduct: (payload: CreateProduct) => api.post<Product>("/products", payload),
  updateProduct: (id: number, payload: UpdateProduct) => api.put<Product>(`/products/${id}`, payload),
  deleteProduct: (id: number) => api.delete<Product>(`/products/${id}`),
  addProductToCollection: (productId: number, collectionId: number) =>
    api.put<Product>(`/products/${productId}/collection/${collectionId}`),
  removeProductFromCollection: (productId: number) =>
    api.delete<Product>(`/products/${productId}/collection`),

  // -----------------------------
  // Collection endpoints
  // -----------------------------
  listCollections: () => api.get<CollectionList[]>("/collections"),
  getCollection: (id: number) => api.get<Collection>(`/collections/${id}`),
  createCollection: (payload: CreateCollection) => api.post<Collection>("/collections", payload),
  updateCollection: (id: number, payload: UpdateCollection) => api.put<Collection>(`/collections/${id}`, payload),
  deleteCollection: (id: number) => api.delete<Collection>(`/collections/${id}`),
}
