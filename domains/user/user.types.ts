export type UserId = number

export interface User {
  id: UserId
  name: string
  email: string
  phone?: string
  created_at: string
}

export interface CreateUser {
  name: string
  email: string
  phone?: string
}

export interface UpdateUser extends Partial<CreateUser> {
  id: UserId
}
