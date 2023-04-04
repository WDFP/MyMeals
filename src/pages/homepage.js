import Link from 'next/link';

const LINKS = [{
  href: "/recipes-Omnivore",
  title: "Omnivore",
},
{
  href: "/recipes-Vegetarian",
  title: "Vegetarian",
},
{
  href: "/recipes-Vegan",
  title: "Vegan",
},
{
  href: "/recipes-Bbq",
  title: "Bbq",
},
{
  href: "/recipes-Holiday",
  title: "Holiday",
},
{
  href: "/recipes-Low-carb",
  title: "Low-carb",
},
{
  href: "/recipes-Mediterranean",
  title: "Mediterranean",
},
{
  href: "/recipes-International",
  title: "International",
}];

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Recipe HomePage</h1>
      <div className="flex flex-col items-center space-y-2 w-full">
        {LINKS.map( (i) => {
          return <Link className="bg-blue-100 w-full text-center py-4 rounded-lg text-xl font-medium" href={i.href}>
          {i.title}
       </Link>
        })}
      </div>
    </div>
  );
}

export default HomePage;