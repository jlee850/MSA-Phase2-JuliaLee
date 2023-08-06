import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RecipeCarousel.css";

type DataCallback = (data: number) => void;

interface ChildComponentProps {
  recipes: any[];
  onDataFromChild: DataCallback;
}

const RecipeCarousel: React.FC<ChildComponentProps> = ({
  recipes,
  onDataFromChild,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const onSaveRecipe = (key: number) => {
    onDataFromChild(key);
  };

  return (
    <Slider {...settings}>
      {recipes.map((recipe, index) => (
        <div className="carousel" key={index}>
          {<h2>{recipe.name}</h2>}
          {<h3>Ingredients</h3>}
          <ul>
            {recipe.ingredients.map((ingredientItem: any, index: number) => (
              <li key={index}>{ingredientItem}</li>
            ))}
          </ul>
          {<h3>Method</h3>}
          <p>
            {recipe.method.map((methodItem: string, index: number) => (
              <li key={index}>{methodItem}</li>
            ))}
          </p>
          <button
            className="save-recipe-btn"
            onClick={() => onSaveRecipe(index)}
          >
            {" "}
            Save Recipe{" "}
          </button>{" "}
        </div>
      ))}
    </Slider>
  );
};

export default RecipeCarousel;
