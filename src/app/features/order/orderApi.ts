import { TOrder, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const apiPath = "/orders";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: () => ({ url: apiPath, method: "GET" }),
      transformResponse: (response: TResponseRedux<TOrder[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: [{ type: "Orders", id: "LIST" }],
    }),
    checkout: builder.mutation({
      query: (products) => ({
        url: apiPath + "/checkout",
        method: "POST",
        body: products,
      }),
      transformResponse: (response: TResponseRedux<string>) => response.data,
      invalidatesTags: [
        { type: "Products", id: "LIST" },
        { type: "Orders", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetMyOrdersQuery, useCheckoutMutation } = orderApi;
