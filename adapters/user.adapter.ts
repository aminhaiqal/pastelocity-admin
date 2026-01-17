import { User, CreateUser, UpdateUser } from "@/domains/user"

export const UserAdapter = {
  fromJson(json: any): User {
    return {
      id: json.id,
      name: json.name,
      email: json.email,
      phone: json.phone,
      createdAt: new Date(json.createdAt).toISOString(),
    }
  },

  toJson(user: User | CreateUser | UpdateUser) {
    const json: any = { ...user }

    // Only include createdAt if it exists (only full User has it)
    if ("createdAt" in user && user.createdAt) {
      json.createdAt = user.createdAt
    }

    return json
  },
}
