import { User } from "./user.types"

export const mapUserDTO = (dto: any): User => ({
  id: dto.id,
  name: dto.name,
  email: dto.email,
  phone: dto.phone ?? undefined,
  createdAt: dto.created_at
})
