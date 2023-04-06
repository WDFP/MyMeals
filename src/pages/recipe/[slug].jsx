import Image from "next/image";
import { useRouter } from "next/router";
import data from "../../ingredient_and_instructions.json";

function Recipe() {
  const router = useRouter();
  const { slug, title, image } = router.query;

  const ingredientData = data[slug]["ingredient_sections"];
  const instructionData = data[slug]["instructions"];
  console.log(data[slug]);

  return (
    <div>
      <h1 className='text-5xl pb-5'>{title}</h1>
      <div className='absolute right-1/4'>
        <Image className='' src={image} alt={title} width={400} height={500} />
      </div>
      <h1 className='text-3xl pb-10 pl-4'>Ingredients</h1>
      <div>
        {ingredientData.map((section) => (
          <div key={section.name} className='p-4'>
            <h1 className='text-3xl pb-5 w-1/3'>{section.name}</h1>
            <div>
              <div class='relative overflow-x-auto'>
                <table class='w-1/3 text-sm text-left text-gray-500 dark:text-gray-400'>
                  <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
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
                        class='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
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
      <h1 className='text-5xl pt-10 pl-4'>Instructions</h1>
      <div>
        <ul className=''>
          {instructionData.map((instruction, index) => (
            <li key={index} className='p-4'>
              {instruction.display_text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Recipe;
