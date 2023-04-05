import Image from "next/image";
import { useRouter } from "next/router";
import data from "../../ingredient_and_instructions.json";

function Recipe() {
  const router = useRouter();
  const { slug, title, image } = router.query;

  const ingredientData = data[slug]["ingredient_sections"];
  const instructionData = data[slug]["instructions"];
  console.log(ingredientData);

  return (
    <div>
      <h1 className='text-5xl pb-5'>{title}</h1>
      <div>
        <Image className='' src={image} alt={title} width={500} height={500} />
      </div>
      <h1 className='text-3xl pb-10'>Ingredients</h1>
      <div>
        {ingredientData.map((section) => (
          <div key={section.name}>
            <h1 className='text-3xl'>{section.name}</h1>
            <ul>
              {section.ingredients.map((ingredient) => (
                <li key={ingredient.name}>{ingredient.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h1 className='text-5xl pt-10'>Instructions</h1>
      <div>
        <ul className=''>
          {instructionData.map((instruction, index) => (
            <li key={index} className='pb-5'>
              {instruction.display_text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Recipe;
