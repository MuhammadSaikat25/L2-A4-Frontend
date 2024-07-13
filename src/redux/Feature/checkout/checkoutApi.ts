import { baseApi } from "../../api/baseApi";

const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => {
        return {
          url: "/checkout",
          method: "POST",
          body: data,
        };
      },
    }),
    getUserCheckoutData:builder.query({
      query:(user)=>{
        return{
          url:`/get-checkout/${user}`,
          method:"GET"
        }
      }
    })
  }),
});

export const {useCheckoutMutation,useGetUserCheckoutDataQuery} = checkoutApi;
