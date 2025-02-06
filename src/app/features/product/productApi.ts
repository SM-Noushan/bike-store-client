import { baseApi } from "../../api/baseApi";
import { TBike, TQueryParams, TResponseRedux } from "@/types";

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
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: productPath + "/" + id,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const { useGetAllProductQuery, useDeleteProductMutation } = productApi;
