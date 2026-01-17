import { DeliveryOption, CreateDeliveryOption, UpdateDeliveryOption } from "@/domains/shipping"

export const DeliveryOptionAdapter = {
  fromJson(json: any): DeliveryOption {
    return {
      id: json.id,
      region: json.region,
      shippingFee: json.shippingFee,
      estimate: json.estimate,
      exclusion: json.exclusion,
      freeShippingMinPurchase: json.freeShippingMinPurchase,
    }
  },

  toJson(option: DeliveryOption | CreateDeliveryOption | UpdateDeliveryOption) {
    const json: any = { ...option }
    return json
  },
}
