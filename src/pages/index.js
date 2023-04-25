import Head from "next/head";
import Link from "next/link";
import Popup from "reactjs-popup";
import NavBar from "@/components/navBar";

const CATEGORIES = [
  {
    href: "/recipes?search=omnivore",
    title: "Omnivore",
    description: "'You eat both Meat and Plant products'",
    img: "./MeatLoversPic.jpeg",
  },
  {
    href: "/recipes?search=vegetarian",
    title: "Vegetarian",
    description: "'You don't eat Meat or Fish'",
    img: "./Vegetarian.jpeg",
  },
  {
    href: "/recipes?search=bbq",
    title: "Bbq",
    description: "'You love the outdoor smoke'",
    img: "./BBQ.jpeg",
  },
  {
    href: "/recipes?search=holiday",
    title: "Holiday",
    description: "'You love the Advent Calendar Meal'",
    img: "./HolidayMeal.jpeg",
  },
  {
    href: "/recipes?search=low-carb",
    title: "Low-carb",
    description: "'You are on a Special Diet'",
    img: "./Low-carb.jpeg",
  },
  {
    href: "/recipes?search=mediterranean",
    title: "Mediterranean",
    description: "'You eat loads of veggies, nuts and olive oil'",
    img: "./Meditteranean.jpeg",
  },
  {
    href: "/recipes",
    title: "International",
    description: "'You travel around the world in 90 days'",
    img: "./International.jpeg",
  },
  {
    href: "/recipes",
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
      <div
        className="bg-cover bg-center h-screen flex flex-col justify-between"
        style={{ backgroundImage: "url(/BackgroundPic.jpeg)" }}
      >
        <div className="h-2/3"></div>
        <NavBar />
      </div>
      <div className="bg-white flex flex-col items-center overflow-y-scroll">
        <div className="mt-20"></div>
        <div className="flex flex-col items-center w-full">
          {CATEGORIES.map((i, index) => {
            return (
              <div
                key={`${i.title}${index}`}
                className="flex w-full items-center justify-center pl-0"
              >
                <Link
                  className="bg-green-400 text-white w-full text-center py-5 rounded-3xl text-2xl font-medium border-solid border-black border-2 pl-0"
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

                <div className="bg-orange-200 w-full text-center py-6 rounded-3xl test-xl font-small border-solid border-black border-2 pr-0">
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
