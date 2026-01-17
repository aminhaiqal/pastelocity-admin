export type ID = number

export interface Shipping {
  id: ID
  address1: string
  address2?: string
  zip: string
  city: string
  stateName: string
  deliveryRateId?: ID
  deliveryOptionId?: ID
  createdAt: string
}

export interface CreateShipping {
  address1: string
  address2?: string
  zip: string
  city: string
  stateName: string
  deliveryRateId?: ID
  deliveryOptionId?: ID
}

export interface DeliveryOption {
  id: ID
  region: string
  shippingFee: string
  estimate?: string
  exclusion?: string
  freeShippingMinPurchase?: string
}

export interface DeliveryRate {
  id: ID
  country: string
  deliveryOptionId?: ID
}

export interface CreateDeliveryOption {
  region: string
  shippingFee: string
  estimate?: string
  exclusion?: string
  freeShippingMinPurchase?: string
}

export interface UpdateShipping extends CreateShipping {}

export interface UpdateDeliveryOption extends CreateDeliveryOption {}

export interface CreateDeliveryRate {
  country: string
  deliveryOptionId?: ID
}

export interface UpdateDeliveryRate extends CreateDeliveryRate {}
