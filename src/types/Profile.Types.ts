import { z } from "zod";
import { changePasswordSchema } from "@/schema";

export type TChangePasswordFormValues = z.infer<typeof changePasswordSchema>;