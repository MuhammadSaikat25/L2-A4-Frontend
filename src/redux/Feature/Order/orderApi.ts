import { baseApi } from "../../api/baseApi";

const orderApi=baseApi.injectEndpoints({
    endpoints: (builder) => ({
        postOrder: builder.mutation({
          query: (data) => ({
            url: "/conform-order",
            method: "POSt",
            body:data
          }),
        }),
       
      }),
})

export const {usePostOrderMutation}=orderApi