import api from "@/lib/api"
import { 
  Shipping, 
  CreateShipping, 
  UpdateShipping 
} from "./shipping.types"

export const shippingApi = {
  // -----------------------------
  // Delivery Options
  // -----------------------------
  listDeliveryOptions: () => api.get("/delivery-options"),
  getDeliveryOption: (id: number) => api.get(`/delivery-options/${id}`),
  createDeliveryOption: (payload: unknown) => api.post("/delivery-options", payload),
  updateDeliveryOption: (id: number, payload: unknown) =>
    api.put(`/delivery-options/${id}`, payload),
  deleteDeliveryOption: (id: number) => api.delete(`/delivery-options/${id}`),

  // -----------------------------
  // Delivery Rates
  // -----------------------------
  getDeliveryRate: (id: number) => api.get(`/delivery-rates/${id}`),
  listRatesByDeliveryOption: (id: number) =>
    api.get(`/delivery-rates/delivery-option/${id}`),
  createDeliveryRate: (payload: unknown) => api.post("/delivery-rates", payload),
  updateDeliveryRate: (id: number, payload: unknown) =>
    api.put(`/delivery-rates/${id}`, payload),
  deleteDeliveryRate: (id: number) => api.delete(`/delivery-rates/${id}`),

  // -----------------------------
  // Shipping
  // -----------------------------
  listShippingsByUser: (userId: number) =>
    api.get<Shipping[]>(`/shippings/user/${userId}`),

  getShipping: (id: number) =>
    api.get<Shipping>(`/shippings/${id}`),

  getShippingsByDeliveryRate: (deliveryRateId: number) =>
    api.get<Shipping[]>(`/shippings/delivery-rate/${deliveryRateId}`),

  getShippingsByDeliveryOption: (deliveryOptionId: number) =>
    api.get<Shipping[]>(`/shippings/delivery-option/${deliveryOptionId}`),

  listShippingsByDeliveryRate: (deliveryRateId: number) =>
    api.get<Shipping[]>(`/shippings/delivery-rate/${deliveryRateId}`),

  listShippingsByDeliveryOption: (deliveryOptionId: number) =>
    api.get<Shipping[]>(`/shippings/delivery-option/${deliveryOptionId}`),

  createShipping: (payload: CreateShipping) =>
    api.post<Shipping>("/shippings", payload),

  updateShipping: (id: number, payload: UpdateShipping) =>
    api.put<Shipping>(`/shippings/${id}`, payload),

  deleteShipping: (id: number) =>
    api.delete<Shipping>(`/shippings/${id}`),
}
