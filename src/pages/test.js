import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
  const [favourites, setFavourites] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('/api/favourites')
      .then(response => {
        setFavourites(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('/api/recipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Favourites</h2>
      <ul>
        {favourites.map(favourite => (
          <li key={favourite._id}>{favourite._id}</li>
        ))}
        {recipes.map(recipe => (
          <li key={recipe._id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Test;