import { useState } from "react";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), task: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mx-auto mt-10 max-w-lg bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Todo App
      </h1>
      <div className="mb-4 flex">
        <input
          type="text"
          className="border border-blue-300 p-3 flex-grow rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500 transition"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-sm transition"
        >
          Add Todo
        </button>
      </div>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <span
              className={`flex-1 text-lg ${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {todo.task}
            </span>
            <button
              onClick={() => toggleComplete(todo.id)}
              className={`px-4 py-2 mr-2 rounded-lg shadow-md transition ${
                todo.completed
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-yellow-500 hover:bg-yellow-600 text-white"
              }`}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
