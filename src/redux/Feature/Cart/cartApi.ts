import { baseApi } from "../../api/baseApi";

const cartApi=baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addToCart: builder.mutation({
          query: (cartData) => ({
            url: "addToCart",
            method: "POST",
            body:cartData
          }),
        }),
        getCartQuantity: builder.query({
          query: (id) => ({
            url: `/get-cart/${id}`,
            method: "GET",
           
          }),
        }),
       
      }),
})
export const {useAddToCartMutation,useGetCartQuantityQuery}=cartApi