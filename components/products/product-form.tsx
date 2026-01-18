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
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from "react"

// Cutting type enum
export enum CuttingType {
  LONG_SLEEVE = "Long Sleeve",
  CUTTING_SLIM = "Cutting Slim",
  KAFTAN = "Kaftan",
  BLOUSE = "Blouse",
}

// Validation schema
const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  color: z.string().optional(),
  length: z.number().min(0, { message: "Length must be >= 0" }),
  quantity: z.number().min(0, { message: "Quantity must be >= 0" }),
  price: z.number().min(0, { message: "Price must be >= 0" }),
  cutting_type: z.nativeEnum(CuttingType).optional(),
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
      length: 0,
      quantity: 0,
      price: 0,
      cutting_type: undefined,
    },
  })

  const [selectedQuantityButton, setSelectedQuantityButton] = React.useState<number | "Other" | null>(null)
  const [customQuantity, setCustomQuantity] = React.useState<number>(form.getValues("quantity"))

  const handleSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    // Ensure price is 2 decimals
    data.price = parseFloat(data.price.toFixed(2))

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
  const priceOptions = [50, "Custom"] as const

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

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
                <Input placeholder="Soft cotton fabric suitable for shirts" {...field} />
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
                  value={field.value || ""}
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
                {val === "Other" ? "Other" : `+${val}`}
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
                    // Always format to 2 decimals
                    field.onChange(parseFloat(field.value.toFixed(2)))
                  }}
                  value={field.value?.toFixed(2) || "0.00"}
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
                    {Object.values(CuttingType).map((type) => (
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