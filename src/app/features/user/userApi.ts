import { baseApi } from "../../api/baseApi";
import { TProfile, TQueryParams, TResponseRedux, TUser } from "@/types";

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
    getAllUser: builder.query({
      query: (args: TQueryParams[]) => {
        const params = new URLSearchParams();
        args.forEach((arg) => params.append(arg.key, arg.value));
        return { url: userPath + "/users", method: "GET", params: params };
      },
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: (result) => {
        const userTags = result?.data
          ? result.data.map(({ _id }) => ({
              type: "Users" as const,
              id: _id,
            }))
          : [];
        return [...userTags, { type: "Users", id: "LIST" }];
      },
    }),
    setDeliveryAddress: builder.mutation({
      query: (address) => ({
        url: userPath + "/set-delivery-address",
        method: "PUT",
        body: address,
      }),
      invalidatesTags: [{ type: "Profile" }],
    }),
    changeStatus: builder.mutation({
      query: (id) => ({
        url: userPath + "/change-status/" + id,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useProfileQuery,
  useGetAllUserQuery,
  useChangeStatusMutation,
  useSetDeliveryAddressMutation,
} = userApi;
