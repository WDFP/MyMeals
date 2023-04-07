import { useRouter } from 'next/router';

const Recipe = () => {
  const router = useRouter();
  const { slug } = router.query;
  

  return (<p>Post: {slug}</p>);
};

export default Recipe;