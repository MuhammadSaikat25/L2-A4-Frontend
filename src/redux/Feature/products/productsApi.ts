import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getProductsBaseOnSingleCategories: builder.query({
      query: (name) => {
        return {
          url: `/get-products/${name}`,
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
    getProductsByName: builder.query({
      query: (name: string) => {
        return {
          url: `get-products-${name}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsBaseOnSingleCategoriesQuery,
  useGetProductsBaseOnMultipleCategoriesMutation,
  useGetProductsByNameQuery,
} = productsApi;
