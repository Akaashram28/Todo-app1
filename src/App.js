import React, { useState, useEffect } from "react";
import axios from "axios";

const initialTodos = [
  { id: 1, title: "run", completed: false },
  { id: 2, title: "swim", completed: true },
  { id: 3, title: "jog", completed: false },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAction = async () => {
    if (!newTodoTitle.trim()) return;

    try {
      if (editId) {
        // Update Todo
        const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${editId}`, {
          title: newTodoTitle,
          completed: false,
        });
        setTodos(todos.map((todo) => (todo.id === editId ? { ...res.data, id: todo.id } : todo)));
        setEditId(null);
      } else {
        // Add Todo
        const res = await axios.post("https://jsonplaceholder.typicode.com/todos", {
          title: newTodoTitle,
          completed: false,
        });
        setTodos([{ ...res.data, id: Date.now() }, ...todos]);
      }
      setNewTodoTitle("");
    } catch (error) {
      console.error("Error with todo action:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const startEdit = (id, title) => {
    setEditId(id);
    setNewTodoTitle(title);
  };

  return (
    <div className="container">
      <h1 className="header">Todo App</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter todo..."
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAction()}
        />
        <button onClick={handleAction}>
          {editId ? "Update" : "Add"}
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span
              style={{ textDecoration: todo.completed ? "line-through" : "none" }}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.title}
            </span>
            <div className="actions">
              <button onClick={() => startEdit(todo.id, todo.title)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
