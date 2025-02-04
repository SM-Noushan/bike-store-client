import { z } from "zod";
import { loginSchema, registerSchema } from "@/schema";

export type TLoginFormValues = z.infer<typeof loginSchema>;
export type TRegisterFormValues = z.infer<typeof registerSchema>;