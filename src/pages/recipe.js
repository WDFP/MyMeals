import Image from "next/image";
import test_picture from "../images/test_food.jpeg";
import MOCK_DATA from "../MOCK_DATA.json";

const recipeTitle = "text-2xl text-green-400";
const viewRecipeButton =
  "text-white bg-green-400 p-4 rounded-md w-full uppercase hover:bg-sky-700";
const viewRecipeLabel = "View Recipe";

export default function recipe(props) {
  const getDifficultyTagClass = (difficulty) => {
    switch (difficulty) {
      case 1:
        return "absolute top-0 right-0 mt-4 mr-4 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase bg-green-400";
      case 2:
        return "absolute top-0 right-0 mt-4 mr-4 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase bg-yellow-400";
      case 3:
        return "absolute top-0 right-0 mt-4 mr-4 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase bg-red-400";
      default:
        return "absolute top-0 right-0 mt-4 mr-4 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase bg-gray-400";
    }
  };

  const getDifficultyLevel = (difficulty) => {
    switch (difficulty) {
      case 1:
        return "Easy";
      case 2:
        return "Medium";
      case 3:
        return "Hard";
      default:
        return "Unknown";
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        {/* <!-- recipe card grid--> */}
        <div className="grid gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {MOCK_DATA.map((recipe) => (
            <div className="flex flex-col justify-between bg-white rounded-md overflow-hidden relative shadow-md">
              <div>
                <Image
                  className="w-full"
                  src={test_picture}
                  alt={recipe.title}
                />
              </div>
              <div className="p-4">
                <h2 className={"line-clamp-1 " + recipeTitle} title={recipe.title}>{recipe.title}</h2>
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="ml-1 lg:text-xl">{recipe.cookTime}</span>
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
                    <span className="ml-1 lg:text-xl">{recipe.servings}</span>
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
                    <span className="ml-1 lg:text-xl">
                      {recipe.numberOfSteps}
                    </span>
                  </div>
                </div>
                <p className="mb-3 mt-3 text-gray-500 h-4.5 line-clamp-3" title={recipe.description}>{recipe.description}</p>
                <button className={viewRecipeButton}>{viewRecipeLabel}</button>
              </div>
              <div className={getDifficultyTagClass(recipe.difficulty)}>
                <span>{getDifficultyLevel(recipe.difficulty)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
