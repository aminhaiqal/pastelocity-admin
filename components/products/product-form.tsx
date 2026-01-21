"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
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
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from "react"
import { cutting_type } from "@/enums"

// Validation schema
const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Name is required" }),
  color: z.string().optional(),
  length: z.number().min(0, { message: "Length must be >= 0" }),
  quantity: z.number().min(0, { message: "Quantity must be >= 0" }),
  price: z.number().min(0, { message: "Price must be >= 0" }),
  cutting_type: z.nativeEnum(cutting_type),
  image_url: z
    .string()
    .optional()
    .refine((val) => !val || val.trim() !== "", { message: "Image filename is required" }),
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
      color: "",
      length: 0,
      quantity: 0,
      price: 0,
      image_url: "",
    },
  })

  const [selectedQuantityButton, setSelectedQuantityButton] = React.useState<number | "Other" | null>(form.getValues("quantity"))
  const [customQuantity, setCustomQuantity] = React.useState<number>(form.getValues("quantity"))

  const handleSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    // If "Other" was selected, use custom quantity
    if (selectedQuantityButton === "Other") {
      data.quantity = customQuantity
    }

    if (isSubmitting) return

    try {
      await onSubmit(data)
      toast.success("Product saved")
      form.reset()
      setSelectedQuantityButton(null)
      setCustomQuantity(0)
    } catch (error: any) {
      console.error("Submit error:", error)
      toast.error(error?.message || "Failed to save product")
    }
  }

  const quantityOptions = [1, 5, 10, 50, "Other"] as const

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

        {/* Image URL */}
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Filename</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">https://storage.pastelocity.com.my/public/</span>
                  <Input
                    placeholder="my-image.jpg"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name */}
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

        {/* Description */} 
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Soft cotton fabric suitable for shirts" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Color */}
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

        {/* Length */}
        <FormField
          control={form.control}
          name="length"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Length (in inches)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  placeholder="54"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  value={Number(field.value) || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Quantity with quick-add + Other */}
        <FormItem>
          <FormLabel>Quantity</FormLabel>
          <div className="flex items-center space-x-2 mb-2">
            {quantityOptions.map((val) => (
              <Button
                key={val}
                type="button"
                size="sm"
                variant={selectedQuantityButton === val ? "default" : "outline"}
                onClick={() => {
                  setSelectedQuantityButton(val)
                  if (val === "Other") return
                  form.setValue("quantity", val as number)
                }}
              >
                {val === "Other" ? "Other" : `${val}`}
              </Button>
            ))}
          </div>
          {selectedQuantityButton === "Other" && (
            <FormControl>
              <Input
                type="number"
                min={0}
                step={1}
                placeholder="Enter quantity"
                value={customQuantity || ""}
                onChange={(e) => setCustomQuantity(parseInt(e.target.value) || 0)}
              />
            </FormControl>
          )}
          <FormMessage>{form.formState.errors.quantity?.message}</FormMessage>
        </FormItem>

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => {
                    // Remove non-digits
                    const digitsOnly = e.target.value.replace(/\D/g, "")
                    const value = digitsOnly ? parseFloat(digitsOnly) / 100 : 0
                    field.onChange(value)
                  }}
                  onBlur={() => {
                    field.onChange(parseFloat(field.value.toFixed(2)))
                  }}
                  value={Number(field.value)?.toFixed(2) || "0.00"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cutting Type */}
        <FormField
          control={form.control}
          name="cutting_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cutting Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cutting type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(cutting_type).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Product"}
        </Button>
      </form>
    </Form>
  )
}

export type { ProductFormValues }