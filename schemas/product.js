import { z } from "zod"

const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  inStock: z.boolean().default(true),
  image: z.any(), // We'll validate the image file separately
  averageRating: z.number().min(0).max(5).optional() // Rating from 0 to 5
})

export default ProductSchema 