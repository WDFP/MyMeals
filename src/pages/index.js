import Head from "next/head";

import Link from "next/link";

const CATEGORIES = [
  {
    href: "/recipe",
    title: "Omnivore",
    description: "You eat both Meat and Plant products",
  },
  {
    href: "/recipe",
    title: "Vegetarian",
    description: "You don't eat Meat or Fish",
  },
  {
    href: "/recipe",
    title: "Bbq",
    description: "You love the outdoor smoke",
  },
  {
    href: "/recipe",
    title: "Holiday",
    description: "You love the Advent Calendar Meal",
  },
  {
    href: "/recipe",
    title: "Low-carb",
    description: "You are on a Special Diet",
  },
  {
    href: "/recipe",
    title: "Mediterranean",
    description: "You eat loads of veggies, nuts and olive oil",
  },
  {
    href: "/recipe",
    title: "International",
    description: "You travel around the world in 90 days",
  },
  {
    href: "/recipe",
    title: "All Recipes",
    description: "Can't decide, Choose from All the Recipes",
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
        <div className="flex flex-col items-center space-between w-80">
          {CATEGORIES.map((i) => {
            return (
              <>
              <Link
                className="bg-blue-100 w-80 text-center py-3 rounded-lg text-2xl font-medium"
                href={i.href}
              >
                {i.title}
              </Link>
              <span className="bg-orange-100 text-center rounded-lg test-xl font-small">{i.description}</span>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
