import React, { useState } from "react";
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
import PromptToUser from "./components/PromptToUser";
import IngredientList from "./components/IngredientList";
import axios from "axios";
import { Recipe } from "./models/Recipe";

function App() {
  const arr: string[] = [];
  const [addNewPost, response] = useCreateRecipeMutation();
  const [dataFromChild, setDataFromChild] = useState(arr);

  // Callback function to receive data from the child component
  const handleChildData = (data: string[]) => {
    console.log(data);
    setDataFromChild(data);
  };
  // updatePost({ id: 1, name: "test", typeOfCuisine: "Thai" });

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let ingredients = "";
    dataFromChild.forEach((i) => (ingredients += i + ","));
    ingredients.substring(0, ingredients.length - 1);

    const recipe: Recipe = {
      Name: "test",
      TypeOfCuisine: "Thai",
      Ingredients: ingredients,
    }; // Create object in js

    addNewPost(recipe)
      .unwrap()
      .then(() => {})
      .then((error) => {
        console.log(error);
      });
  };
  // const { data, isLoading, isError } = useGetAllRecipesQuery();

  // if (isLoading) return <CircularProgress />;
  // if (isError) return <p>Oops, Something went wrong!</p>;

  //   return (
  //     //TODO: Hook theming up to redux so that it selects
  //     <ThemeProvider theme={lightTheme}>
  //       <div className="App">
  //         {data!.length === 0 && <p>No Todo Lists!</p>}
  //         {data!.map((r) => (
  //           <Recipe id={r.id} name={r.name} typeOfCuisine={r.typeOfCuisine} />
  //         ))}
  //       </div>
  //     </ThemeProvider>
  //   );
  // }

  return (
    <article>
      <h1 className="header">RECIPES</h1>
      <NavigationBar /> <br />
      <RecipeBlurb /> <br /> <br />
      <PromptToUser />
      <IngredientList onDataFromChild={handleChildData} />
      <button onClick={($event) => onSubmit($event)}>Get Recipes</button>
    </article>
  );
}

export default App;
