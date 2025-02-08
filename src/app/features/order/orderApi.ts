import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const apiPath = "/orders";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (products) => ({
        url: apiPath + "/checkout",
        method: "POST",
        body: products,
      }),
      transformResponse: (response: TResponseRedux<string>) => response.data,
    }),
  }),
});

export const { useCheckoutMutation } = orderApi;
