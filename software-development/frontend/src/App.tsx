import React from "react";
import PromptToUser from "./components/PromptToUser";
import RecipeBlurb from "./components/RecipeBlurb";
import NavigationBar from "./components/NavigationBar";
import IngredientList from "./components/IngredientList";
import "./App.css";

function App() {
  return (
    <article>
      <h1 className="header">RECIPES</h1>
      <NavigationBar /> <br />
      <RecipeBlurb /> <br /> <br />
      <PromptToUser />
      <IngredientList />
      <GetRecipeButton />
    </article>
  );
}
export default App;

function GetRecipeButton() {
  return <button>Get Recipes</button>;
}
