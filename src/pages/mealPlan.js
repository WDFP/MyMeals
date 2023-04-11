import React, { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/navBar";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const recipes = {
  Monday: [
    { name: "Spaghetti Bolognese", link: "https://example.com/spaghetti-bolognese" },
    { name: "Chicken Alfredo", link: "https://example.com/chicken-alfredo" },
    { name: "Vegetable Stir-Fry", link: "https://example.com/vegetable-stir-fry" },
  ],
  Tuesday: [
    { name: "Beef Stroganoff", link: "https://example.com/beef-stroganoff" },
    { name: "Chicken Curry", link: "https://example.com/chicken-curry" },
    { name: "Vegetable Soup", link: "https://example.com/vegetable-soup" },
  ],
  Wednesday: [
    { name: "Lasagna", link: "https://example.com/lasagna" },
    { name: "Beef Tacos", link: "https://example.com/beef-tacos" },
    { name: "Vegetarian Chili", link: "https://example.com/vegetarian-chili" },
  ],
  Thursday: [
    { name: "Beef Chili", link: "https://example.com/beef-chili" },
    { name: "Chicken Fajitas", link: "https://example.com/chicken-fajitas" },
    { name: "Vegetarian Enchiladas", link: "https://example.com/vegetarian-enchiladas" },
  ],
  Friday: [
    { name: "Fish and Chips", link: "https://example.com/fish-and-chips" },
    { name: "Shrimp Scampi", link: "https://example.com/shrimp-scampi" },
    { name: "Vegetarian Pizza", link: "https://example.com/vegetarian-pizza" },
  ],
};

export default function RecipesPage() {
  const [selectedDay, setSelectedDay] = useState("Monday");

  return (
    <div className="flex h-screen bg-zinc-800">
      <NavBar />
      <div className="w-1/5 h-full flex flex-col justify-center items-center">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            className={`p-4 cursor-pointer text-white font-bold hover:bg-white hover:text-black mb-4 ${
              selectedDay === day ? "bg-white text-black" : selectedDay
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="flex-1 h-full overflow-auto bg-white flex flex-col justify-center items-center">
        <div className="p-4">
          <h2 className="text-green-400 font-bold mb-4">{selectedDay}'s Recipes</h2>
          <div className="grid grid-cols-1 gap-4">
            {recipes[selectedDay].map((recipe) => (
              <a
                key={recipe.name}
                href={recipe.link}
                className="p-4 border-2 border-green-400 rounded-lg text-center hover:bg-green-400 hover:text-white transition-colors duration-300"
              >
                {recipe.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}