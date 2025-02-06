import { z } from "zod";
import { passwordSchema } from "./Auth.Schema";

export const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const deliverAddressSchema = z.object({
  deliveryAddress: z.string().min(10, "Address must be at least 10 characters"),
});
