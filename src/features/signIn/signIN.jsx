import { useState } from "react";
import { useDispatch } from "react-redux";
import { userAsyncThunk } from "../../redux/redux.login";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async () => {
    try {
      const result = await dispatch(userAsyncThunk(user));
      if (result.payload?.token) {
        navigate("/home");
      } else {
        showError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      showError("An error occurred. Please try again.");
    }

    setUser({ email: "", password: "" });
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-96 flex flex-col gap-6 relative">
        {errorMessage && (
          <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center py-2 rounded-t-md">
            {errorMessage}
          </div>
        )}

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h2>

        <input
          type="email"
          placeholder="Enter email..."
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password here..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={handleClick}
          className="w-full bg-indigo-500 text-white py-2 rounded-md shadow-md hover:bg-indigo-600 transition-all"
        >
          Sign In
        </button>

        <div className="flex justify-between text-sm text-indigo-500">
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
          <a href="/signup" className="hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
