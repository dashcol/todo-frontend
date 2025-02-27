import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector, changePassThunk } from "../../../redux/redux.login";

function ChangePass() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { email } = useSelector(authSelector);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("User email not found. Please try again.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = await dispatch(changePassThunk({ email, password }));

    if (changePassThunk.fulfilled.match(result)) {
      setSuccess("Password changed successfully! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } else {
      setError(
        result.payload?.message || "Failed to change password. Try again."
      );
    }

    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-96 flex flex-col gap-6 relative">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Change Password !
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="New Password here..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm New Password here..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

        <button
          onClick={handleClick}
          className="w-full bg-indigo-500 text-white py-2 rounded-md shadow-md hover:bg-indigo-600 transition-all"
        >
          Change password
        </button>
      </div>
    </div>
  );
}

export default ChangePass;
