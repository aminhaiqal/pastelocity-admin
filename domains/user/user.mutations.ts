"use server"

import { userApi } from "./user.api"
import { mapUserDTO } from "./user.mapper"
import { User, CreateUser, UpdateUser } from "./user.types"

export const userMutations = {
  async createUser(payload: CreateUser): Promise<User> {
    const { data } = await userApi.createUser(payload)
    return mapUserDTO(data)
  },

  async updateUser(id: number, payload: UpdateUser): Promise<User> {
    const { data } = await userApi.updateUser(id, payload)
    return mapUserDTO(data)
  },

  async deleteUser(id: number): Promise<User> {
    const { data } = await userApi.deleteUser(id)
    return mapUserDTO(data)
  }
}
