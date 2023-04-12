import React, { useState } from "react";

const IngredientRow = ({ ingredient }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleGroceryClick = async (ingredient) => {
    if (!isAdded) {
      try {
        const response = await fetch("/api/add_grocery", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredientName: ingredient.name }),
        });

        if (response.ok) {
          console.log("Meal added successfully");
          setIsAdded(true);
        } else {
          console.error("Failed to add ingredient to grocery list.");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("error: already added to grocery list!");
    }
  };

  return (
    <tr
      className='bg-zinc-900 border-b dark:border-gray-700'
      key={ingredient.name}
    >
      <th
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {ingredient.name}
      </th>
      <td className='px-2 py-4'>{ingredient.primary_unit.quantity}</td>
      <td className='px-2 py-4'>{ingredient.primary_unit.display}</td>
      <td className='flex justify-center items-center py-2'>
        <button
          onClick={handleGroceryClick}
          disabled={isAdded}
          className='text-white bg-green-600 hover:bg-green-800  font-medium rounded-full text-xs px-2 py-2 text-center disabled:bg-green-900'
        >
          {isAdded ? "Added!" : "Add to Groceries"}
        </button>
      </td>
    </tr>
  );
};

export default IngredientRow;
