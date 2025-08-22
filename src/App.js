import React, { useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);


  // Create Todo
  const addTodo = async () => {
    if (!title) return;
    const res = await axios.post("https://jsonplaceholder.typicode.com/todos", {
      title,
      completed: false,
    });
    setTodos([...todos, res.data]);
    setTitle("");
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit Todo
  const startEdit = (id, currentTitle) => {
    setEditId(id);
    setTitle(currentTitle);
  };

  const updateTodo = async () => {
    const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${editId}`, {
      title,
      completed: false,
    });
    setTodos(todos.map((todo) => (todo.id === editId ? res.data : todo)));
    setEditId(null);
    setTitle("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App </h1>


      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Enter todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {editId ? (
          <button onClick={updateTodo}>Update</button>
        ) : (
          <button onClick={addTodo}>Add</button>
        )}
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}{" "}
            <button onClick={() => startEdit(todo.id, todo.title)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
