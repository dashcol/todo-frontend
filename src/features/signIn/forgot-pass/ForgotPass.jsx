import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassThunk } from "../../../redux/redux.login";

function ForgotPass() {
  const [email, setEmail] = useState("");
  const [otpInput, setOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    setError("");
    setSuccess("");

    if (!otpInput) {
      const result = await dispatch(forgotPassThunk({ email }));

      if (forgotPassThunk.fulfilled.match(result)) {
        setSuccess(result.payload.message.message);
        setOtpInput(true);
      } else {
        setError(
          result.payload?.message?.message ||
            "Unable to send OTP. Please try again."
        );
      }
    } else {
      const result = await dispatch(forgotPassThunk({ email, otp }));

      if (forgotPassThunk.fulfilled.match(result)) {
        setSuccess(result.payload.message.message);
        setTimeout(() => navigate("/change-pass"), 2000);
      } else {
        setSuccess("");
        setError(
          result.payload?.message?.message || "Invalid OTP. Please try again."
        );
      }
    }

    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-96 flex flex-col gap-6 relative">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password !
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <input
          type="email"
          placeholder="Enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {otpInput && (
          <input
            type="number"
            placeholder="Enter OTP..."
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        )}

        <button
          onClick={handleClick}
          className="w-full bg-indigo-500 text-white py-2 rounded-md shadow-md hover:bg-indigo-600 transition-all"
        >
          {otpInput ? "Submit" : "Send OTP"}
        </button>
      </div>
    </div>
  );
}

export default ForgotPass;
