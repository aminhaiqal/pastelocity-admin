import { userApi } from "./user.api"
import { mapUserDTO } from "./user.mapper"
import { User } from "./user.types"

export const userQueries = {
  async getUser(id: number): Promise<User> {
    const { data } = await userApi.getUser(id)
    return mapUserDTO(data)
  }
}
