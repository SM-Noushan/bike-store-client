import { z } from "zod";
import { TCommonResponseData } from "./Global.Types";
import { ProductCategory } from "@/constants/Constant";
import { bikeSchema, updateBikeSchema } from "@/schema/Bike.Schema";

export type TProductCategory = keyof typeof ProductCategory;

export type TBike = {
  image: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  category: TProductCategory;
  description: string;
  quantity: number;
  inStock: boolean;
} & TCommonResponseData;

export type TCart = {
  itemQuantity: number;
} & TBike;

export type TBikeInputsFormValues = z.infer<typeof bikeSchema>;
export type TUpdateBikeInputsFormValues = z.infer<typeof updateBikeSchema>;
