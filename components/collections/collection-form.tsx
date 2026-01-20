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
import { Checkbox } from "@/components/ui/checkbox"

const collectionSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  imageUrl: z
    .string()
    .optional()
    .refine((val) => !val || val.trim() !== "", { message: "Image filename is required" }),
  isAvailable: z.boolean().optional(),
})

export type CollectionFormValues = z.infer<typeof collectionSchema>

type CollectionFormProps = {
  initialData?: Partial<CollectionFormValues>
  onSubmit: (values: CollectionFormValues) => void
  isSubmitting?: boolean
}

export function CollectionForm({ initialData, onSubmit, isSubmitting }: CollectionFormProps) {
  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      isAvailable: false,
      ...initialData,
    },
  })

  const handleSubmit: SubmitHandler<CollectionFormValues> = (data) => {
    // Prepend the public bucket URL if filename exists
    if (data.imageUrl) {
      data.imageUrl = `https://storage.pastelocity.com.my/public/${data.imageUrl}`
    }
    onSubmit(data)
  }

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
                <Input placeholder="Summer Collection" {...field} />
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
                <Input placeholder="A short description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Filename */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Image Filename</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">https://storage.pastelocity.com.my/public/</span>
                  <Input placeholder="my-image.jpg" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Availability */}
        <FormField
          control={form.control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
              <FormLabel>Available</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Collection"}
        </Button>
      </form>
    </Form>
  )
}
