import { useRouter } from 'next/router';

const Recipe = () => {
  const router = useRouter();
  const { slug } = router.query;
  

  return (
    <div>
      <p>Post: {slug}</p>
      File to config: src/pages/recipe/[slug].jsx
    </div>
  );
};

export default Recipe;