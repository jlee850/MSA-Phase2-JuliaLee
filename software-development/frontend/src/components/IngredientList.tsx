import React, { useState } from "react";

const IngredientList = () => {
  const arr: string[] = [];
  const [item, setItem] = useState(""); // State to store user input
  const [items, setItems] = useState(arr); // State to store list items

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

  return (
    <div>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>

      {items.length !== 0 && (
        <ul>
          {items.map((listItem, index) => (
            <li key={index}>
              {listItem}
              <button onClick={() => removeItem(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientList;
