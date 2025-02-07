import { baseApi } from "../../api/baseApi";
import { TBike, TQueryParams, TResponseRedux } from "@/types";
import { TProductMetaData } from "./productMetadataSlice";

const productPath = "/products";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (args: TQueryParams[]) => {
        const params = new URLSearchParams();
        args.forEach((arg) => params.append(arg.key, arg.value));
        return { url: productPath, method: "GET", params: params };
      },
      transformResponse: (response: TResponseRedux<TBike[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: [{ type: "Products", id: "LIST" }],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: productPath + "/" + id,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TBike>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "Products", id: "LIST" }],
    }),
    getProductMetaData: builder.query({
      query: () => ({
        url: productPath + "/brand-model-category",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProductMetaData>) =>
        response.data,
      providesTags: [{ type: "Products", id: "PRODUCT_METADATA" }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: productPath + "/" + id,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: productPath,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: (payload) => ({
        url: productPath + "/" + payload.id,
        method: "PUT",
        body: payload.data,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductQuery,
  useGetProductMetaDataQuery,
  useDeleteProductMutation,
  useAddProductMutation,
  useUpdateProductMutation,
} = productApi;
