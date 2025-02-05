import { z } from "zod";
import { changePasswordSchema } from "@/schema";
import { TCommonResponseData } from "./Global.Types";

export type TProfile = {
  name: string;
  email: string;
  role: string;
  deliveryAddress: string;
  isActive: boolean;
} & TCommonResponseData;

export type TProfileSectionProps = {
  title: string;
  content: string;
  onEdit: () => void;
  isLoading?: boolean;
};

export type TChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
