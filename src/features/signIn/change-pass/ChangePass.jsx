// import React, { useState } from "react";
// import { EyeIcon, EyeOffIcon } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { authSelector, changePassThunk } from "../../../redux/redux.login";

// function ChangePass() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const { email } = useSelector(authSelector);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleClick = async () => {
//     setError("");
//     setSuccess("");

//     if (!email) {
//       setError("User email not found. Please try again.");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     const result = await dispatch(changePassThunk({ email, password }));

//     if (changePassThunk.fulfilled.match(result)) {
//       setSuccess("Password changed successfully! Redirecting...");
//       setTimeout(() => navigate("/"), 2000);
//     } else {
//       setError(
//         result.payload?.message || "Failed to change password. Try again."
//       );
//     }

//     setTimeout(() => {
//       setError("");
//       setSuccess("");
//     }, 3000);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//       <div className="bg-white shadow-2xl rounded-lg p-8 w-96 flex flex-col gap-6 relative">
//         <h2 className="text-2xl font-bold text-center text-gray-800">
//           Change Password !
//         </h2>

//         {error && <p className="text-red-500 text-center">{error}</p>}
//         {success && <p className="text-green-500 text-center">{success}</p>}

//         <div className="relative w-full">
//           <input
//             type={showPassword ? "text" : "password"}
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             placeholder="New Password here..."
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300"
//           >
//             {showPassword ? (
//               <EyeOffIcon className="w-5 h-5" />
//             ) : (
//               <EyeIcon className="w-5 h-5" />
//             )}
//           </button>
//         </div>

//         <div className="relative w-full">
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             value={confirmPassword}
//             placeholder="Confirm New Password here..."
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300"
//           >
//             {showConfirmPassword ? (
//               <EyeOffIcon className="w-5 h-5" />
//             ) : (
//               <EyeIcon className="w-5 h-5" />
//             )}
//           </button>
//         </div>

//         <button
//           onClick={handleClick}
//           className="w-full bg-indigo-500 text-white py-2 rounded-md shadow-md hover:bg-indigo-600 transition-all"
//         >
//           Change password
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChangePass;

import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector, changePassThunk } from "../../../redux/redux.login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl text-white">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center">Change Password</h2>

            {error && (
              <p className="text-red-500 text-center bg-white/10 rounded-md p-2">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500 text-center bg-white/10 rounded-md p-2">
                {success}
              </p>
            )}

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-white/70 hover:text-white"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-white/70 hover:text-white"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            <Button
              onClick={handleClick}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90"
            >
              Change Password
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default ChangePass;
