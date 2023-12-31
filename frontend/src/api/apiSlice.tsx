// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Recipe } from "../models/Recipe";
import { User } from "../models/User";

const fetchToken = () => {
  return localStorage.getItem("api_token");
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = fetchToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
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
    signIn: builder.mutation({
      query: (user) => ({
        url: "User/login",
        method: "POST",
        body: user,
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
  useSignInMutation,
} = api;
