import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "./themes";
import {
  useCreateRecipeMutation,
  useGetAllRecipesQuery,
  useGetRecipeByIdQuery,
} from "./api/apiSlice";
import { CircularProgress } from "@mui/material";
import NavigationBar from "./components/NavigationBar";
import RecipeBlurb from "./components/RecipeBlurb";
import IngredientList from "./components/IngredientList";
import { Recipe } from "./models/Recipe";
import RecipeCarousel from "./components/RecipeCarousel";

function App() {
  const arr: string[] = [];
  const [addNewPost, response] = useCreateRecipeMutation();
  const [dataFromChild, setDataFromChild] = useState(arr);
  const [recipes, setRecipes] = useState([]);

  // Callback function to receive data from the child component
  const handleChildData = (data: string[]) => {
    console.log(data);
    setDataFromChild(data);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let ingredients = "";
    dataFromChild.forEach((i) => (ingredients += i + ","));
    ingredients = ingredients.substring(0, ingredients.length - 1);

    const recipe: Recipe = {
      // Name: "test",
      // TypeOfCuisine: "Thai",
      Ingredients: ingredients,
    }; // Create object in js

    addNewPost(recipe)
      .unwrap()
      .then((payload) => {
        console.log(payload.choices[0].message.content);

        try {
          const recipeToJson = JSON.parse(payload.choices[0].message.content);
          setRecipes(recipeToJson.recipes);
        } catch (error) {
          console.error("Invalid JSON format:", error);
        }
      })
      .then((error) => {
        console.log(error);
      });
  };

  return (
    <article>
      <h1 className="header">RECIPES</h1>
      <NavigationBar /> <br />
      <RecipeBlurb /> <br /> <br />
      <div className="prompt-user">
        <IngredientList onDataFromChild={handleChildData} />

        <button onClick={($event) => onSubmit($event)}>Get Recipes</button>
      </div>
      {recipes.length !== 0 && (
        <div>
          <RecipeCarousel recipes={recipes} />
        </div>
      )}
    </article>
  );
}

export default App;
