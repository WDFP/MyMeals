import { useState } from "react";


export default function groceryList() {

  const [userInput, setUserInput] = useState('')
  const [itemList, setItemList] = useState([])

  const handleChange = (e) => {
    e.preventDefault()

    setUserInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setItemList([
      userInput,
      ...itemList
    ])
      setUserInput('')
  }

  const handleDelete = (item) => {
    const updatedList = itemList.filter(itemListed => itemList.indexOf(itemListed) != itemList.indexOf(item))
    setItemList(updatedList); 
  }

  return (
  <div>
    <div>
      <text type="text-3xl font-bold mb-4" />
        My Groceries
    </div>

    <form>
      <input type="text" value ={userInput} placeholder='Enter a grocery item' onChange={handleChange}/><button onClick={handleSubmit}>Add Item</button>
    </form>
    <ul>
      {
        itemList.length >=1 ? itemList.map((item, idx) => {
          return <li key={idx}>{item}<button onClick={(e) => {e.preventDefault()
          handleDelete(item)}}>Delete</button></li>
        })
        : ''
      }
    </ul>
    </div>


  )
   };
  