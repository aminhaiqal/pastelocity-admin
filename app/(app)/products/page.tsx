import { Product } from "@/services/products/types"
import ProductList from "@/components/products/product-list"

const dummyProducts: Product[] = [
  {
    id: "prod_1",
    collection_id: "col_1",
    name: "Red Cotton Fabric",
    color: "Red",
    length: "2m",
    quantity: 50,
    price: 25.5,
    cutting_type: "Manual",
    image_url: "https://via.placeholder.com/150",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-05",
  },
  {
    id: "prod_2",
    name: "Blue Silk Fabric",
    color: "Blue",
    quantity: 20,
    price: 50.0,
    cutting_type: "Machine",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03",
  },
]

export default async function ProductsPage() {
  // simulate server-side data fetching
  await new Promise((r) => setTimeout(r, 200))

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>
      <ProductList products={dummyProducts} />
    </main>
  )
}
