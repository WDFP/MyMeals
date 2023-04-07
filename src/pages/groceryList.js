import { useState } from "react";

export default function GroceryList() {

  const [userInput, setUserInput] = useState('');
  const [itemList, setItemList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState('');

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItemList([userInput, ...itemList]);
    setUserInput('');
  };

  const handleDelete = (item) => {
    const updatedList = itemList.filter((itemListed) => item !== itemListed);
    setItemList(updatedList);
  };

  const handleEdit = (item, index) => {
    setIsEditing(true);
    setEditIndex(index);
    setEditInput(item);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedList = itemList.map((item, index) => {
      if (index === editIndex) {
        return editInput;
      }
      return item;
    });
    setItemList(updatedList);
    setEditIndex(null);
    setEditInput('');
    setIsEditing(false);
  };

  return (
    <div className="text-white bg-green-400">
    <div>
      <h1 className="flex flex-col items-center justify-center text-5xl">
        My Groceries
      </h1>

      <form style={{ display: 'flex', paddingRight: '5px' }}>
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
      <div class="flex justify-center ...">
      <ul class="flex-col space-y-2  ...">
        {itemList.length >= 1 &&
          itemList.map((item, index) => (
            <li
              
              className="flex-col space-x-2 max-w-md space-y-1 text-black-500 list-disc list-inside dark:text-black-400"
              key={index}
            >
              {isEditing && editIndex === index ? (
                <form onSubmit={handleUpdate}>
                  <input
                    type="text" class="text-black"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    placeholder="Edit item"
                  />
                  <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ml-2" type="submit">Update</button>
                  <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => setIsEditing(false)}>Cancel</button>
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
