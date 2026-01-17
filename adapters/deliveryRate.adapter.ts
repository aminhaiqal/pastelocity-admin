import { DeliveryRate, CreateDeliveryRate, UpdateDeliveryRate } from "@/domains/shipping"

export const DeliveryRateAdapter = {
  fromJson(json: any): DeliveryRate {
    return {
      id: json.id,
      country: json.country,
      deliveryOptionId: json.deliveryOptionId,
    }
  },

  toJson(rate: DeliveryRate | CreateDeliveryRate | UpdateDeliveryRate) {
    const json: any = { ...rate }
    return json
  },
}
