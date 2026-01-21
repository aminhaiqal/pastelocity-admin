import { User, CreateUser, UpdateUser } from "@/domains/user"

export const UserAdapter = {
  fromJson(json: any): User {
    return {
      id: json.id,
      name: json.name,
      email: json.email,
      phone: json.phone,
      created_at: new Date(json.created_at).toISOString(),
    }
  },

  toJson(user: User | CreateUser | UpdateUser) {
    const json: any = { ...user }

    // Only include created_at if it exists (only full User has it)
    if ("created_at" in user && user.created_at) {
      json.created_at = user.created_at
    }

    return json
  },
}
