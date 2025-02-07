import { z } from "zod";
import { TCommonResponseData } from "./Global.Types";
import { bikeSchema, updateBikeSchema } from "@/schema/Bike.Schema";

export type TBike = {
  image: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
} & TCommonResponseData;

export type TCart = {
  itemQuantity: number;
} & TBike;

export type TProductCard = {
  badge?: boolean;
  bike: TBike;
};

export type TBikeInputsFormValues = z.infer<typeof bikeSchema>;
export type TUpdateBikeInputsFormValues = z.infer<typeof updateBikeSchema>;
