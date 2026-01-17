export interface DeliveryOption {
  id: number
  region: string
  shipping_fee: string
  estimate?: string
  exclusion?: string
  free_shipping_min_purchase?: string
}

export interface DeliveryOptionRequest {
  region: string
  shipping_fee: string
  estimate?: string
  exclusion?: string
  free_shipping_min_purchase?: string
}
