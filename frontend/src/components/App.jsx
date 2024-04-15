import React, { useState ,useEffect } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  // Display Existing List Items in Database when page if loaded for the first time
  useEffect(()=>{
    getItem();
  },[])

  // Function to handle the changes made in input textbox. Function called the when user types text.
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  // Function to add list item in the database. Function called when user clicks on Add button.
  async function addItem() {
    const response = await fetch("http://localhost:5000/todoData", {
      method: "POST",
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({item: inputText})
    });
    getItem();
  }

  // Function to fetch items from the database, and display them in list format.
  async function getItem(){
    const response = await fetch("http://localhost:5000/todoData", {
      method: "GET"
    });
    const data = await response.json();
    setItems(data);
    setInputText("");
  }

  // Function to delete item from list. Function called when user clicks on delete icon.
  async function deleteItem(id) {
    const response = await fetch(`http://localhost:5000/todoData/${id}`, {
      method: "DELETE"
    });
    getItem();
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do Trail</h1>
      </div>

      {/* Text Input */}
      <InputArea
        addItem={addItem}
        handleChange={handleChange}
        inputText={inputText}
      />

      {/* Displaying List of Existing Items in Database */}
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={todoItem._id}
              text={todoItem.taskItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;