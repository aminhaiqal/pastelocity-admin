import api from "@/lib/api"
import { User, CreateUser, UpdateUser, UserId } from "./user.types"

export const userApi = {
  getUser: (id: UserId) => api.get<User>(`/users/${id}`),
  createUser: (payload: CreateUser) => api.post<User>("/users", payload),
  updateUser: (id: UserId, payload: UpdateUser) => api.put<User>(`/users/${id}`, payload),
  deleteUser: (id: UserId) => api.delete<User>(`/users/${id}`)
}
