/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Recipe from "@/components/recipe/recipe";
import NavBar from "@/components/navBar";
import { useSession } from "next-auth/react";

export default function Favourites({ setExtraRecipeData }) {
  const { data: session, status } = useSession();

  const defaultFilters = {
    easy: false,
    medium: false,
    hard: false,
  };

  const [favouritesData, setFavouritesData] = useState([]);
  const [recipesData, setRecipesData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);

  const selectedCount = Object.values(filters).filter((value) => value).length;

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const favouritesResponse = await axios.get("/api/favourites");

        if (favouritesResponse.data.length) {
          const favouritesIds = favouritesResponse.data.map(
            (favourite) => favourite.recipe_id
          );
          const recipesResponse = await axios.get("/api/recipes");
          const matchingRecipes = recipesResponse.data.filter((recipe) =>
            favouritesIds.includes(recipe._id)
          );

          setFavouritesData(favouritesResponse.data);
          setRecipesData(matchingRecipes);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div>
      <div className="mt-8 py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <NavBar />
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-center text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-900">
          Favourite Recipes
        </h1>
        <div className="container mx-auto p-4">
          <div className="grid gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {favouritesData.map((favourite) => {
              const recipe = recipesData.find(
                (recipe) => recipe._id === favourite.recipe_id
              );
              return (
                recipe && (
                  <Recipe
                    key={recipe._id}
                    recipe={recipe}
                    favouritesData={favouritesData}
                    recipesData={recipesData}
                    setFavouritesData={setFavouritesData}
                    setExtraRecipeData={setExtraRecipeData}
                  />
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
