import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editingTodo, setEditingTodo] = useState(null); // Track which todo is being edited
  const [editedTitle, setEditedTitle] = useState(""); // Track input changes

  const handleChangeTodo = async (todo) => {
    await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...todo, title: editedTitle }), // Send updated title
      headers: { "Content-type": "application/json" },
    });

    setEditingTodo(null); // Exit edit mode
    await getAllTodos(); // Refresh list
  };

  const filterOption = () => {
    if (filter === "Completed") return "completed=true";
    if (filter === "Pending") return "completed=false";
    return "";
  };

  const getAllTodos = async () => {
    const query = filterOption();
    const url = query ? `http://localhost:3000/todos?${query}` : `http://localhost:3000/todos`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, [filter]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!todoTitle.trim()) return;

    const newTodo = { title: todoTitle, completed: false };

    await fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: { "Content-type": "application/json" },
    });

    await getAllTodos();
    setTodoTitle("");
  };

  const removeHandler = async (todoID) => {
    await fetch(`http://localhost:3000/todos/${todoID}`, { method: "DELETE" });
    await getAllTodos();
  };

  const updateHandler = async (todo) => {
    await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
      headers: { "Content-type": "application/json" },
    });

    await getAllTodos();
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">✅ Todo List</h1>

      {/* Todo Input Form */}
      <form onSubmit={submitHandler} className="w-full max-w-lg flex gap-3 mb-6">
        <input
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          placeholder="Enter a todo..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>

      {/* Filter Dropdown */}
      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white text-gray-700 shadow-md"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Todo List */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Tasks</h2>
        <ul className="space-y-4">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks available</p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border"
              >
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => updateHandler(todo)}
                    className="h-5 w-5 accent-blue-500"
                  />
                  {editingTodo === todo.id ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    <span className={`text-lg ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                      {todo.title}
                    </span>
                  )}
                </label>

                <div className="flex gap-2">
                  {editingTodo === todo.id ? (
                    <button
                      onClick={() => handleChangeTodo(todo)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition shadow-md"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingTodo(todo.id);
                        setEditedTitle(todo.title);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition shadow-md"
                    >
                      ✏️ Edit
                    </button>
                  )}

                  <button
                    onClick={() => removeHandler(todo.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition shadow-md"
                  >
                    ❌ Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
