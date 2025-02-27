import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerAsyncThunk } from "../../redux/redux.login";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errorOrSuccess, setErrorOrSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.confirmPassword ||
      !user.mobile ||
      !user.gender
    ) {
      setError("Please fill out all fields!");
      setErrorOrSuccess(false);
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match!");
      setErrorOrSuccess(false);
      return;
    }

    const result = await dispatch(registerAsyncThunk(user));

    if (result.error) {
      try {
        const payloadData = JSON.parse(
          result.meta.rejectedWithValue ? result.payload : "{}"
        );
        setError(payloadData.message || "Something went wrong!");
      } catch (error) {
        setError("An unexpected error occurred.");
      }
      setErrorOrSuccess(false);
      return;
    }

    if (registerAsyncThunk.fulfilled.match(result)) {
      setError("");
      setSuccess("Signed up successfully!");
      setErrorOrSuccess(true);

      setUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        gender: "",
      });

      setTimeout(() => navigate("/"), 2000);
      return;
    }
  };

  useEffect(() => {
    if (errorOrSuccess) {
      const timeout = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [errorOrSuccess]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className=" mt-8  bg-white shadow-2xl rounded-lg p-8 w-96 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md">
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}

        <div className="relative w-full">
          <input
            type="text"
            name="name"
            placeholder="Full Name..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            value={user.name}
          />
        </div>

        <div className="relative w-full">
          <input
            type="email"
            name="email"
            placeholder="Enter email..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            value={user.email}
          />
        </div>

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create Password..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            value={user.password}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300"
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            value={user.confirmPassword}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300"
          >
            {showConfirmPassword ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="relative w-full">
          <input
            type="number"
            name="mobile"
            placeholder="Enter Your Mobile Number"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            value={user.mobile}
          />
        </div>

        <div className="relative w-full">
          <select
            name="gender"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            value={user.gender}
          >
            <option value="" disabled>
              Please Select Your Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-500 text-white py-2 rounded-md shadow-md hover:bg-indigo-600 transition-all"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-indigo-500">
          Already have an account?
          <Link to="/" className="hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
