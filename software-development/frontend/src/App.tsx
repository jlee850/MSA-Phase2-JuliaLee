import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  useCreateRecipeMutation,
  useGetAllRecipesQuery,
  useGetRecipeByIdQuery,
  useLazyGetRecipeByIdQuery,
} from "./api/apiSlice";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import RecipeBlurb from "./components/RecipeBlurb";
import IngredientList from "./components/IngredientList/IngredientList";
import { Recipe } from "./models/Recipe";
import RecipeCarousel from "./components/RecipeCarousel/RecipeCarousel";

function App() {
  const arr: string[] = [];
  const recipesArr: any[] = [];
  const [addNewPost, response] = useCreateRecipeMutation();
  const [dataFromChild, setDataFromChild] = useState(arr);
  const [recipeNumberFromChild, setRecipeNumberFromChild] = useState(0);
  const [recipes, setRecipes] = useState(recipesArr);
  const [trigger, { data }] = useLazyGetRecipeByIdQuery();

  // Callback function to receive data from the child component
  const handleChildData = (data: string[]) => {
    setDataFromChild(data);
  };

  const handleChildRecipe = (data: number) => {
    console.log("button clicked: " + data);
    console.log(recipes[data]);

    const recipe: Recipe = {
      Name: recipes[data].name,
      Method: (recipes[data].method as string[]).join(","),
      Ingredients: (recipes[data].ingredients as string[]).join(","),
    };
    //Call Post
    // Create object in js
    addNewPost(recipe)
      .unwrap()
      .then((payload) => {
        console.log(payload);
      })
      .then((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Do something with the fetched data
    if (data) {
      console.log("Recipe Data:", data.choices[0].message.content);

      try {
        const recipeToJson = JSON.parse(data.choices[0].message.content);
        setRecipes(recipeToJson.recipes);
      } catch (error) {
        console.error("Invalid JSON format:", error);
      }
    }
  }, [data]);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    trigger(dataFromChild.join(","));
  };

  const onSaveRecipe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    trigger(dataFromChild.join(","));
  };

  return (
    <div>
      <h1 className="header">RECIPES</h1>
      <NavigationBar /> <br />
      <article>
        <div className="recipe-blurb">
          <RecipeBlurb /> <br />
        </div>
        <div>
          <IngredientList onDataFromChild={handleChildData} /> <br />
          <button
            className="get-recipe-btn"
            onClick={($event) => onSubmit($event)}
          >
            {" "}
            Get Recipes{" "}
          </button>{" "}
          <br />
        </div>
        {recipes.length !== 0 && (
          <div className="carousel-container">
            <RecipeCarousel
              recipes={recipes}
              onDataFromChild={handleChildRecipe}
            />
          </div>
        )}
      </article>
    </div>
  );
}

export default App;
