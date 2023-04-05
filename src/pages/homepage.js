import Link from 'next/link';

const LINKS = [{
  href: "/recipe",
  title: "Omnivore",
},
{
  href: "/recipe",
  title: "Vegetarian",
},
{
  href: "/recipe",
  title: "Vegan",
},
{
  href: "/recipe",
  title: "Bbq",
},
{
  href: "/recipe",
  title: "Holiday",
},
{
  href: "/recipe",
  title: "Low-carb",
},
{
  href: "/recipe",
  title: "Mediterranean",
},
{
  href: "/recipe",
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