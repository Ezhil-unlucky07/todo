import { useState } from "react";

function Crud() {
  const [inputValue, setInputValue] = useState(""); // Input field
  const [items, setItems] = useState([]);           // List of items
  const [editIndex, setEditIndex] = useState(null); // Track index being edited

  // Add or update item
  const handleSubmit = () => {
    if (inputValue.trim() === "") return;

    if (editIndex !== null) {
      // Update mode
      const updatedItems = [...items];
      updatedItems[editIndex] = inputValue;
      setItems(updatedItems);
      setEditIndex(null); // Exit edit mode
    } else {
      // Add mode
      setItems([...items, inputValue]);
    }

    setInputValue(""); // Clear input
  };

  // Start editing an item
  const handleEdit = (index) => {
    setInputValue(items[index]);
    setEditIndex(index);
  };

  // Delete an item
  const deleteItem = (indexToDelete) => {
    const updated = [...items];
    updated.splice(indexToDelete, 1);
    setItems(updated);
    // Reset edit mode if the deleted item was being edited
    if (editIndex === indexToDelete) {
      setEditIndex(null);
      setInputValue("");
    }
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {editIndex !== null ? "Update" : "Submit"}
      </button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <button onClick={() => deleteItem(index)}>Delete</button>
            <button onClick={() => handleEdit(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Crud;
