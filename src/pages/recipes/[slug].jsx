import IngredientRow from "@/components/IngredientRow";
import NavBar from "@/components/navBar";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import StarOutline from "../../images/star-outline.svg";
import data from "../../ingredient_and_instructions.json";

function Recipe({ extraRecipeData, setExtraRecipeData }) {
  const router = useRouter();
  const { slug, title, image } = router.query;

  const [isOpen, setIsOpen] = useState(false);
  // const [buttonText, setButtonText] = useState("Add to Groceries");

  if (!data || !router.query || !data[router.query.slug]) {
    return;
  }

  const link = router.asPath;

  const handleButtonClick = async (event) => {
    const day = event.target.textContent;

    // Data to send in the request body
    const dayToUpdate = day; // Update with the appropriate day
    const mealToAdd = { title, slug, image, link }; // Update with the appropriate meal object

    try {
      // Send POST request to API endpoint with data
      const response = await fetch("/api/meal_plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dayToUpdate, mealToAdd }),
      });

      // Check response status
      if (response.ok) {
        // Request successful
        console.log("Meal added successfully");
      } else {
        // Request failed
        console.error("Failed to add meal");
      }
    } catch (error) {
      // Handle any error that occurs
      console.error(error);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const ingredientData = data[slug]["ingredient_sections"];
  const instructionData = data[slug]["instructions"];

  return (
    <div>
      <NavBar />
      <div className='px-6 pb-10 bg-zinc-800' onClick={closeDropdown}>
        <div className='grid grid-cols-2 h-[75vh] border-b-2 border-zinc-500 mb-20'>
          <div className='flex flex-col justify-center items-center text-white'>
            <h1 className='text-5xl pb-2 mb-5 text-white pt-5 border-b-2 border-zinc-500 font-serif font-semibold'>
              {title}
            </h1>
            <h2 className='mb-4'>{extraRecipeData.rating}/100</h2>
            <h3 className='mb-4'>{extraRecipeData.time} minutes</h3>
            <p className='mb-4 px-10 text-center'>{extraRecipeData.summary}</p>
            <div className='flex relative'>
              <button
                type='button'
                className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-800 shadow-lg shadow-purple-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2'
                onClick={toggleDropdown}
              >
                Add to Meal Plan
              </button>
              {isOpen && (
                <div className='absolute w-40 top-14 left-14 bg-white shadow-md rounded-md z-10'>
                  {/* Dropdown items */}
                  <ul className='py-2 text-black'>
                    <button
                      onClick={handleButtonClick}
                      className='px-4 py-2 hover:bg-gray-200 w-full'
                    >
                      <li>Monday</li>
                    </button>
                    <button
                      onClick={handleButtonClick}
                      className='px-4 py-2 hover:bg-gray-200 w-full'
                    >
                      <li>Tuesday</li>
                    </button>
                    <button
                      onClick={handleButtonClick}
                      className='px-4 py-2 hover:bg-gray-200 w-full'
                    >
                      <li>Wednesday</li>
                    </button>
                    <button
                      onClick={handleButtonClick}
                      className='px-4 py-2 hover:bg-gray-200 w-full'
                    >
                      <li>Thursday</li>
                    </button>
                    <button
                      onClick={handleButtonClick}
                      className='px-4 py-2 hover:bg-gray-200 w-full'
                    >
                      <li>Friday</li>
                    </button>
                    <button
                      onClick={handleButtonClick}
                      className='px-4 py-2 hover:bg-gray-200 w-full'
                    >
                      <li>Saturday</li>
                    </button>
                    <button
                      onClick={handleButtonClick}
                      className='px-4 py-2 hover:bg-gray-200 w-full'
                    >
                      <li>Sunday</li>
                    </button>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className='flex justify-center items-center'>
            <div className='relative w-full h-full'>
              <Image className='' src={image} alt={title} fill />
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='w-1/3'>
            <h1 className='text-5xl pb-4 text-white'>Ingredients</h1>
            {ingredientData.map((section) => (
              <div key={section.name} className='pb-4'>
                <h1 className='text-3xl pb-5 w-1/3 text-white'>
                  {section.name}
                </h1>
                <div className=''>
                  <div className=' overflow-x-auto'>
                    <table className='w-full text-sm text-left text-gray-400'>
                      <thead className='text-xs uppercase bg-zinc-700 text-gray-400'>
                        <tr>
                          <th scope='col' className='px-6 py-3'>
                            Ingredient
                          </th>
                          <th scope='col' className='px-2 py-3'>
                            Quantity
                          </th>
                          <th scope='col' className='px-2 py-3'>
                            Unit
                          </th>
                          <th scope='col' className='px-2 py-3 text-center'>
                            Add Grocery
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.ingredients.map((ingredient) => {
                          return (
                            <IngredientRow
                              ingredient={ingredient}
                              key={ingredient.name}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='w-[60%] '>
            <h1 className='text-5xl text-white mb-6'>Instructions</h1>
            <div className='text-white bg-zinc-900 px-16 rounded-md py-4'>
              <ol className=''>
                {instructionData.map((instruction, index) => (
                  <li type='1' key={index} className='py-4'>
                    {instruction.display_text}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
