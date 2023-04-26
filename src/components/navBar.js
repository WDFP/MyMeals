import Link from "next/link";
import { useSession, signIn, signOut } from 'next-auth/react';


const NavBar = () => {
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
    <nav className='flex pl-4 justify-between items-center bg-white h-16 w-full fixed top-0 z-50'>
      <div className='flex justify-start items-center w-2/6'>
        
        {!session && <button className='bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-4' onClick={handleSignin}>
          Signin
        </button>}
        {session && <button className='bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-4' onClick={handleSignout}>
          Sign out
        </button>}
        {session && <Link href='/profile'>{session.user.name}</Link>}

      </div>
      <div className='flex justify-center items-center w-2/6'>
        <Link href='/'>
          <div className='text-2xl font-bold text-gray-800 '>MyMeals</div>
        </Link>
      </div>
      {/* <div className="flex justify-start items-center w-2/6">
        <Link href="/Login">
          <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-4">
            Logged in User
          </button>
        </Link>
        <Link href="/Register">
          <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-4">
            Register
          </button>
        </Link>
      </div> */}
      <div className='flex justify-end items-center w-2/6 pr-4'>
        <Link href='/recipes'>
          <button className='bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-4'>
            Recipes
          </button>
        </Link>
        <Link href='/groceryList'>
          <button className='bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-4'>
            Grocery List
          </button>
        </Link>
        <Link href='/mealPlan'>
          <button className='bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded'>
            Meal Plan
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
