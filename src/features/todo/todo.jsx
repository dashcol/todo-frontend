import { useDispatch } from "react-redux";
import {
  getAsyncThunk,
  postAsyncThunk,
  toggleAsyncThunk,
} from "../../redux/redux.reducers.todo";
import TodoBox from "./todoBox/todoBox";
import { useEffect, useState } from "react";

export default function Todo() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!todo.trim()) return;
    dispatch(postAsyncThunk({ todo }));
    setTodo("");
  };

  useEffect(() => {
    dispatch(getAsyncThunk());
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex-col gap-6 p-6">
      <div className="flex gap-4 w-full max-w-md bg-white shadow-2xl rounded-lg p-4">
        <input
          className="flex-1 bg-gray-100 h-10 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          type="text"
          value={todo}
          placeholder="Enter your task..."
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md transition-all hover:bg-indigo-600 active:scale-95"
          onClick={handleClick}
        >
          Add
        </button>
      </div>

      <div className="w-full max-w-md h-96 bg-white shadow-2xl rounded-lg overflow-auto p-4">
        <TodoBox />
      </div>
    </div>
  );
}
