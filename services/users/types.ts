export interface User {
  id: number
  name: string
  email: string
  phone?: string
  created_at: string // ISO string
}

export interface UserRequest {
  name: string
  email: string
  phone?: string
}
