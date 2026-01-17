import { UserAdapter } from '../user.adapter'
import { User } from '@/domains/user'

describe('UserAdapter', () => {
  const rawJson = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    createdAt: '2026-01-18T00:00:00Z',
  }

  it('should convert JSON to User object', () => {
    const user: User = UserAdapter.fromJson(rawJson)

    expect(user.id).toBe(1)
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@example.com')
    expect(user.phone).toBe('1234567890')
    expect(user.createdAt).toBe('2026-01-18T00:00:00.000Z')
  })

  it('should convert User object back to JSON', () => {
    const user: User = UserAdapter.fromJson(rawJson)
    const json = UserAdapter.toJson(user)

    expect(json.id).toBe(1)
    expect(json.name).toBe('John Doe')
    expect(json.email).toBe('john@example.com')
    expect(json.phone).toBe('1234567890')
    expect(json.createdAt).toBe('2026-01-18T00:00:00.000Z')
  })

  it('should handle partial User (Create/Update) without createdAt', () => {
    const partialUser = {
      name: 'Jane Smith',
      email: 'jane@example.com',
    }

    const json = UserAdapter.toJson(partialUser)
    expect(json.name).toBe('Jane Smith')
    expect(json.email).toBe('jane@example.com')
    expect(json.createdAt).toBeUndefined()
  })
})
