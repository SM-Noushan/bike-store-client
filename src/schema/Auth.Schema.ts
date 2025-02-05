import { z } from "zod";

// General Fields
export const emailSchema = z.string().email("Invalid email");
export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");

// Login Schema & Fields
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Register Schema & Fields
export const registerSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: emailSchema,
  password: passwordSchema,
});
