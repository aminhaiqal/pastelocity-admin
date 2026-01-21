import {
  DeliveryOption,
  CreateDeliveryOption,
  Shipping,
  CreateShipping,
  UpdateShipping,
} from "./shipping.types"

// -----------------------------
// Delivery Option
// -----------------------------
export const mapDeliveryOptionDTO = (dto: any): DeliveryOption => ({
  id: dto.id,
  country: dto.country,
  region: dto.region,
  shippingFee: dto.shipping_fee,
  estimate: dto.estimate ?? undefined,
  exclusion: dto.exclusion ?? undefined,
  freeShippingMinPurchase: dto.free_shipping_min_purchase ?? undefined,
})

export const mapCreateDeliveryOptionPayload = (
  input: CreateDeliveryOption
) => ({
  country: input.country,
  region: input.region,
  shipping_fee: input.shippingFee,
  estimate: input.estimate,
  exclusion: input.exclusion,
  free_shipping_min_purchase: input.freeShippingMinPurchase,
})

// -----------------------------
// Shipping
// -----------------------------
export const mapShippingDTO = (dto: any): Shipping => ({
  id: dto.id,
  address1: dto.address1,
  address2: dto.address2 ?? undefined,
  zip: dto.zip,
  city: dto.city,
  stateName: dto.state_name,
  deliveryOptionId: dto.delivery_option_id ?? undefined,
  created_at: dto.created_at,
})

export const mapCreateShippingPayload = (input: CreateShipping) => ({
  address1: input.address1,
  address2: input.address2,
  zip: input.zip,
  city: input.city,
  stateName: input.stateName,
  delivery_option_id: input.deliveryOptionId,
})

export const mapUpdateShippingPayload = (input: UpdateShipping) => ({
  address1: input.address1,
  address2: input.address2,
  zip: input.zip,
  city: input.city,
  stateName: input.stateName,
  delivery_option_id: input.deliveryOptionId,
})
