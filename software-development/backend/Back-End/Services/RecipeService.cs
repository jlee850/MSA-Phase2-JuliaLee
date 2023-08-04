﻿using System;
using Back_End.Contexts;
using Back_End.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;
using System.Data;
using System.Text.Json;
using System.Net.Http.Headers;

namespace Back_End.Services
{
    public class RecipeService
    {
        private RecipeContext _recipeContext;

        public RecipeService(RecipeContext context)
        {
            _recipeContext = context;
        }

        public async Task<string> CreateRecipe(Recipe recipe)
        {

            var apiKey = "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";
            var endpointUrl = "https://api.openai.com/v1/chat/completions";
            var ingredients = "Responding only in the JSON format: { recipes: [ { name: string, ingredients: string[], method: string[] } ] }, including measurements in the ingredient array, what are 2 recipes you can make with ";
            //var ingredientsArray = recipe.Ingredients.Split(',');
            var ingredientsStringwithDelimiter = recipe.Ingredients.Replace(',', ' ');
            var ingredientsArray = ingredientsStringwithDelimiter.Split('|');
            for (int i = 0; i < ingredientsArray.Length -1; i++)
            {
                ingredients += ingredientsArray[i] + ", ";
            }
            
            ingredients += ingredientsArray[ingredientsArray.Length - 1] + "?";

            using var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            var requestBody = new
            {
                model = "gpt-3.5-turbo",
                messages = new[]
                {
                    new { role = "user", content = ingredients }
                }
            };

            var response = await client.PostAsync(endpointUrl, new StringContent(JsonSerializer.Serialize(requestBody), System.Text.Encoding.UTF8, "application/json"));

            if (response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                return responseBody;
            }
            else
            {
                return $"Request failed with status code {response.StatusCode}";
            }

            //_recipeContext.Recipes.Add(recipe);
            //await _recipeContext.SaveChangesAsync();
        }

        public async Task<Recipe> GetRecipe(long id)
        {
            return await _recipeContext.Recipes.FindAsync(id);
        }

        public async Task<List<Recipe>> GetAllRecipes()
        {
            return await _recipeContext.Recipes.ToListAsync();
        }

        public async Task UpdateRecipe(Recipe recipe)
        {
            _recipeContext.Entry(recipe).State = EntityState.Modified;
            await _recipeContext.SaveChangesAsync();
        }

        public async Task DeleteRecipe(long id)
        {
            var recipe = await _recipeContext.Recipes.FindAsync(id);
            _recipeContext.Recipes.Remove(recipe);
            await _recipeContext.SaveChangesAsync();
        }
    }
}
