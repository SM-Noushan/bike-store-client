import { TProductCategory } from "@/types/Bike.Types";

export const USER_ROLE = {
  admin: "admin",
  customer: "customer",
} as const;

export const firstPage = {
  key: "page",
  value: "1",
};

export const itemPerDataTable = {
  key: "limit",
  value: "9",
};

export const ProductCategory = {
  Mountain: "Mountain",
  Road: "Road",
  Hybrid: "Hybrid",
  Electric: "Electric",
} as const;

export const ProductCategories: TProductCategory[] =
  Object.values(ProductCategory);
