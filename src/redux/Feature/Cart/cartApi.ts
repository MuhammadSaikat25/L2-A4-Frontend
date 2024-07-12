import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (cartData) => ({
        url: "addToCart",
        method: "POST",
        body: cartData,
      }),
    }),
    getCartQuantity: builder.query({
      query: (id) => ({
        url: `/get-cart/${id}`,
        method: "GET",
      }),
    }),
    getUserCart: builder.query({
      query: (user) => {
        return {
          url: `/get/${user}`,
          method: "GET",
        };
      },
    }),
    deleteCart: builder.mutation({
      query: (id) => {
        return {
          url: `/delete-cart/${id}`,
          method: "DELETE",
        };
      },
    }),
    increment: builder.mutation({
      query: (id) => {
        return {
          url: `/increment-quantity/${id}`,
          method: "PATCH",
        };
      },
    }),
    decrement: builder.mutation({
      query: (id) => {
        return {
          url: `/decrement-quantity/${id}`,
          method: "PATCH",
        };
      },
    }),
  }),
});
export const {
  useAddToCartMutation,
  useGetCartQuantityQuery,
  useGetUserCartQuery,
  useDeleteCartMutation,
  useIncrementMutation,
  useDecrementMutation,
} = cartApi;
