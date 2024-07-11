import { baseApi } from "../../api/baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "get-categories",
        method: "GET",
      }),
    }),
   
  }),
});

export const { useGetCategoriesQuery } =
  categoriesApi;
