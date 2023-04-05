/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import dataDishes from "../data_dishes.json";

// import ingredientsAndSteps from "../ingredients_and_steps.json";

const recipeTitle = "text-2xl text-green-400";
const viewRecipeButton =
  "text-white bg-green-400 p-4 rounded-md w-full uppercase hover:bg-sky-700";
const viewRecipeLabel = "View Recipe";

export default function recipe() {
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

  return (
    <div>
      <div className='container mx-auto p-4'>
        {/* <!-- recipe card grid--> */}
        <div className='grid gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 mb-16'>
          {dataDishes.map((recipe, index) => (
            <div
              key={index}
              className='flex flex-col justify-between bg-white rounded-md overflow-hidden relative shadow-md'
            >
              <div>
                {/* recipe image */}
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
                  View Recipe
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
  );
}
