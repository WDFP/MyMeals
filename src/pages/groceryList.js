import { useState, useEffect } from "react";
import NavBar from "@/components/navBar";
import clientPromise from "@/lib/mongodb";
const { MONGODB_DB } = process.env;

export default function GroceryList(props) {
  const [userInput, setUserInput] = useState("");
  const [itemList, setItemList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setItemList([userInput, ...itemList]);
    setUserInput("");
    try {
      const response = await fetch("/api/add_grocery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredientName: userInput }),
      });
      if (response.ok) {
        console.log(`Grocery: ${userInput} added successfully`);
        setItemList([userInput, ...itemList]);
      } else {
        console.error("Failed to add ingredient to grocery list.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (item) => {
    const updatedList = itemList.filter((itemListed) => item !== itemListed);
    setItemList([...updatedList]);
    try {
      const response = await fetch("/api/delete_grocery", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredientName: item }),
      });
      if (response.ok) {
        console.log(`Grocery: ${item} deleted successfully`);
      } else {
        console.error("Failed to delete ingredient from grocery list.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item, index) => {
    setIsEditing(true);
    setEditIndex(index);
    setEditInput(item);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedList = itemList.map((item, index) => {
      if (index === editIndex) {
        return editInput;
      }
      return item;
    });
    setItemList(updatedList);
    setEditIndex(null);
    setEditInput("");
    setIsEditing(false);
    try {
      const response = await fetch("/api/edit_grocery", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredientName: itemList[editIndex],
          updatedItem: editInput,
        }),
      });
      if (response.ok) {
        console.log(
          `Grocery: ${itemList[editIndex]} updated to ${editInput} successfully`
        );
      } else {
        console.error("Failed to update ingredient from grocery list.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (props.groceries && props.groceries.length > 0) {
      setItemList(props.groceries[0].grocery_list);
    }
  }, [props.groceries]);

  return (
    <div className="flex bg-zinc-800">
      <NavBar />
      <div className="flex flex-col w-full pt-4">
        <h1 className="flex mt-20 text-3xl text-white font-bold mb-4 justify-center flex-row">
          My Groceries
        </h1>
        <div></div>
        <form style={{ display: "flex", paddingRight: "5px" }}>
          <input
            type="text"
            value={userInput}
            className="text-black bg-white p-4 rounded-md hover:bg-white shadow-sm w-full"
            placeholder="Enter a grocery item"
            onChange={handleChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Add Item
          </button>
        </form>
        <div className="flex justify-center ...">
          <ul className="flex-col space-y-2  ...">
            {itemList.length >= 1 &&
              itemList.map((item, index) => (
                <li
                  className="flex-col mt-3 space-x-2 max-w-md space-y-1 text-white list-disc list-inside dark:text-white-400"
                  key={index}
                >
                  {isEditing && editIndex === index ? (
                    <form onSubmit={handleUpdate}>
                      <input
                        type="text"
                        className="text-black"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        placeholder="Edit item"
                      />
                      <button
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ml-2"
                        type="submit"
                      >
                        Update
                      </button>
                      <button
                        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      {item}
                      <button
                        className="bg-yellow-300 hover:bg-yellow-200 text-white font-bold py-2 ml-2 px-4 rounded"
                        onClick={() => handleEdit(item, index)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(MONGODB_DB);
    const recipes = await db
      .collection("groceries")
      .find({})
      // .limit()
      .toArray();
    return {
      props: { groceries: JSON.parse(JSON.stringify(recipes)) },
    };
  } catch (e) {
    console.error(e);
  }
};
