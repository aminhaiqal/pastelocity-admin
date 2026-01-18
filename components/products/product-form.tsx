"use client"

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
import { toast } from "sonner"
import { Input } from "@/components/ui/input"

const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  color: z.string().optional(),
  length: z.string().optional(),
  quantity: z.number().min(0, { message: "Quantity must be >= 0" }),
  price: z.number().min(0, { message: "Price must be >= 0" }),
  cutting_type: z.string().optional(),
  image_url: z.string().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Must be a valid URL"
  }).optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

type ProductFormProps = {
  initialData?: Partial<ProductFormValues>
  onSubmit: (values: ProductFormValues) => void | Promise<void>
  isSubmitting?: boolean
}


export function ProductForm({ initialData, onSubmit, isSubmitting = false }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      color: "",
      length: "",
      quantity: 0,
      price: 0,
      cutting_type: "",
      image_url: "",
    },
  })


  const handleSubmit: SubmitHandler<ProductFormValues> = async (data) => {    
    if (isSubmitting) return

    try {
      await onSubmit(data)
      toast.success("Product saved")
      form.reset()
    } catch (error: any) {
      console.error("Submit error:", error)
      toast.error(error?.message || "Failed to save product")
    }
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Soft cotton fabric suitable for shirts"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="Red" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="length"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Length (in inches)</FormLabel>
              <FormControl>
                <Input placeholder="54inch" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="cutting_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cutting Type</FormLabel>
              <FormControl>
                <Input placeholder="Manual or Machine" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*<FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                 <Input id="picture" type="file" accept="image/*"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />*/}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Product"}
        </Button>
      </form>
    </Form>
  )
}