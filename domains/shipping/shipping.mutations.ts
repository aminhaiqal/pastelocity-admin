"use server"

import { shippingApi } from "./shipping.api"
import {
  CreateDeliveryOption,
  DeliveryOption,
  CreateShipping,
  UpdateShipping,
  Shipping,
} from "./shipping.types"
import {
  mapDeliveryOptionDTO,
  mapCreateDeliveryOptionPayload,
  mapShippingDTO,
  mapCreateShippingPayload,
  mapUpdateShippingPayload,
} from "./shipping.mapper"

export const shippingMutations = {
  // -----------------------------
  // Delivery Option / Rate
  // -----------------------------
  async createDeliveryOption(
    input: CreateDeliveryOption
  ): Promise<DeliveryOption> {
    const { data } = await shippingApi.createDeliveryOption(
      mapCreateDeliveryOptionPayload(input)
    )
    return mapDeliveryOptionDTO(data)
  },

  // -----------------------------
  // Shipping
  // -----------------------------
  async createShipping(input: CreateShipping): Promise<Shipping> {
    const { data } = await shippingApi.createShipping(
      mapCreateShippingPayload(input)
    )
    return mapShippingDTO(data)
  },

  async updateShipping(id: number, input: UpdateShipping): Promise<Shipping> {
    const { data } = await shippingApi.updateShipping(
      id,
      mapUpdateShippingPayload(input)
    )
    return mapShippingDTO(data)
  },

  async deleteShipping(id: number): Promise<Shipping> {
    const { data } = await shippingApi.deleteShipping(id)
    return mapShippingDTO(data)
  },
}