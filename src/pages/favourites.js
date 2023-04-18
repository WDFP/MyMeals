import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
  const [favouritesData, setFavouritesData] = useState([]);
  const [recipesData, setRecipesData] = useState([]);

  useEffect(() => {
    axios.get('/api/favourites')
      .then(response => {
        setFavouritesData(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('/api/recipes')
      .then(response => {
        setRecipesData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Favourites</h2>
      <ul>
        {favouritesData.map(favourite => {
          let foundRecipe = null;
          const processedRecipeIds = new Set();
          for (let i = 0; i < recipesData.length; i++) {
            if (processedRecipeIds.has(recipesData[i]._id)) {
              continue;
            }

            if (recipesData[i]._id === favourite.recipe_id) {
              foundRecipe = recipesData[i];
              processedRecipeIds.add(recipesData[i]._id);
              break;
            }
          }

          return (
            <li key={favourite._id}>
              {foundRecipe ? foundRecipe.name : 'Unknown recipe'}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Test;
