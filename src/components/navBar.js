import Link from "next/link";
import { useSession, signIn, signOut } from 'next-auth/react';

export default function NavBar() {
  const { data: session } = useSession();

  const handleSignin = (e) => {
    e.preventDefault();
    signIn();
  };

  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <nav className="flex pl-4 justify-between items-center bg-green-500 text-white h-16 w-full fixed top-0 right-0 z-50">
      <div className="flex justify-start items-center w-2/6">
        
        {!session && <button className="bg-white hover:bg-gray-100 text-green-500 font-bold py-2 px-4 rounded mr-4" onClick={handleSignin}>
          Sign in
        </button>}
        {session && <button className="bg-white hover:bg-gray-100 text-green-500 font-bold py-2 px-4 rounded mr-4" onClick={handleSignout}>
          Sign out
        </button>}
        {session && <Link href="/profile">{session.user.name}</Link>}

      </div>
      <div className="flex justify-center items-center w-2/6">
        <Link href="/">
          <div className="text-3xl font-bold ">MyMeals</div>
        </Link>
      </div>
      <div className="flex justify-end items-center w-2/6 pr-4">
        {session &&
          <Link href="/favourites">
            <button className="bg-white hover:bg-gray-100 text-green-500 font-bold py-2 px-4 rounded mr-4">
              Favourites
            </button>
          </Link>
        }
        <Link href="/recipes">
          <button className="bg-white hover:bg-gray-100 text-green-500 font-bold py-2 px-4 rounded mr-4">
            Recipes
          </button>
        </Link>
        <Link href="/groceryList">
          <button className="bg-white hover:bg-gray-100 text-green-500 font-bold py-2 px-4 rounded mr-4">
            Grocery List
          </button>
        </Link>
        <Link href="/mealPlan">
          <button className="bg-white hover:bg-gray-100 text-green-500 font-bold py-2 px-4 rounded">
            Meal Plan
          </button>
        </Link>
      </div>
    </nav>
  );
};
