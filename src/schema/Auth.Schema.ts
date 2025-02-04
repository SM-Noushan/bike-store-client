import { z } from "zod";

// General Fields
export const emailField = z.string().email("Invalid email");
export const passwordField = z
  .string()
  .min(6, "Password must be at least 6 characters");

// Login Schema & Fields
export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});

// Register Schema & Fields
export const registerSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: emailField,
  password: passwordField,
});
