// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Recipe } from "../models/Recipe";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", `Basic ${btoa("test:test")}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Todo item endpoints
    getRecipeById: builder.query({
      query: (Ingredients) => `Recipe/${Ingredients}`,
    }),
    getAllRecipes: builder.query<Recipe[], void>({
      query: () => `Recipe/`,
    }),
    updateRecipe: builder.mutation({
      query: (recipe) => ({
        url: `Recipe/${recipe.Id}`,
        method: "PUT",
        body: recipe,
      }),
    }),
    createRecipe: builder.mutation({
      query: (recipe: Recipe) => ({
        url: "Recipe",
        method: "POST",
        body: recipe,
      }),
    }),
    deleteRecipe: builder.mutation({
      query: (Id) => ({
        url: `Recipe/${Id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetRecipeByIdQuery,
  useLazyGetRecipeByIdQuery,
  useUpdateRecipeMutation,
  useCreateRecipeMutation,
  useDeleteRecipeMutation,
  useGetAllRecipesQuery,
} = api;
