import React, { useEffect, useState } from "react";
import "./IngredientList.css";

type DataCallback = (data: string[]) => void;

interface ChildComponentProps {
  onDataFromChild: DataCallback;
}

const IngredientList: React.FC<ChildComponentProps> = ({ onDataFromChild }) => {
  const arr: string[] = [];
  const [item, setItem] = useState(""); // State to store user input
  const [items, setItems] = useState(arr); // State to store list items

  useEffect(() => {
    console.log(items);
    onDataFromChild(items);
  }, [items]);

  // Function to add an item to list
  const addItem = () => {
    if (item.trim() !== "") {
      setItems([...items, item]);
      setItem(""); // Clear the user input
    }
  };

  // Function to remove an item from list
  const removeItem = (index: any) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const title = "Enter your ingredients:";

  return (
    <div className="ingredients-list">
      <h2 className="title">{title}</h2>
      <div className="input-container">
        <input
          type="text"
          id="ingredient-input"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button id="btn-add-item" onClick={addItem}>
          Add Item
        </button>
      </div>
      {items.length !== 0 && (
        <ol className="remove-list">
          {items.map((listItem, index) => (
            <li key={index} className="remove-list-items">
              <div className="remove-item-container">
                <p>{listItem}</p>
                <button id="btn-remove-item" onClick={() => removeItem(index)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default IngredientList;
