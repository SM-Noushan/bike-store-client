import { ProductCategory } from "@/constants/Constant";
import { TCommonResponseData } from "./Global.Types";

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
