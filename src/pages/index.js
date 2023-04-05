import Head from "next/head";

import Link from "next/link";

const CATEGORIES = [
  {
    href: "/recipe",
    title: "Omnivore",
    description: "'You eat both Meat and Plant products'",
    img: "./Omnivore.jpeg",
  },
  {
    href: "/recipe",
    title: "Vegetarian",
    description: "'You don't eat Meat or Fish'",
    img: "./Vegetarian.jpeg",
  },
  {
    href: "/recipe",
    title: "Bbq",
    description: "'You love the outdoor smoke'",
    img: "./BBQ.jpeg",
  },
  {
    href: "/recipe",
    title: "Holiday",
    description: "'You love the Advent Calendar Meal'",
    img: "./HolidayMeal.jpeg",
  },
  {
    href: "/recipe",
    title: "Low-carb",
    description: "'You are on a Special Diet'",
    img: "./Low-carb.jpeg",
  },
  {
    href: "/recipe",
    title: "Mediterranean",
    description: "'You eat loads of veggies, nuts and olive oil'",
    img: "./Meditteranean.jpeg",
  },
  {
    href: "/recipe",
    title: "International",
    description: "'You travel around the world in 90 days'",
    img: "./International.jpeg",
  },
  {
    href: "/recipe",
    title: "All Recipes",
    description: "'Can't decide, Choose from All the Recipes'",
    img: "./AllRecipes.jpeg",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>MyMeals HomePage</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to the MyMeals HomePage
        </h1>
        <div className="flex flex-col items-center w-full">
          {CATEGORIES.map((i) => {
            return (
              <div className="flex w-full items-center justify-center">
                <Link
                  className="bg-blue-100 w-80 text-center py-6 rounded-lg text-2xl font-medium"
                  href={i.href}
                >
                  {i.title}
                </Link>
                <img src={i.img} className="w-20 h-20" />
                <div className="bg-orange-100 w-80 text-center py-6 rounded-lg test-xl font-small">
                  {i.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
