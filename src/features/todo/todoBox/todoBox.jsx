import { useDispatch, useSelector } from "react-redux";
import {
  deleteAsyncThunk,
  todoSelector,
  toggleAsyncThunk,
} from "../../../redux/redux.reducers.todo";

export default function TodoBox() {
  const todos = useSelector(todoSelector);
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggleAsyncThunk(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteAsyncThunk(id));
  };

  return (
    <div className="flex flex-col gap-3">
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available</p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md"
          >
            <p
              className={`flex-1 text-lg ${
                todo.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {todo.todo}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => handleToggle(todo._id)}
                className={`px-3 py-1 rounded-md text-white transition-all ${
                  todo.completed
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {todo.completed ? "Completed" : "Pending"}
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
