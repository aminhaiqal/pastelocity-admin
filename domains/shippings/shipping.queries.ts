import { shippingApi } from "./shipping.api"
import {
  mapDeliveryOptionDTO,
  mapDeliveryRateDTO,
  mapShippingDTO,
} from "./shipping.mapper"
import { DeliveryOption, DeliveryRate, Shipping } from "./shipping.types"

export const shippingQueries = {
  // -----------------------------
  // Delivery Options
  // -----------------------------
  async listDeliveryOptions(): Promise<DeliveryOption[]> {
    const { data } = await shippingApi.listDeliveryOptions()
    return data.map(mapDeliveryOptionDTO)
  },

  async getDeliveryOption(id: number): Promise<DeliveryOption> {
    const { data } = await shippingApi.getDeliveryOption(id)
    return mapDeliveryOptionDTO(data)
  },

  // -----------------------------
  // Delivery Rates
  // -----------------------------
  async listRatesByDeliveryOption(id: number): Promise<DeliveryRate[]> {
    const { data } = await shippingApi.listRatesByDeliveryOption(id)
    return data.map(mapDeliveryRateDTO)
  },

  async getDeliveryRate(id: number): Promise<DeliveryRate> {
    const { data } = await shippingApi.getDeliveryRate(id)
    return mapDeliveryRateDTO(data)
  },

  // -----------------------------
  // Shippings
  // -----------------------------
  async listShippingsByUser(userId: number): Promise<Shipping[]> {
    const { data } = await shippingApi.listShippingsByUser(userId)
    return data.map(mapShippingDTO)
  },

  async getShipping(id: number): Promise<Shipping> {
    const { data } = await shippingApi.getShipping(id)
    return mapShippingDTO(data)
  },

  async listShippingsByDeliveryRate(deliveryRateId: number): Promise<Shipping[]> {
    const { data } = await shippingApi.getShippingsByDeliveryRate(deliveryRateId)
    return data.map(mapShippingDTO)
  },

  async listShippingsByDeliveryOption(deliveryOptionId: number): Promise<Shipping[]> {
    const { data } = await shippingApi.getShippingsByDeliveryOption(deliveryOptionId)
    return data.map(mapShippingDTO)
  },
}
