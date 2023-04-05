import Head from "next/head";

import Link from "next/link";

import Popup from "reactjs-popup";

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
        <div>
          <h1 className="flex text-3xl font-bold mb-4 justify-evenly flex-row">
            Welcome to the MyMeals HomePage
          </h1>
          <form class="flex flex-row justify-evenly">
            <input
              class="py-4 text-2xl border-gray-300 rounded-l-md w-3/4 bg-gray-100"
              type="text"
              placeholder="Search..."
            />
            <button
              class="py-4  bg-green-400 text-white rounded-3xl w-1/4 border border-gray-300 hover:bg-blue-500"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center w-full">
          {CATEGORIES.map((i) => {
            return (
              <div className="flex w-full items-center justify-center">
                <Link
                  className="bg-green-400 text-white w-80 text-center py-6 rounded-3xl text-2xl font-medium border-solid hover:border-dotted border-black border-2"
                  href={i.href}
                >
                  {i.title}
                </Link>
                <Popup
                  trigger={
                    <img
                      src={i.img}
                      className="w-20 h-20 rounded-3xl border-solid hover:border-dotted border-black border-2"
                    />
                  }
                  position="right center"
                >
                  <img
                    src={i.img}
                    className="w-60 h-60 rounded-3xl border-solid border-black border-2"
                  />
                </Popup>
                {/* <Link href={i.href}>
                  <img
                    src={i.img}
                    className="w-20 h-20 rounded-3xl border-solid hover:border-dotted border-black border-2"
                  />
                </Link> */}
                <div className="bg-orange-200 w-80 text-center py-6 rounded-3xl test-xl font-small">
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
