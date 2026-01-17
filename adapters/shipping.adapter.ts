import { Shipping, CreateShipping, UpdateShipping } from "@/domains/shipping"

export const ShippingAdapter = {
  fromJson(json: any): Shipping {
    return {
      id: json.id,
      address1: json.address1,
      address2: json.address2,
      zip: json.zip,
      city: json.city,
      stateName: json.stateName,
      deliveryRateId: json.deliveryRateId,
      deliveryOptionId: json.deliveryOptionId,
      createdAt: new Date(json.createdAt).toISOString(),
    }
  },

  toJson(shipping: Shipping | CreateShipping | UpdateShipping) {
    const json: any = { ...shipping }

    // Only include createdAt if it exists (only full Shipping has it)
    if ("createdAt" in shipping && shipping.createdAt) {
      json.createdAt = shipping.createdAt
    }

    return json
  },
}
