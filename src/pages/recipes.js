/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Recipe from "@/components/recipe/recipe";
import NavBar from "@/components/navBar";
import { useSearchParams } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

export default function Recipes({setExtraRecipeData}) {


  const defaultFilters = {
    easy: false,
    medium: false,
    hard: false,
  };

  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const [favouritesData, setFavouritesData] = useState([]);
  const [recipesData, setRecipesData] = useState([]);
  const [filterText, setFilterText] = useState(
    search !== null && search !== undefined ? `${search}` : ""
  );
  const [filters, setFilters] = useState(defaultFilters);

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
        console.log("fetchFavourites: " + response.data);
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
        console.log("fetchFavourites: " + response.data);
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



  
  const filteredRecipes = recipesData
    .filter((recipe) => {
      // Check whether the recipe name or description includes the filter text
      const nameIncludesFilter = recipe.name
        .toLowerCase()
        .includes(filterText.toLowerCase());
      const descriptionIncludesFilter = recipe.description
        .toLowerCase()
        .includes(filterText.toLowerCase());
      const keywordsIncludesFilter = recipe.keywords
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
          isFavourited && (nameIncludesFilter || descriptionIncludesFilter || keywordsIncludesFilter)
        );
      } else {
        // If other filters are selected, show all recipes that match the name or description filter and the difficulty filters
        const matchesDifficulty =
          filters.easy || filters.medium || filters.hard
            ? matchesDifficultyFilter(recipe.difficulty)
            : true;
        return (
          nameIncludesFilter || descriptionIncludesFilter || keywordsIncludesFilter && matchesDifficulty
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

  

  // const handleFavouriteClick = () => {
  //   setIsFavourite(!isFavourite);
  //   setIsFavouriteIconFilled(!isFavouriteIconFilled);
  // };

  return (
    <div>
      <div className='mt-8 py-8 px-4 mx-auto max-w-screen-xl lg:py-16'>
        <NavBar />
        <h1 className='mb-4 text-4xl font-extrabold tracking-tight leading-none text-center text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-900'>
          {" "}
          Recipes{" "}
        </h1>
        {/* Filter dropdown */}
        <div className='space-y-2 p-4 sticky top-14 z-10 bg-gray-100 '>
          {/* Filter text */}
          <div className='mb-4'>
            <input
              className='border-solid border-2 border-gray-200 p-2 rounded-md w-full'
              type='text'
              placeholder='Filter by recipe name or description'
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <details className='overflow-hidden rounded border border-gray-300 bg-gray-200 [&_summary::-webkit-details-marker]:hidden'>
            <summary className='flex items-center justify-between gap-2 p-4 text-gray-900 transition cursor-pointer'>
              <span className='text-sm font-medium'> Additional Filters </span>
              <span className='text-sm text-gray-700'>
                {" "}
                {selectedCount} Selected
                {selectedCount > 0 ? (
                  <button
                    type='button'
                    className='text-xs text-gray-900 underline underline-offset-4 ml-2'
                    onClick={reset}
                    onChange={handleFilterCheckboxChanged}
                  >
                    Reset
                  </button>
                ) : (
                  ""
                )}
              </span>
              <span className='transition group-open:-rotate-180'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    stroke-linejoin='round'
                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                  />
                </svg>
              </span>
            </summary>
            <div className='bg-white border-t border-gray-200'>
              {" "}
              {/* section under the Difficulty header */}
              {/* Second section of the filter */}
              <ul className='p-4 space-y-1 border-t border-gray-200'>
                {/* Favourite filter */}
                <li>
                  <label
                    htmlFor='FilterFavourite'
                    className='inline-flex items-center gap-2'
                  >
                    <input
                      type='checkbox'
                      id='FilterFavourite'
                      className='w-5 h-5 border-gray-300 rounded'
                      name='favourite'
                      checked={filters.favourite}
                      onChange={handleFilterCheckboxChanged}
                    />
                    <span className='text-sm font-medium text-gray-700'>
                      {" "}
                      Favourite{" "}
                    </span>
                  </label>
                </li>
                {/* My Plan filter */}
                <li>
                  <label
                    for='FilterMealPlan'
                    className='inline-flex items-center gap-2'
                  >
                    <input
                      type='checkbox'
                      id='FilterMealPlan'
                      className='w-5 h-5 border-gray-300 rounded'
                      name='mealPlan'
                      checked={filters.mealPlan}
                      onChange={handleFilterCheckboxChanged}
                    />
                    <span className='text-sm font-medium text-gray-700'>
                      {" "}
                      In my plan (not implemented){" "}
                    </span>
                  </label>
                </li>
                {/* Owned filter */}
                <li>
                  <label
                    for='FilterCreated'
                    className='inline-flex items-center gap-2'
                  >
                    <input
                      type='checkbox'
                      id='FilterCreated'
                      className='w-5 h-5 border-gray-300 rounded'
                      name='created'
                      checked={filters.created}
                      onChange={handleFilterCheckboxChanged}
                    />
                    <span className='text-sm font-medium text-gray-700'>
                      {" "}
                      Owned by me (not implemented){" "}
                    </span>
                  </label>
                </li>
              </ul>
              <header className='flex items-center justify-between p-2 bg-gray-100 border-gray-100'>
                {/* Difficulty filter section */}
                <span className='text-sm text-gray-700 border-gray-100'>
                  {" "}
                  Difficulty{" "}
                </span>
              </header>
              <ul className='p-4 space-y-1 border-t border-gray-200'>
                {/* Easy filter */}
                <li>
                  <label
                    for='FilterEasy'
                    className='inline-flex items-center gap-2'
                  >
                    <input
                      type='checkbox'
                      id='FilterEasy'
                      className='w-5 h-5 border-gray-300 rounded'
                      name='easy'
                      checked={filters.easy}
                      onChange={handleFilterCheckboxChanged}
                    />

                    <span className='text-sm font-medium text-gray-700'>
                      {" "}
                      Easy{" "}
                    </span>
                  </label>
                </li>
                {/* Medium filter */}
                <li>
                  <label
                    for='FilterMedium'
                    className='inline-flex items-center gap-2'
                  >
                    <input
                      type='checkbox'
                      id='FilterMedium'
                      className='w-5 h-5 border-gray-300 rounded'
                      name='medium'
                      checked={filters.medium}
                      onChange={handleFilterCheckboxChanged}
                    />
                    <span className='text-sm font-medium text-gray-700'>
                      {" "}
                      Medium{" "}
                    </span>
                  </label>
                </li>
                {/* Hard filter */}
                <li>
                  <label
                    for='FilterHard'
                    className='inline-flex items-center gap-2'
                  >
                    <input
                      type='checkbox'
                      id='FilterHard'
                      className='w-5 h-5 border-gray-300 rounded'
                      name='hard'
                      checked={filters.hard}
                      onChange={handleFilterCheckboxChanged}
                    />
                    <span className='text-sm font-medium text-gray-700'>
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
        <div className='container mx-auto p-4'>
          {/* <!-- recipe card --> */}
          <div className='grid gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 mb-16'>
            {filteredRecipes.map((recipe) => (
              <Recipe key={recipe.id} recipe={recipe} favouritesData={favouritesData} recipesData={recipesData}
                setFavouritesData={setFavouritesData} setExtraRecipeData={setExtraRecipeData} />
            ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
