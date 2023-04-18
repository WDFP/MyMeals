/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ObjectId } from "mongodb";

const recipeTitle = "text-2xl text-green-400";

export default function RecipesRefactored() {
  const defaultFilters = {
    easy: false,
    medium: false,
    hard: false,
  };

  const [filterText, setFilterText] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [favouritesData, setFavouritesData] = useState([]);
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [recipesData, setRecipesData] = useState([]);

  const selectedCount = Object.values(filters).filter((value) => value).length;

  useEffect(() => {
    fetchRecipes();
    fetchFavourites();
  }, []);

  const fetchRecipes = () => {
    axios
      .get("/api/recipes")
      .then((response) => {
        setRecipesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchFavourites = () => {
    axios
      .get("/api/favourites?user_id=mymealuser")
      .then((response) => {
        setFavouritesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("/api/favourites")
      .then((response) => {
        setFavouritesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/api/recipes")
      .then((response) => {
        setRecipesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const favouriteRecipeIds = favouritesData.map(
      (favourite) => favourite.recipe_id
    );
    const filteredFavourites = recipesData.filter((recipe) =>
      favouriteRecipeIds.includes(recipe._id)
    );
    setFavouriteRecipes(filteredFavourites);
  }, [recipesData, favouritesData]);

  const getDifficultyTagLabel = (difficulty) => {
    if (difficulty === 1) {
      return "Easy";
    } else if (difficulty === 2) {
      return "Medium";
    } else if (difficulty === 3) {
      return "Hard";
    } else {
      return "Unknown";
    }
  };
  const getDifficultyTagClass = (difficulty) => {
    if (difficulty === 1) {
      return "absolute top-0 right-0 mt-4 mr-4 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase bg-green-400";
    } else if (difficulty === 2) {
      return "absolute top-0 right-0 mt-4 mr-4 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase bg-yellow-400";
    } else if (difficulty === 3) {
      return "absolute top-0 right-0 mt-4 mr-4 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase bg-red-400";
    } else {
      return "absolute top-0 right-0 mt-4 mr-4 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase bg-gray-400";
    }
  };

  const filteredRecipes = recipesData
    .filter((recipe) => {
      // Check whether the recipe name or description includes the filter text
      const nameIncludesFilter = recipe.name
        .toLowerCase()
        .includes(filterText.toLowerCase());
      const descriptionIncludesFilter = recipe.description
        .toLowerCase()
        .includes(filterText.toLowerCase());
      // Check whether the recipe is favourited
      const isFavourited = favouritesData.some(
        (favourite) => favourite.recipe_id === recipe._id
      );

      // Helper function to check whether a recipe matches a difficulty filter
      const matchesDifficultyFilter = (difficulty) => {
        switch (difficulty) {
          case 1:
            return filters.easy;
          case 2:
            return filters.medium;
          case 3:
            return filters.hard;
          default:
            return false;
        }
      };

      // If only the "Favourites" filter is selected, show favourited recipes first
      if (filters.favourite) {
        // Check whether the recipe is favourited and matches the name or description filter
        return (
          isFavourited && (nameIncludesFilter || descriptionIncludesFilter)
        );
      } else {
        // If other filters are selected, show all recipes that match the name or description filter and the difficulty filters
        const matchesDifficulty =
          filters.easy || filters.medium || filters.hard
            ? matchesDifficultyFilter(recipe.difficulty)
            : true;

        return (
          nameIncludesFilter || descriptionIncludesFilter || matchesDifficulty
        );
      }
    })
    // Sort the filtered recipes to move favourited recipes to the top if only the "Favourites" filter is selected
    .sort((recipeA, recipeB) => {
      if (filters.favourite) {
        // Check whether each recipe is favourited
        const isFavouritedA = favouritesData.some(
          (favourite) => favourite.recipe_id === recipeA._id
        );
        const isFavouritedB = favouritesData.some(
          (favourite) => favourite.recipe_id === recipeB._id
        );

        // If only one recipe is favourited, move it to the top
        if (isFavouritedA && !isFavouritedB) return -1;
        if (isFavouritedB && !isFavouritedA) return 1;
      }

      // If both recipes are favourited or both are not favourited, don't change their order
      return 0;
    })
    // Apply the difficulty filters
    .filter((recipe) => {
      if (filters.easy && recipe.difficulty !== 1) return false;
      if (filters.medium && recipe.difficulty !== 2) return false;
      if (filters.hard && recipe.difficulty !== 3) return false;
      return true;
    });

  const handleFilterCheckboxChanged = (e) => {
    const target = e.target;
    const value = target.name;
    const checked = target.checked;

    setFilters((previousFilters) => {
      let updatedFilters = {
        ...previousFilters,
        [value]: checked,
      };

      // If one of the difficulty filters is checked, uncheck the others
      if (value === "easy" && checked) {
        updatedFilters = {
          ...updatedFilters,
          medium: false,
          hard: false,
        };
      } else if (value === "medium" && checked) {
        updatedFilters = {
          ...updatedFilters,
          easy: false,
          hard: false,
        };
      } else if (value === "hard" && checked) {
        updatedFilters = {
          ...updatedFilters,
          easy: false,
          medium: false,
        };
      }

      return updatedFilters;
    });
  };

  const reset = () => {
    console.log("reset");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setFilters(defaultFilters);
  };

  const onFavouriteClicked = (recipe) => {
    const foundFavourite = favouritesData.find(
      (favourite) => favourite.recipe_id === recipe._id
    );

    if (foundFavourite) {
      axios
        .delete(`/api/favourites/${ObjectId(foundFavourite._id)}`)
        .then((response) => {
          console.log("Deleting");
          console.log(response);
          setFavouritesData(
            favouritesData.filter(
              (favourite) => favourite._id !== foundFavourite._id
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("/api/favourites", {
          user_id: "mymealuser",
          recipe_id: recipe._id,
          active: true,
        })
        .then((response) => {
          console.log("Adding recipe ID: " + recipe._id + " to favourites");
          console.log(response);
          setFavouritesData([...favouritesData, response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-center text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-900">
          {" "}
          Recipes{" "}
        </h1>
        {/* Filter dropdown */}
        <div className="space-y-2 p-4 sticky top-0 z-10 bg-gray-100">
          {/* Filter text */}
          <div className="mb-4">
            <input
              className="border-solid border-2 border-gray-200 p-2 rounded-md w-full"
              type="text"
              placeholder="Filter by recipe name or description"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <details className="overflow-hidden rounded border border-gray-300 bg-gray-200 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between gap-2 p-4 text-gray-900 transition cursor-pointer">
              <span className="text-sm font-medium"> Additional Filters </span>
              <span className="text-sm text-gray-700">
                {" "}
                {selectedCount} Selected
                {selectedCount > 0 ? (
                  <button
                    type="button"
                    className="text-xs text-gray-900 underline underline-offset-4 ml-2"
                    onClick={reset}
                    onChange={handleFilterCheckboxChanged}
                  >
                    Reset
                  </button>
                ) : (
                  ""
                )}
              </span>
              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>
            <div className="bg-white border-t border-gray-200">
              {" "}
              {/* section under the Difficulty header */}
              {/* Second section of the filter */}
              <ul className="p-4 space-y-1 border-t border-gray-200">
                {/* Favourite filter */}
                <li>
                  <label
                    htmlFor="FilterFavourite"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterFavourite"
                      className="w-5 h-5 border-gray-300 rounded"
                      name="favourite"
                      checked={filters.favourite}
                      onChange={handleFilterCheckboxChanged}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Favourite{" "}
                    </span>
                  </label>
                </li>
                {/* My Plan filter */}
                <li>
                  <label
                    for="FilterMealPlan"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterMealPlan"
                      className="w-5 h-5 border-gray-300 rounded"
                      name="mealPlan"
                      checked={filters.mealPlan}
                      onChange={handleFilterCheckboxChanged}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      In my plan (not implemented){" "}
                    </span>
                  </label>
                </li>
                {/* Owned filter */}
                <li>
                  <label
                    for="FilterCreated"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterCreated"
                      className="w-5 h-5 border-gray-300 rounded"
                      name="created"
                      checked={filters.created}
                      onChange={handleFilterCheckboxChanged}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Owned by me (not implemented){" "}
                    </span>
                  </label>
                </li>
              </ul>
              <header className="flex items-center justify-between p-2 bg-gray-100 border-gray-100">
                {/* Difficulty filter section */}
                <span className="text-sm text-gray-700 border-gray-100">
                  {" "}
                  Difficulty{" "}
                </span>
              </header>
              <ul className="p-4 space-y-1 border-t border-gray-200">
                {/* Easy filter */}
                <li>
                  <label
                    for="FilterEasy"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterEasy"
                      className="w-5 h-5 border-gray-300 rounded"
                      name="easy"
                      checked={filters.easy}
                      onChange={handleFilterCheckboxChanged}
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Easy{" "}
                    </span>
                  </label>
                </li>
                {/* Medium filter */}
                <li>
                  <label
                    for="FilterMedium"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterMedium"
                      className="w-5 h-5 border-gray-300 rounded"
                      name="medium"
                      checked={filters.medium}
                      onChange={handleFilterCheckboxChanged}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Medium{" "}
                    </span>
                  </label>
                </li>
                {/* Hard filter */}
                <li>
                  <label
                    for="FilterHard"
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterHard"
                      className="w-5 h-5 border-gray-300 rounded"
                      name="hard"
                      checked={filters.hard}
                      onChange={handleFilterCheckboxChanged}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      Hard{" "}
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </details>
        </div>
        {/* <!-- recipe card grid --> */}
        <div className="container mx-auto p-4">
          {/* <!-- recipe card --> */}
          <div className="grid gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="flex flex-col justify-between bg-white rounded-md overflow-hidden relative shadow-md"
              >
                {/* recipe image */}
                <div>
                  <Image
                    className="w-full"
                    src={recipe.thumbnail_url}
                    alt={recipe.name}
                    width={500}
                    height={500}
                  />
                </div>

                <div className="p-4">
                  {/* recipe title */}
                  <h2
                    className={"line-clamp-1 " + recipeTitle}
                    title={recipe.name}
                  >
                    {recipe.name}
                  </h2>
                  {/* cook time */}
                  <div className="flex justify-between mt-4 mb-4 text-gray-500">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {/* cook time */}
                      <span className="ml-1 lg:text-xl">
                        {recipe.cook_time}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fill-rule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      {/* Number of steps */}
                      <span className="ml-1 lg:text-xl">#</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      {/* servings */}
                      <span className="ml-1 lg:text-xl">{recipe.servings}</span>
                    </div>
                  </div>
                  {/* description */}
                  <p
                    className="mb-3 mt-3 text-gray-500 h-4.5 line-clamp-3"
                    title={recipe.description}
                  >
                    {recipe.description}
                  </p>
                  {/* View Recipe Button */}
                  <Link
                    href={{
                      pathname: `/recipe/${recipe.slug}`,
                      query: {
                        title: recipe.name,
                        image: recipe.thumbnail_url,
                        slug: recipe.slug,
                      },
                    }}
                  >
                    <button className="text-white bg-green-400 p-4 rounded-md w-full uppercase hover:bg-sky-700">
                      View Recipe
                    </button>
                  </Link>
                </div>
                {/* score tag */}
                <div className={getDifficultyTagClass(recipe.difficulty)}>
                  <span>{getDifficultyTagLabel(recipe.difficulty)}</span>
                </div>
                {/* Add to favorites */}
                {favouritesData.filter(
                  (favourite) => favourite.recipe_id === recipe._id
                ).length > 0 ? (
                  // if true
                  <div>
                    <div className="absolute top-8 right-0 mt-4 mr-4 text-grey rounded-full pt-2 pb-1 pl-4 pr-5 text-xs uppercase bg-white">
                      <button onClick={() => onFavouriteClicked(recipe)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="red"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  // if false
                  <div>
                    <div className="absolute top-8 right-0 mt-4 mr-4 text-grey rounded-full pt-2 pb-1 pl-4 pr-5 text-xs uppercase bg-white">
                      <button onClick={() => onFavouriteClicked(recipe)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
