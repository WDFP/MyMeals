/* eslint-disable func-style */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clientPromise from "@/lib/mongodb";
const { MONGODB_DB } = process.env;

const recipeTitle = "text-2xl text-green-400";
const viewRecipeButton =
  "text-white bg-green-400 p-4 rounded-md w-full uppercase hover:bg-sky-700";
const viewRecipeLabel = "View Recipe";

export default function Recipes({ recipes }) {
  const defaultFilters = {
    easy: false,
    medium: false,
    hard: false
  };

  const [filterText, setFilterText] = useState("");
  const [filters, setFilters] = useState(defaultFilters);

  const filteredRecipes = recipes
    .filter((recipe) =>
      recipe.name.toLowerCase().includes(filterText.toLowerCase())
    )
    .filter((recipe) => {
      if (filters.easy && recipe.difficulty === 1) return true;
      if (filters.medium && recipe.difficulty === 2) return true;
      if (filters.hard && recipe.difficulty === 3) return true;
      return !filters.easy && !filters.medium && !filters.hard;
    });

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

  const checkIfRecipeIsFavorited = (recipeId) => {
    if (recipeId) {
      return "M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z";
    } else {
      return "M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z";
    }
  };

  const onFilterClicked = (e) => {
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
        
        <div class="space-y-2 p-4 sticky top-0 z-10 bg-gray-100">
          {/* Filter dropdown */}
          {/* Filter text */}
          <div className="mb-4">
            <input
              className="border-solid border-2 border-gray-200 p-2 rounded-md w-full"
              type="text"
              placeholder="Filter by recipe name"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            /></div>
          <details
            class="overflow-hidden rounded border border-gray-300 bg-gray-200 [&_summary::-webkit-details-marker]:hidden">
            <summary
              class="flex items-center justify-between gap-2 p-4 text-gray-900 transition cursor-pointer">
                
              <span class="text-sm font-medium"> Additional Filters </span>
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
                <span class="text-sm text-gray-700"> 0 Selected </span>
                <button
                  type="button"
                  class="text-sm text-gray-900 underline underline-offset-4"
                  onClick={reset}
                  onChange={onFilterClicked}>
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
                      onChange={onFilterClicked}/>

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
                      onChange={onFilterClicked}/>
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
                      onChange={onFilterClicked}/>
                    <span class="text-sm font-medium text-gray-700"> Hard </span>
                  </label>
                </li>
              </ul>
              {/* Second section of the filter */}
              <header class="flex items-center justify-between p-2 bg-gray-100 border-gray-100">
                <span class="text-sm text-gray-700 border-gray-100"> Saved </span>
                <span class="text-sm text-gray-700 border-gray-100"> 0 Selected </span>
                <button
                  type="button"
                  class="text-sm text-gray-900 underline underline-offset-4"
                  onClick={reset}
                  onChange={onFilterClicked}>
                  Reset
                </button>
              </header>
              <ul class="p-4 space-y-1 border-t border-gray-200">
                {/* Favourite filter */}
                <li>
                  <label for="FilterEasy" class="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="FilterEasy"
                      class="w-5 h-5 border-gray-300 rounded"
                      name="easy"
                      checked={filters.easy}
                      onChange={onFilterClicked}/>

                    <span class="text-sm font-medium text-gray-700"> Favourite </span>
                  </label>
                </li>
                {/* My Plan filter */}
                <li>
                  <label for="FilterMedium" class="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="FilterMedium"
                      class="w-5 h-5 border-gray-300 rounded"
                      name="medium"
                      checked={filters.medium}
                      onChange={onFilterClicked}/>
                    <span class="text-sm font-medium text-gray-700">  In my plan  </span>
                  </label>
                </li>
                {/* Owned filter */}
                <li>
                  <label for="FilterHard" class="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="FilterHard"
                      class="w-5 h-5 border-gray-300 rounded"
                      name="hard"
                      checked={filters.hard}
                      onChange={onFilterClicked}/>
                    <span class="text-sm font-medium text-gray-700"> Owned by me </span>
                  </label>
                </li>
              </ul>
            </div>
          </details>
        </div>
        <div className="container mx-auto p-4">

          {/* <!-- recipe card grid--> */}
          <div className="grid gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 mb-16 z-0">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="flex flex-col justify-between bg-white rounded-md overflow-hidden relative shadow-md"
              >
                <div>
                  {/* recipe image */}
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
                  <h2 className={"line-clamp-1 " + recipeTitle} title={recipe.name}>
                    {recipe.name}
                  </h2>
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
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {/* cook time */}
                      <span className="ml-1 lg:text-xl">{recipe.cook_time}</span>
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
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {/* Number of score */}
                      <span className="ml-1 lg:text-xl">{recipe.score}</span>
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
                    <button className={viewRecipeButton}>{viewRecipeLabel}</button>
                  </Link>
                </div>
                {/* Difficulty tag */}
                <div className={getDifficultyTagClass(recipe.difficulty)}>
                  <span>{getDifficultyTagLabel(recipe.difficulty)}</span>
                </div>
                {/* Add to favorites */}
                <div className="absolute top-8 right-0 mt-4 mr-4 text-grey rounded-full pt-2 pb-1 pl-4 pr-5 text-xs uppercase bg-white">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    

                  </button>
                </div>
                {/* Add to bookmarks */}
                <div className="absolute top-20 right-0 mt-4 mr-4 text-grey rounded-full pt-2 pb-1 pl-4 pr-5 text-xs uppercase bg-white">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// How do I paginate my data with getStaticProps?
export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db(MONGODB_DB);
    const recipes = await db
      .collection("recipes")
      .find({})
      // .limit()
      .toArray();
    return {
      props: { recipes: JSON.parse(JSON.stringify(recipes)) },
    };
  } catch (e) {
    console.error(e);
  }
}