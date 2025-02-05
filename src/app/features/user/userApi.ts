import { TProfile, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const userPath = "/users";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: userPath + "/me",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProfile>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "Profile" }],
    }),
    setDeliveryAddress: builder.mutation({
      query: (address) => ({
        url: userPath + "/set-delivery-address",
        method: "PUT",
        body: address,
      }),
      invalidatesTags: [{ type: "Profile" }],
    }),
  }),
});

export const { useProfileQuery, useSetDeliveryAddressMutation } = userApi;
