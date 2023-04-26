import NavBar from "@/components/navBar";
import clientPromise from "@/lib/mongodb";
import Image from "next/image";
import Link from "next/link";
import { NextFetchEvent } from "next/server";
import React, { useState } from "react";
const { MONGODB_DB } = process.env;

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function RecipesPage(props) {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [mealPlans, setMealPlans] = useState(props.mealPlans[0]);

  const fetchMealPlans = async () => {
    try {
      const response = await fetch("/api/meal_plans");
      const mealPlans = await response.json();
      setMealPlans(mealPlans);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMeal = async (slug) => {
    const dayToUpdate = selectedDay; // Update with the appropriate day
    const mealToDelete = { slug }; // Update with the appropriate meal object

    try {
      // Send POST request to API endpoint with data
      const response = await fetch("/api/meal_plans", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dayToUpdate, mealToDelete }),
      });

      // Check response status
      if (response.ok) {
        // Remove the deleted meal from mealPlans array
        console.log("Meal deleted successfully");
        await fetchMealPlans();
      } else {
        console.error("Failed to delete meal");
      }
    } catch (error) {
      // Handle any error that occurs
      console.error(error);
    }
  };

  return (
    <div className='flex h-screen bg-zinc-800'>
      <NavBar />
      <div className='w-1/5 h-full flex flex-col justify-center items-center'>
        {daysOfWeek.map((day) => (
          <button
            key={day}
            className={`p-4 cursor-pointer text-white font-bold hover:bg-green-400 hover:text-white  mb-4 ${
              selectedDay === day ? "bg-green-400 text-black" : selectedDay
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <div className='flex-1 mt-16 overflow-auto bg-white flex flex-col justify-center items-center'>
        <div className='p-4 w-full h-full'>
          <h2 className='text-green-400 font-bold text-center text-5xl mb-5'>
            {selectedDay}'s Recipes
          </h2>
          {/* <div className="flex flex-col overflow-y-auto justify-center items-center">
            <div className="flex flex-row flex-wrap w-full justify-center items-center"> */}
          {mealPlans[selectedDay].map((recipe, index) => (
            <div
              key={index}
              className='p-4 border-solid border-black border-2 rounded-lg text-center hover:text-black transition-colors duration-300 items-center w-full mb-2'
            >
              <Link
                className='flex items-center text-2xl flex-col gap-5'
                href={recipe.link}
              >
                {recipe.title}
                <Image
                  src={recipe.image}
                  width={150}
                  height={150}
                  alt={recipe.title}
                ></Image>
              </Link>
              <button
                className='bg-red-600 hover:bg-red-700 mt-5 text-white font-bold py-2 px-4 rounded mr-4'
                onClick={() => handleDeleteMeal(recipe.slug)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {/* </div>
        </div> */}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(MONGODB_DB);
    const recipes = await db
      .collection("meal_plans")
      .find({})
      // .limit()
      .toArray();
    return {
      props: { mealPlans: JSON.parse(JSON.stringify(recipes)) },
    };
  } catch (e) {
    console.error(e);
  }
};
