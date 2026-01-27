import { productService } from '../product.service'
import { CreateProduct, UpdateProduct } from '@/domains/catalog'

describe('ProductService (memory strategy)', () => {
  beforeEach(() => {
    productService.clearMemory()
    process.env.PRODUCT_SEED_STRATEGY = 'memory'
  })

  it('should create a product', async () => {
    const input: CreateProduct = {
      name: 'Product A',
      quantity: 10,
      price: 100,
      description: 'Test product',
      color: 'Red',
      cutting_type: 'Standard', // added
    }

    const product = await productService.createProduct(input)

    expect(product.id).toBe(1)
    expect(product.name).toBe('Product A')
    expect(product.quantity).toBe(10)
    expect(product.price).toBe('100') // note: memory strategy converts to string
    expect(product.description).toBe('Test product')
    expect(product.color).toBe('Red')
    expect(product.cutting_type).toBe('Standard')
    expect(product.created_at).toBeDefined()
    expect(product.updated_at).toBeDefined()
  })

  it('should get a product by id', async () => {
    const created = await productService.createProduct({
      name: 'Product B',
      quantity: 5,
      price: 50,
      description: 'Test B', // added
      cutting_type: 'Standard', // added
    })

    const fetched = await productService.getProduct(created.id)
    expect(fetched).toEqual(created)
  })

  it('should list all products', async () => {
    await productService.createProduct({
      name: 'P1',
      quantity: 1,
      price: 10,
      description: 'Desc P1', // added
      cutting_type: 'Standard', // added
    })
    await productService.createProduct({
      name: 'P2',
      quantity: 2,
      price: 20,
      description: 'Desc P2', // added
      cutting_type: 'Standard', // added
    })

    const all = await productService.listProducts()
    expect(all).toHaveLength(2)
    expect(all[0].name).toBe('P1')
    expect(all[1].name).toBe('P2')
  })

  it('should update a product', async () => {
    const created = await productService.createProduct({
      name: 'Old Name',
      quantity: 1,
      price: 10,
      description: 'Old description', // added
      cutting_type: 'Standard', // added
    })

    const updateInput: UpdateProduct = {
      id: created.id,
      name: 'New Name',
      price: 15,
      description: 'New description', // added
      cutting_type: 'Custom', // added
    }

    const updated = await productService.updateProduct(updateInput)

    expect(updated.id).toBe(created.id)
    expect(updated.name).toBe('New Name')
    expect(updated.price).toBe('15') // memory converts to string
    expect(updated.quantity).toBe(1) // unchanged
    expect(updated.description).toBe('New description')
    expect(updated.cutting_type).toBe('Custom')
  })

  it('should throw when updating non-existent product', async () => {
    await expect(
      productService.updateProduct({ id: 999, name: 'Fail' })
    ).rejects.toThrow('Product 999 not found in memory')
  })

  it('should delete a product', async () => {
    const created = await productService.createProduct({
      name: 'To Delete',
      quantity: 1,
      price: 10,
      description: 'Delete me', // added
      cutting_type: 'Standard', // added
    })

    const deleted = await productService.deleteProduct(created.id)
    expect(deleted).toEqual(created)

    const all = await productService.listProducts()
    expect(all).toHaveLength(0)
  })

  it('should throw when deleting non-existent product', async () => {
    await expect(productService.deleteProduct(999)).rejects.toThrow('Product 999 not found in memory')
  })

  it('should return undefined for non-existent id', async () => {
    const fetched = await productService.getProduct(999)
    expect(fetched).toBeUndefined()
  })
})
