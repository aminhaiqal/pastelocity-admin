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
      deliveryOptionId: json.deliveryOptionId,
      created_at: new Date(json.created_at).toISOString(),
    }
  },

  toJson(shipping: Shipping | CreateShipping | UpdateShipping) {
    const json: any = { ...shipping }

    // Only include created_at if it exists (only full Shipping has it)
    if ("created_at" in shipping && shipping.created_at) {
      json.created_at = shipping.created_at
    }

    return json
  },
}
