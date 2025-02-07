import { createSlice } from "@reduxjs/toolkit";

export type TProductMetaData = {
  brands: string[];
  models: string[];
  categories: string[];
};

const initialState: TProductMetaData = {
  brands: [],
  models: [],
  categories: [],
};

export const productMetaDataSlice = createSlice({
  name: "productMetaData",
  initialState,
  reducers: {
    setProductMetaData: (state, action) => {
      state.brands = action.payload.brands;
      state.models = action.payload.models;
      state.categories = action.payload.categories;
    },
  },
  selectors: {
    selectProductBrands: ({ brands }) => brands,
    selectProductModels: ({ models }) => models,
    selectProductCategories: ({ categories }) => categories,
  },
});

export const {
  selectProductBrands,
  selectProductModels,
  selectProductCategories,
} = productMetaDataSlice.selectors;

export const { setProductMetaData } = productMetaDataSlice.actions;
