/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const recipeTitle = "text-2xl text-green-400";
const viewRecipeButton =
  "text-white bg-green-400 p-4 rounded-md w-full uppercase hover:bg-sky-700";
const viewRecipeLabel = "View Recipe";

export default function RecipesRefactored() {

  const defaultFilters = {
    easy: false,
    medium: false,
    hard: false
  };

  const [filterText, setFilterText] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [favouritesData, setFavouritesData] = useState([]);
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [recipesData, setRecipesData] = useState([]);
  
  const selectedCount = Object.values(filters).filter(value => value).length;

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

  useEffect(() => {
    const favouriteRecipeIds = favouritesData.map(favourite => favourite.recipe_id);
    const filteredFavourites = recipesData.filter(recipe => favouriteRecipeIds.includes(recipe._id));
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


  const filteredRecipes = recipesData.filter(recipe => {
    const nameIncludesFilter = recipe.name.toLowerCase().includes(filterText.toLowerCase());
    const descriptionIncludesFilter = recipe.description.toLowerCase().includes(filterText.toLowerCase());
    const isFavourited = favouritesData.some(favourite => favourite.recipe_id === recipe._id);
    
    if (filters.favourite) {
      if (filters.easy) {
        return isFavourited && recipe.difficulty === 1 && (nameIncludesFilter || descriptionIncludesFilter);
      } else if (filters.medium) {
        return isFavourited && recipe.difficulty === 2 && (nameIncludesFilter || descriptionIncludesFilter);
      } else if (filters.hard) {
        return isFavourited && recipe.difficulty === 3 && (nameIncludesFilter || descriptionIncludesFilter);
      } else {
        return isFavourited && (nameIncludesFilter || descriptionIncludesFilter);
      }
    } else {
      const difficultyFilter = filters.easy && filters.medium && filters.hard ? true :
        filters.easy && recipe.difficulty === 1 ||
        filters.medium && recipe.difficulty === 2 ||
        filters.hard && recipe.difficulty === 3;
  
      return nameIncludesFilter || descriptionIncludesFilter || difficultyFilter;

    }
  });

  const handleFilterCheckboxChanged = (e) => {
    const target = e.target;
    const value = target.name;
    const checked = target.checked;

    setFilters((previousFilters) => {
      return {
        ...previousFilters,
        [value]: checked,
      };
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

  return (
    <div>
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-center text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-900"> Recipes </h1>
        {/* Filter dropdown */}
        <div class="space-y-2 p-4 sticky top-0 z-10 bg-gray-100">
          {/* Filter text */}
          <div className="mb-4">
            <input
              className="border-solid border-2 border-gray-200 p-2 rounded-md w-full"
              type="text"
              placeholder="Filter by recipe name or description"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            /></div>
          <details
            class="overflow-hidden rounded border border-gray-300 bg-gray-200 [&_summary::-webkit-details-marker]:hidden">
            <summary
              class="flex items-center justify-between gap-2 p-4 text-gray-900 transition cursor-pointer">
                
              <span class="text-sm font-medium"> Additional Filters </span>
              <span class="text-sm text-gray-700"> {selectedCount} Selected </span>
              <span class="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                </svg>
              </span>
            </summary>
            <div class="bg-white border-t border-gray-200"> {/* section under the Difficulty header */}
              <header class="flex items-center justify-between p-2 bg-gray-100 border-gray-100">
                <span class="text-sm text-gray-700 border-gray-100"> Difficulty </span>
                <button
                  type="button"
                  class="text-sm text-gray-900 underline underline-offset-4"
                  onClick={reset}
                  onChange={handleFilterCheckboxChanged}>
                  Reset
                </button>
              </header>
              <ul class="p-4 space-y-1 border-t border-gray-200">
                {/* Easy filter */}
                <li>
                  <label for="FilterEasy" class="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="FilterEasy"
                      class="w-5 h-5 border-gray-300 rounded"
                      name="easy"
                      checked={filters.easy}
                      onChange={handleFilterCheckboxChanged}/>

                    <span class="text-sm font-medium text-gray-700"> Easy </span>
                  </label>
                </li>
                {/* Medium filter */}
                <li>
                  <label for="FilterMedium" class="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="FilterMedium"
                      class="w-5 h-5 border-gray-300 rounded"
                      name="medium"
                      checked={filters.medium}
                      onChange={handleFilterCheckboxChanged}/>
                    <span class="text-sm font-medium text-gray-700">  Medium  </span>
                  </label>
                </li>
                {/* Hard filter */}
                <li>
                  <label for="FilterHard" class="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="FilterHard"
                      class="w-5 h-5 border-gray-300 rounded"
                      name="hard"
                      checked={filters.hard}
                      onChange={handleFilterCheckboxChanged}/>
                    <span class="text-sm font-medium text-gray-700"> Hard </span>
                  </label>
                </li>
              </ul>
              {/* Second section of the filter */}
              <header class="flex items-center justify-between p-2 bg-gray-100 border-gray-100">
                <span class="text-sm text-gray-700 border-gray-100"> Saved </span>
                <button
                  type="button"
                  class="text-sm text-gray-900 underline underline-offset-4"
                  onClick={reset}
                  onChange={handleFilterCheckboxChanged}>
                  Reset
                </button>
              </header>
              <ul class="p-4 space-y-1 border-t border-gray-200">
                {/* Favourite filter */}
                <li>
                  <label htmlFor="FilterFavourite" className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="FilterFavourite"
                      className="w-5 h-5 border-gray-300 rounded"
                      name="favourite"
                      checked={filters.favourite}
                      onChange={handleFilterCheckboxChanged}
                    />
                    <span className="text-sm font-medium text-gray-700"> Favourite </span>
                  </label>
                </li>
                {/* My Plan filter */}
                <li>
                  <label for="FilterMealPlan" class="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="FilterMealPlan"
                      class="w-5 h-5 border-gray-300 rounded"
                      name="mealPlan"
                      checked={filters.mealPlan}
                      onChange={handleFilterCheckboxChanged}/>
                    <span class="text-sm font-medium text-gray-700">  In my plan (not implemented)  </span>
                  </label>
                </li>
                {/* Owned filter */}
                <li>
                  <label for="FilterCreated" class="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="FilterCreated"
                      class="w-5 h-5 border-gray-300 rounded"
                      name="created"
                      checked={filters.created}
                      onChange={handleFilterCheckboxChanged}/>
                    <span class="text-sm font-medium text-gray-700"> Owned by me (not implemented) </span>
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
              <div
                key={recipe._id}
                className='flex flex-col justify-between bg-white rounded-md overflow-hidden relative shadow-md'
              >
                {/* recipe image */}
                <div>
                  <Image
                    className='w-full'
                    src={recipe.thumbnail_url}
                    alt={recipe.name}
                    width={500}
                    height={500}
                  />
                </div>
                
                <div className='p-4'>
                  {/* recipe title */}
                  <h2
                    className={"line-clamp-1 " + recipeTitle}
                    title={recipe.name}
                  >
                    {recipe.name}
                  </h2>
                  {/* cook time */}
                  <div className='flex justify-between mt-4 mb-4 text-gray-500'>
                    <div className='flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                      {/* cook time */}
                      <span className='ml-1 lg:text-xl'>{recipe.cook_time}</span>
                    </div>
                    <div className='flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' />
                        <path
                          fill-rule='evenodd'
                          d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
                          clip-rule='evenodd'
                        />
                      </svg>
                      {/* Number of steps */}
                      <span className='ml-1 lg:text-xl'>#</span>
                    </div>
                    <div className='flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
                      </svg>
                      {/* servings */}
                      <span className='ml-1 lg:text-xl'>{recipe.servings}</span>
                    </div>
                  </div>
                  {/* description */}
                  <p
                    className='mb-3 mt-3 text-gray-500 h-4.5 line-clamp-3'
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
                    <button className='text-white bg-green-400 p-4 rounded-md w-full uppercase hover:bg-sky-700'>
                    View Recipe
                    </button>
                  </Link>
                </div>
                {/* score tag */}
                <div className={getDifficultyTagClass(recipe.difficulty)}>
                  <span>{getDifficultyTagLabel(recipe.difficulty)}</span>
                </div>
                {/* Add to favorites */}
                {favouritesData.filter(favourite =>
                  favourite.recipe_id === recipe._id).length > 0 ?
                // if true
                  <div>
                    <div className="absolute top-8 right-0 mt-4 mr-4 text-grey rounded-full pt-2 pb-1 pl-4 pr-5 text-xs uppercase bg-white">
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  :
                // if false
                  <div>
                    <div className="absolute top-8 right-0 mt-4 mr-4 text-grey rounded-full pt-2 pb-1 pl-4 pr-5 text-xs uppercase bg-white">
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
