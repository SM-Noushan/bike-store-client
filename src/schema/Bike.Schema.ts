import { z } from "zod";

// Common reusable validations
const trimmedString = z.string().trim().min(1, "Field cannot be empty");

// Schema for TProduct(Bike)
export const bikeSchema = z.object({
  image: z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
    message: "Only image files are allowed",
  }),
  name: trimmedString,
  brand: trimmedString,
  model: trimmedString,
  price: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Price must be a non-negative number",
    }),
  category: trimmedString,
  description: trimmedString,
  quantity: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val >= 0, {
      message: "Quantity must be a whole number",
    }),
});

// Schema for updating TProduct(Bike)
export const updateBikeSchema = bikeSchema.deepPartial();
