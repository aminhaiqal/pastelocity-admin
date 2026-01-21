export type ID = number

export interface Shipping {
  id: ID
  address1: string
  address2?: string
  zip: string
  city: string
  stateName: string
  deliveryOptionId?: ID
  created_at: string
}

export interface CreateShipping {
  address1: string
  address2?: string
  zip: string
  city: string
  stateName: string
  deliveryOptionId?: ID
}

export interface DeliveryOption {
  id: ID
  country: string
  region: string
  shippingFee: string
  estimate?: string
  exclusion?: string
  freeShippingMinPurchase?: string
}

export interface CreateDeliveryOption {
  country: string
  region: string
  shippingFee: string
  estimate?: string
  exclusion?: string
  freeShippingMinPurchase?: string
}

export interface UpdateShipping extends CreateShipping {}

export interface UpdateDeliveryOption extends CreateDeliveryOption {}
