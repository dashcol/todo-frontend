// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { registerAsyncThunk } from "../../redux/redux.login";
// import { Link, useNavigate } from "react-router-dom";
// import { EyeIcon, EyeOffIcon } from "lucide-react";

// export default function SignUp() {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     mobile: "",
//     gender: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [errorOrSuccess, setErrorOrSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     if (
//       !user.name ||
//       !user.email ||
//       !user.password ||
//       !user.confirmPassword ||
//       !user.mobile ||
//       !user.gender
//     ) {
//       setError("Please fill out all fields!");
//       setErrorOrSuccess(false);
//       return;
//     }

//     if (user.password !== user.confirmPassword) {
//       setError("Passwords do not match!");
//       setErrorOrSuccess(false);
//       return;
//     }

//     const result = await dispatch(registerAsyncThunk(user));

//     if (result.error) {
//       try {
//         const payloadData = JSON.parse(
//           result.meta.rejectedWithValue ? result.payload : "{}"
//         );
//         setError(payloadData.message || "Something went wrong!");
//       } catch (error) {
//         setError("An unexpected error occurred.");
//       }
//       setErrorOrSuccess(false);
//       return;
//     }

//     if (registerAsyncThunk.fulfilled.match(result)) {
//       setError("");
//       setSuccess("Signed up successfully!");
//       setErrorOrSuccess(true);

//       setUser({
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         mobile: "",
//         gender: "",
//       });

//       setTimeout(() => navigate("/"), 2000);
//       return;
//     }
//   };

//   useEffect(() => {
//     if (errorOrSuccess) {
//       const timeout = setTimeout(() => {
//         setError("");
//         setSuccess("");
//       }, 2000);
//       return () => clearTimeout(timeout);
//     }
//   }, [errorOrSuccess]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//       <div className=" mt-8  bg-white shadow-2xl rounded-lg p-8 w-96 flex flex-col gap-6">
//         <h2 className="text-2xl font-bold text-center text-gray-800">
//           Sign Up
//         </h2>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
//             <p className="text-sm font-medium">{error}</p>
//           </div>
//         )}

//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md">
//             <p className="text-sm font-medium">{success}</p>
//           </div>
//         )}

//         <div className="relative w-full">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name..."
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             onChange={handleChange}
//             value={user.name}
//           />
//         </div>

//         <div className="relative w-full">
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter email..."
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             onChange={handleChange}
//             value={user.email}
//           />
//         </div>

//         <div className="relative w-full">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Create Password..."
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             onChange={handleChange}
//             value={user.password}
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
//             name="confirmPassword"
//             placeholder="Confirm Password..."
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             onChange={handleChange}
//             value={user.confirmPassword}
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
//         <div className="relative w-full">
//           <input
//             type="number"
//             name="mobile"
//             placeholder="Enter Your Mobile Number"
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             onChange={handleChange}
//             value={user.mobile}
//           />
//         </div>

//         <div className="relative w-full">
//           <select
//             name="gender"
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             onChange={handleChange}
//             value={user.gender}
//           >
//             <option value="" disabled>
//               Please Select Your Gender
//             </option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-indigo-500 text-white py-2 rounded-md shadow-md hover:bg-indigo-600 transition-all"
//         >
//           Sign Up
//         </button>

//         <p className="text-sm text-center text-indigo-500">
//           Already have an account?
//           <Link to="/" className="hover:underline">
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { registerAsyncThunk } from "../../redux/redux.login"; // Ensure this is correctly imported

export default function Signup() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          result.meta?.rejectedWithValue ? result.payload : "{}"
        );
        setError(payloadData.message || "Something went wrong!");
      } catch {
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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
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
            <h1 className="text-3xl font-bold text-center">Create Account</h1>

            {error && <p className="text-red-400 text-center">{error}</p>}
            {success && <p className="text-green-400 text-center">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={user.name}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/30 text-white placeholder:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={user.email}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/30 text-white placeholder:text-white"
                />
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your Password"
                  value={user.password}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/30 text-white placeholder:text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-9 right-3 text-white"
                >
                  {showPassword ? (
                    <EyeOffIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/30 text-white placeholder:text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-9 right-3 text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder="Your Phone Number"
                  value={user.mobile}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/30 text-white placeholder:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-white">
                  Gender
                </Label>
                <select
                  id="gender"
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded-md bg-white/10 border border-white/30 text-white"
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="Male" className="text-black">
                    Male
                  </option>
                  <option value="Female" className="text-black">
                    Female
                  </option>
                  <option value="Other" className="text-black">
                    Other
                  </option>
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 transition-all"
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
