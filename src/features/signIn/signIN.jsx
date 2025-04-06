// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { userAsyncThunk } from "../../redux/redux.login";
// import { Link, useNavigate } from "react-router-dom";
// import { EyeIcon, EyeOffIcon } from "lucide-react";

// export default function SignIn() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({ email: "", password: "" });
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClick = async () => {
//     try {
//       const result = await dispatch(userAsyncThunk(user));
//       if (result.payload?.token) {
//         navigate("/home");
//       } else {
//         showError("Invalid credentials. Please try again.");
//       }
//     } catch (error) {
//       showError("An error occurred. Please try again.");
//     }

//     setUser({ email: "", password: "" });
//   };

//   const showError = (message) => {
//     setErrorMessage(message);
//     setTimeout(() => setErrorMessage(""), 2000);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//       <div className="bg-white shadow-2xl rounded-lg p-8 w-96 flex flex-col gap-6 relative">
//         {errorMessage && (
//           <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center py-2 rounded-t-md">
//             {errorMessage}
//           </div>
//         )}

//         <h2 className="text-2xl font-bold text-center text-gray-800">
//           Sign In
//         </h2>

//         <input
//           type="email"
//           placeholder="Enter email..."
//           value={user.email}
//           onChange={(e) => setUser({ ...user, email: e.target.value })}
//           className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />
//         <div className="relative w-full">
//           <input
//             type={showPassword ? "text" : "password"}
//             value={user.password}
//             onChange={(e) => setUser({ ...user, password: e.target.value })}
//             placeholder="Password here..."
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
//         <button
//           onClick={handleClick}
//           className="w-full bg-indigo-500 text-white py-2 rounded-md shadow-md hover:bg-indigo-600 transition-all"
//         >
//           Sign In
//         </button>

//         <div className="flex justify-between text-sm text-indigo-500">
//           <Link to="/forgot-pass" className="hover:underline">
//             Forgot Password?
//           </Link>
//           <Link to="/signup" className="hover:underline">
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useDispatch } from "react-redux";
import { userAsyncThunk } from "../../redux/redux.login";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    try {
      const result = await dispatch(userAsyncThunk(user));
      if (result.payload?.token) {
        navigate("/home");
      } else {
        showError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      showError("An error occurred. Please try again.");
    }

    setUser({ email: "", password: "" });
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 2000);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
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
        <Card className="w-96 backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl text-white relative">
          <CardContent className="p-8 space-y-5">
            {errorMessage && (
              <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-2 rounded-t-xl shadow">
                {errorMessage}
              </div>
            )}

            <h2 className="text-3xl font-bold text-center">Welcome Back</h2>

            <Input
              type="email"
              placeholder="Enter email..."
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="bg-white/10 border-white/30 text-white placeholder:text-white"
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password here..."
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
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

            <Button
              onClick={handleClick}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 transition-all"
            >
              Sign In
            </Button>

            <div className="flex justify-between text-sm text-white/80">
              <Link to="/forgot-pass" className="hover:underline">
                Forgot Password?
              </Link>
              <Link to="/signup" className="hover:underline">
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
