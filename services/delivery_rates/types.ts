export interface DeliveryRate {
  id: number
  country: string
  delivery_option_id?: number
}

export interface DeliveryRateRequest {
  country: string
  delivery_option_id?: number
}
