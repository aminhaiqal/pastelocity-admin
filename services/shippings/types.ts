export interface Shipping {
  id: number
  address1: string
  address2?: string
  zip: string
  city: string
  state_name: string
  delivery_rate_id?: number
  delivery_option_id?: number
  created_at: string // ISO string
}

export interface ShippingRequest {
  address1: string
  address2?: string
  zip: string
  city: string
  state_name: string
  delivery_rate_id?: number
  delivery_option_id?: number
}
