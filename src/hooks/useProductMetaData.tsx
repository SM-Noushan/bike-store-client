import { useEffect } from "react";
import {
  setProductMetaData,
  selectProductBrands,
  selectProductModels,
  selectProductCategories,
} from "@/app/features/product/productMetadataSlice";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { useGetProductMetaDataQuery } from "@/app/features/product/productApi";

export const useProductMetaData = () => {
  const dispatch = useAppDispatch();
  const { data: productMEtaData } = useGetProductMetaDataQuery(undefined);

  useEffect(() => {
    if (productMEtaData) {
      dispatch(setProductMetaData(productMEtaData));
    }
  }, [productMEtaData, dispatch]);

  const brands = useAppSelector(selectProductBrands);
  const models = useAppSelector(selectProductModels);
  const categories = useAppSelector(selectProductCategories);

  return {
    productBrands: brands,
    productModels: models,
    productCategories: categories,
  };
};
