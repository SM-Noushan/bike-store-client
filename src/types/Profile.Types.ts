import { z } from "zod";
import { changePasswordSchema, deliverAddressSchema } from "@/schema";
import { TCommonResponseData } from "./Global.Types";

export type TProfile = {
  name: string;
  email: string;
  role: string;
  deliveryAddress: string;
  isActive: boolean;
} & TCommonResponseData;

export type TUser = TProfile;

export type TProfileSectionProps = {
  title: string;
  content: string;
  onEdit: () => void;
  isLoading?: boolean;
};

export type TChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
export type TSetAddressFormValues = z.infer<typeof deliverAddressSchema>;
