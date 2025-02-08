import { baseApi } from "../../api/baseApi";
import { TOrder, TOrderDetails, TQueryParams, TResponseRedux } from "@/types";

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
    getAllOrder: builder.query({
      query: (args: TQueryParams[]) => {
        const params = new URLSearchParams();
        args.forEach((arg) => params.append(arg.key, arg.value));
        return { url: apiPath + "/all-order", method: "GET", params: params };
      },
      transformResponse: (response: TResponseRedux<TOrder[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: [{ type: "Orders", id: "LIST" }],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({ url: apiPath + "/single-order/" + id, method: "GET" }),
      transformResponse: (response: TResponseRedux<TOrderDetails>) =>
        response.data,
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

export const {
  useGetMyOrdersQuery,
  useGetAllOrderQuery,
  useGetSingleOrderQuery,
  useCheckoutMutation,
} = orderApi;
