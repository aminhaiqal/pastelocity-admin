import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// 1️⃣ Zod schema aligned with your fields
const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  color: z.string().optional(),
  length: z.string().optional(),
  quantity: z.number().min(0, { message: "Quantity must be >= 0" }),
  price: z.number().min(0, { message: "Price must be >= 0" }),
  cutting_type: z.string().optional(),
  image_url: z.string().url({ message: "Must be a valid URL" }).optional(),
})

// 2️⃣ Infer type from schema
type ProductFormValues = z.infer<typeof productSchema>

type ProductFormProps = {
  initialData?: Partial<ProductFormValues>
  onSubmit: (values: ProductFormValues) => void
}

// 3️⃣ Component
export function CollectionForm({ initialData, onSubmit }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      color: "",
      length: "",
      quantity: 0,
      price: 0,
      cutting_type: "",
      image_url: "",
    },
  })

  const handleSubmit: SubmitHandler<ProductFormValues> = (data) => {
    onSubmit(data) // now type-safe
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Red Cotton Fabric" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Image</FormLabel>
              <FormControl>
                 <Input id="picture" type="file" accept="image/*"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Product</Button>
      </form>
    </Form>
  )
}
