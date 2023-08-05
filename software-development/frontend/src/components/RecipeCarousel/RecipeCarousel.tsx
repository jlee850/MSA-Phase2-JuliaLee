import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Recipe } from "../../models/Recipe";
import "./RecipeCarousel.css";

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
        <div className="carousel" key={index}>
          {recipe != "" && <h2>{recipe.name}</h2>}
          {recipe != "" && <h3>Ingredients</h3>}
          <ul>
            {recipe != "" &&
              recipe.ingredients.map((ingredientItem: any, index: number) => (
                <li key={index}>{ingredientItem}</li>
              ))}
          </ul>
          {recipe != "" && <h3>Method</h3>}
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
