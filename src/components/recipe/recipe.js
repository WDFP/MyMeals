import Image from "next/image";
import React, { useState, useEffect} from "react";
import Link from "next/link";
import HeartIcon from "@/components/icons/HeartIcon";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "@/components/modal";
import { useSession } from "next-auth/react";


export default function Recipe({
  setExtraRecipeData,
  recipe,
  favouritesData,
  setFavouritesData
}) {

  const { data: session } = useSession();

  const recipeTitle = "text-2xl text-green-400";

  const [isFavourite, setIsFavourite] = useState(() => {
    return favouritesData.filter(
      (favourite) => favourite.recipe_id === recipe._id
    ).length > 0 ? true : false;
  });


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

  const onFavouriteClicked = async(recipe, isCurrentlyFavourited) => {
    try {
      const foundFavourite = favouritesData.find(
        (favourite) => favourite.recipe_id === recipe._id
      );

      if (isCurrentlyFavourited) {
        await axios
          .delete("/api/favourites", {
            data: { _id: foundFavourite._id },
          });
        console.log("Removing " + recipe._id + " from favourites");
        toast.error("Removing " + recipe.name + " from favourites");
      } else {
        await axios
          .post("/api/favourites", {
            user_id: session.user.email,
            recipe_id: recipe._id,
          });
        console.log("Adding " + recipe._id + " to favourites");
        toast.success("Adding " + recipe.name + " to favourites");
      }

      const { data: newFavouritesData } = await axios.get("/api/favourites");
      setFavouritesData(newFavouritesData);
      setIsFavourite(!isCurrentlyFavourited);

    } catch (error) {
      console.log(error);
    }
  };
  
  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div
      key={recipe._id}
      className='flex flex-col justify-between bg-white rounded-md overflow-hidden relative shadow-md'
    >
      {/* recipe image */}
      <div>
        <Modal recipe={recipe} setExtraRecipeData={setExtraRecipeData} />
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
                strokeLinecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span className='ml-1 lg:text-xl'>
              {recipe.cook_time}
            </span>
          </div>
          {/* servings */}
          <div className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
            </svg>
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
            pathname: `/recipes/${recipe.slug}`,
            query: {
              title: recipe.name,
              image: recipe.thumbnail_url,
              slug: recipe.slug,
            },
          }}
        >
          <button
            className='text-white bg-green-400 p-4 rounded-md w-full uppercase hover:bg-sky-700'
            onClick={() => {
              setExtraRecipeData({
                summary: recipe.description,
                rating: recipe.score,
                time: recipe.total_time,
              });
            }}
          >
           View Recipe
          </button>
        </Link>
      </div>
      {/* score tag */}
      <div className={getDifficultyTagClass(recipe.difficulty)}>
        <span>{getDifficultyTagLabel(recipe.difficulty)}</span>
      </div>
      {/* Add to favorites */}
      <div>
        <div className='absolute top-8 right-0 mt-4 mr-4 text-grey rounded-full pt-2 pb-1 pl-4 pr-5 text-xs uppercase bg-white'>
          <button onClick={() => {
            const isCurrentlyFavourited = isFavourite;
            setIsFavourite(!isFavourite);
            onFavouriteClicked(recipe, isCurrentlyFavourited);
          }}>
            <HeartIcon filled={isFavourite} />
          </button>
        </div>
      </div>
    </div>
  );
}
