import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (sort) => {
        return {
          url: `products${sort ? `?sort=${sort}` : ""}`,
          method: "GET",
        };
      },
    }),
    getProductsBaseOnSingleCategories: builder.query({
      query: ({ name, sort }) => {
        return {
          url: `/get-products/${name}${sort ? `?sort=${sort}` : ""}`,
          method: "GET",
          params: name,
        };
      },
    }),
    getProductsBaseOnMultipleCategories: builder.mutation({
      query: (categoriesName) => {
        return {
          url: "/get-Hello",
          method: "POST",
          body: categoriesName,
        };
      },
    }),
    getProductsByName: builder.mutation({
      query: (name: string) => {
        return {
          url: `/get-products/${name}`,
          method: "POST",
        };
      },
    }),
    getProductsById: builder.query({
      query: (id: string) => {
        return {
          url: `/get-product/${id}`,
          method: "GET",
        };
      },
    }),
    updateProducts: builder.mutation({
      query: (data) => {
        return {
          url: `/update-product/${data.id}`,
          method: "PATCH",
          body: data.updateData,
        };
      },
    }),
    carateProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/create-products`,
          method: "POST",
          body: data,
        };
      },
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => {
       
        return {
          url: `/delete-product/${id}`,
          method: "DELETE",
        };
      },
    }),
    getMaxPrice:builder.query({
      query:()=>{
        return {
          url:"/get-maxPrice",
          method:"GET"
        }
      }
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsBaseOnSingleCategoriesQuery,
  useGetProductsBaseOnMultipleCategoriesMutation,
  useGetProductsByNameMutation,
  useGetProductsByIdQuery,
  useUpdateProductsMutation,
  useCarateProductMutation,
  useDeleteProductMutation,
  useGetMaxPriceQuery
} = productsApi;
