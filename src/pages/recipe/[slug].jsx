import Image from "next/image";
import { useRouter } from "next/router";
import data from "../../ingredient_and_instructions.json";

import StarOutline from "../../images/star-outline.svg";

function Recipe() {
  const router = useRouter();
  const { slug, title, image } = router.query;

  const ingredientData = data[slug]["ingredient_sections"];
  const instructionData = data[slug]["instructions"];
  console.log(data[slug]);

  return (
    <div className='px-6 pb-10 bg-zinc-800'>
      <div className='grid grid-cols-2 h-[75vh] border-b-2 border-zinc-500 mb-20'>
        <div className='flex flex-col justify-center items-center text-white'>
          <h1 className='text-5xl pb-2 mb-5 text-white pt-5 border-b-2 border-zinc-500 font-serif font-semibold'>
            {title}
          </h1>
          <h2 className='mb-4'>Rating</h2>
          <h3 className='mb-4'>13 minutes</h3>
          <p className='mb-4'>Summary text here</p>
          <div className='flex'>
            <button
              type='button'
              class='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-800 shadow-lg shadow-purple-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2'
            >
              <Image src={StarOutline} alt='svg' width={24} height={24} />
            </button>
            <button
              type='button'
              class='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-800 shadow-lg shadow-purple-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2'
            >
              Add to Meal Plan
            </button>
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
              <h1 className='text-3xl pb-5 w-1/3 text-white'>{section.name}</h1>
              <div className=''>
                <div class=' overflow-x-auto'>
                  <table class='w-full text-sm text-left text-gray-400'>
                    <thead class='text-xs uppercase bg-zinc-700 text-gray-400'>
                      <tr>
                        <th scope='col' class='px-6 py-3'>
                          Ingredient
                        </th>
                        <th scope='col' class='px-2 py-3'>
                          Quantity
                        </th>
                        <th scope='col' class='px-2 py-3'>
                          Unit
                        </th>
                        <th scope='col' class='px-2 py-3'>
                          Extra
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.ingredients.map((ingredient) => (
                        <tr
                          class='bg-zinc-900 border-b dark:border-gray-700'
                          key={ingredient.name}
                        >
                          <th
                            scope='row'
                            class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                          >
                            {ingredient.name}
                          </th>
                          <td class='px-2 py-4'>
                            {ingredient.primary_unit.quantity}
                          </td>
                          <td class='px-2 py-4'>
                            {ingredient.primary_unit.display}
                          </td>
                          <td class='px-2 py-4'>extra comment</td>
                        </tr>
                      ))}
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
  );
}

export default Recipe;