import { collectionService } from '../collection.service'
import { CreateCollection, UpdateCollection } from '@/domains/catalog'

describe('CollectionService (memory strategy)', () => {
  beforeEach(() => {
    // Ensure memory is cleared before each test
    collectionService.clearMemory()
    process.env.PRODUCT_SEED_STRATEGY = 'memory'
  })

  it('should create a collection', async () => {
    const input: CreateCollection = {
      name: 'Summer Collection',
      description: 'A sunny collection',
      image: 'summer.png',
      is_available: true,
    }

    const collection = await collectionService.createCollection(input)

    expect(collection.id).toBe(1)
    expect(collection.name).toBe('Summer Collection')
    expect(collection.slug).toBe('summer-collection')
    expect(collection.description).toBe('A sunny collection')
    expect(collection.image).toBe('summer.png')
    expect(collection.is_available).toBe(true)
    expect(collection.products).toEqual([])
    expect(collection.created_at).toBeDefined()
    expect(collection.updated_at).toBeDefined()
  })

  it('should get a collection by id', async () => {
    const input: CreateCollection = {
      name: 'Fall Collection',
      is_available: true,
    }
    const created = await collectionService.createCollection(input)

    const fetched = await collectionService.getCollection(created.id)
    expect(fetched).toEqual(created)
  })

  it('should list all collections', async () => {
    await collectionService.createCollection({ name: 'One', is_available: true })
    await collectionService.createCollection({ name: 'Two', is_available: false })

    const all = await collectionService.listCollections()
    expect(all).toHaveLength(2)
    expect(all[0].name).toBe('One')
    expect(all[1].name).toBe('Two')
  })

  it('should update a collection', async () => {
    const created = await collectionService.createCollection({ name: 'Old', is_available: true })

    const updateInput: UpdateCollection = { id: created.id, name: 'New', is_available: false }
    const updated = await collectionService.updateCollection(updateInput)

    expect(updated.id).toBe(created.id)
    expect(updated.name).toBe('New')
    expect(updated.is_available).toBe(false)
    expect(updated.updated_at).toBeDefined()
  })

  it('should delete a collection', async () => {
    const created = await collectionService.createCollection({ name: 'To Delete', is_available: true })

    const deleted = await collectionService.deleteCollection(created.id)
    expect(deleted).toEqual(created)

    const all = await collectionService.listCollections()
    expect(all).toHaveLength(0)
  })

  it('should seed multiple collections', async () => {
    const seedData: CreateCollection[] = [
      { name: 'A', is_available: true },
      { name: 'B', is_available: false },
    ]

    const seeded = await collectionService.seedCollections(seedData)

    expect(seeded).toHaveLength(2)
    expect(seeded[0].name).toBe('A')
    expect(seeded[1].name).toBe('B')

    const all = await collectionService.listCollections()
    expect(all).toHaveLength(2)
  })

  it('should throw when updating non-existent collection', async () => {
    await expect(
      collectionService.updateCollection({ id: 999, name: 'Fail' })
    ).rejects.toThrow('Collection 999 not found in memory')
  })

  it('should throw when deleting non-existent collection', async () => {
    await expect(collectionService.deleteCollection(999)).rejects.toThrow('Collection 999 not found in memory')
  })
})
