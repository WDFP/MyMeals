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
      if (filters.easy && recipe.score > 60) return true;
      if (filters.medium && recipe.score <= 60 && recipe.score > 30) return true;
      if (filters.hard && recipe.score <= 30) return true;
      return !filters.easy && !filters.medium && !filters.hard;
    });

  const getScoreTagClass = (score) => {
    if (score > 60) {
      return "absolute top-0 right-0 mt-4 mr-4 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase bg-green-400";
    } else if (score > 30 && score <= 60) {
      return "absolute top-0 right-0 mt-4 mr-4 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase bg-yellow-400";
    } else if (score <= 30) {
      return "absolute top-0 right-0 mt-4 mr-4 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase bg-red-400";
    } else {
      return "absolute top-0 right-0 mt-4 mr-4 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase bg-gray-400";
    }
  };

  const getScoreTagLabel = (score) => {
    if (score > 60) {
      return "Easy";
    } else if (score > 30 && score <= 60) {
      return "Medium";
    } else if (score <= 30) {
      return "Hard";
    } else {
      return "Unknown";
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
                <span class="text-sm text-gray-700 border-gray-100"> Difficulty </span>
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
            </div>
          </details>
        </div>
        <div className="container mx-auto p-4">
          {/* filter input */}
          {/* <div className="mb-4">
          <input
            className="border-solid border-2 border-gray-200 p-2 rounded-md w-full"
            type="text"
            placeholder="Filter by recipe name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <div class="flex">
            <ul class="items-center w-full text-sm font-medium text-gray-900 rounded-lg sm:flex">
              <li class="w-full ">
                <div class="flex items-center pl-3">
                  <input id="vue-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded focus:ring-blue-500"
                    name="easy"
                    checked={filters.easy}
                    onChange={onFilterClicked}
                  />
                  <label for="vue-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900">Easy</label>
                </div>
              </li>
              <li class="w-full  ">
                <div class="flex items-center pl-3">
                  <input id="react-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded focus:ring-blue-500"
                    name="medium"
                    checked={filters.medium}
                    onChange={onFilterClicked}
                  />
                  <label for="react-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900">Medium</label>
                </div>
              </li>
              <li class="w-full">
                <div class="flex items-center pl-3">
                  <input id="angular-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded focus:ring-blue-500"
                    name="hard"
                    checked={filters.hard}
                    onChange={onFilterClicked}
                  />
                  <label for="angular-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900">Hard</label>
                </div>
              </li>
            </ul>
          </div>
        </div> */}

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
                    <button className={viewRecipeButton}>{viewRecipeLabel}</button>
                  </Link>
                </div>
                {/* score tag */}
                <div className={getScoreTagClass(recipe.score)}>
                  <span>{getScoreTagLabel(recipe.score)}</span>
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