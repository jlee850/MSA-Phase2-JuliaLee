import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Recipe } from "../models/Recipe";

interface ChildComponentProps {
  recipes: any[];
}

const RecipeCarousel: React.FC<ChildComponentProps> = ({ recipes }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log(recipes);

  return (
    <Slider {...settings}>
      {recipes.map((recipe, index) => (
        <div key={index}>
          {recipe != "" && <h3>{recipe.name}</h3>}
          {recipe != "" && <h4>Ingredients</h4>}
          <ul>
            {recipe != "" &&
              recipe.ingredients.map((ingredientItem: any, index: number) => (
                <li key={index}>{ingredientItem}</li>
              ))}
          </ul>
          {recipe != "" && <h4>Method</h4>}
          <ol>
            {recipe != "" &&
              recipe.method.map((methodItem: string, index: number) => (
                <li key={index}>{methodItem}</li>
              ))}
          </ol>
        </div>
      ))}
    </Slider>
  );
};

export default RecipeCarousel;
