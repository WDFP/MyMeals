import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-200 h-16 w-full fixed top-0 z-50">
      <div className="w-full">
        <Link href="/">
          <div className="text-2xl font-bold text-gray-800 px-4">MyMeals</div>
        </Link>
      </div>
      <div className="flex justify-end items-center w-4/12 pr-4">
        <form className="mr-4">
          <input
            className="rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white py-2 px-4 block leading-normal w-64"
            type="text"
            placeholder="Search"
          ></input>
        </form>
        <Link href="/Login">
          <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-4">
            Login
          </button>
        </Link>
        <Link href="/Register">
          <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
