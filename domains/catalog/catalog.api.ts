import api from "@/lib/api"
import { 
  Product, CreateProduct, UpdateProduct, 
  Collection, CollectionList, CreateCollection, UpdateCollection 
} from "./catalog.types"

export const catalogApi = {
  // -----------------------------
  // Product endpoints
  // -----------------------------
  listProducts: () => api.get<Product[]>("/product"),
  getProduct: (id: number) => api.get<Product>(`/product/${id}`),
  getProductsByCollection: (collectionId: number) =>
    api.get<Product[]>(`/collection/${collectionId}/product`),
  createProduct: (payload: CreateProduct) => api.post<Product>("/product", payload),
  updateProduct: (id: number, payload: UpdateProduct) => api.put<Product>(`/product/${id}`, payload),
  deleteProduct: (id: number) => api.delete<Product>(`/product/${id}`),
  addProductToCollection: (productId: number, collectionId: number) =>
    api.put<Product>(`/product/${productId}/collection/${collectionId}`),
  removeProductFromCollection: (productId: number) =>
    api.delete<Product>(`/product/${productId}/collection`),

  // -----------------------------
  // Collection endpoints
  // -----------------------------
  listCollections: () => api.get<CollectionList[]>("/collection"),
  getCollection: (id: number) => api.get<Collection>(`/collection/${id}`),
  createCollection: (payload: CreateCollection) => api.post<Collection>("/collection", payload),
  updateCollection: (id: number, payload: UpdateCollection) => api.put<Collection>(`/collection/${id}`, payload),
  deleteCollection: (id: number) => api.delete<Collection>(`/collection/${id}`),
}
