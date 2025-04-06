// import { useDispatch, useSelector } from "react-redux";
// import { Outlet } from "react-router-dom";
// import { authActions, authSelector } from "../../redux/redux.login";

// export default function Nav() {
//   const { isAuthenticated } = useSelector(authSelector);
//   const { user } = useSelector(authSelector);

//   const dispatch = useDispatch();
//   const handleLogout = () => {
//     dispatch(authActions.logout());
//   };
//   return (
//     <>
//       <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 sticky top-0 z-10 shadow-md">
//         <div className="text-white text-xl font-bold tracking-wide">
//           <h1>GOtoO..</h1>
//         </div>

//         <div className="flex gap-6 text-white font-medium">
//           <a
//             href="/home"
//             className="cursor-pointer hover:text-gray-300 transition-all"
//           >
//             Home
//           </a>
//           <a
//             href="/todos"
//             className="cursor-pointer hover:text-gray-300 transition-all"
//           >
//             Todo
//           </a>
//           <a
//             href="/notes"
//             className="cursor-pointer hover:text-gray-300 transition-all"
//           >
//             Notes
//           </a>
//           <a
//             href="/weather"
//             className="cursor-pointer hover:text-gray-300 transition-all"
//           >
//             Weather
//           </a>
//         </div>
//         <div className=" text-white font-medium">
//           {isAuthenticated ? (
//             <img
//               onClick={handleLogout}
//               className="h-6 w-6 cursor-pointer opacity-80 hover:opacity-100 transition-all"
//               alt="logout"
//               src="https://cdn-icons-png.flaticon.com/128/13136/13136620.png"
//             />
//           ) : (
//             <a
//               href="/"
//               className="cursor-pointer hover:text-gray-300 transition-all"
//             >
//               Login
//             </a>
//           )}
//         </div>

//         <div className="flex gap-3 items-center">
//           <img
//             className="h-6 w-6 cursor-pointer opacity-80 hover:opacity-100 transition-all"
//             alt="settings"
//             src="https://cdn-icons-png.flaticon.com/128/503/503849.png"
//           />
//           {isAuthenticated ? (
//             <div className=" cursor-pointer flex items-center justify-center h-10 w-10 rounded-full bg-amber-500 text-white font-bold text-lg">
//               {user.message.charAt(12).toUpperCase()}
//             </div>
//           ) : (
//             <img
//               className="h-6 w-6 cursor-pointer opacity-80 hover:opacity-100 transition-all"
//               alt="profile"
//               src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png"
//             />
//           )}
//         </div>
//       </div>
//       <Outlet />
//     </>
//   );
// }

// components/Nav.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelector } from "../../redux/redux.login";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const { isAuthenticated, user } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-md bg-black/60 text-white shadow-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            GotOo 🚀
          </h1>

          <ul className="flex gap-6 text-sm md:text-base font-medium">
            {["home", "todos", "notes", "weather"].map((route) => (
              <li key={route}>
                <Link
                  to={`/${route}`}
                  className="relative group transition duration-300"
                >
                  <span className="group-hover:text-teal-400 capitalize">
                    {route}
                  </span>
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-teal-400 transition-all group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/13136/13136620.png"
                  alt="logout"
                  onClick={handleLogout}
                  className="h-6 w-6 cursor-pointer opacity-80 hover:opacity-100 transition hover:scale-110"
                />
                <div
                  onClick={() => setShowMenu(!showMenu)}
                  className="cursor-pointer"
                >
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-amber-500 text-white">
                      {user.message.charAt(12).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-12 right-0 bg-zinc-900 rounded-xl shadow-lg p-4 w-40 text-sm space-y-2 border border-white/10"
                  >
                    <p className="text-white/80">
                      Welcome, {user.message.slice(12)}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left hover:text-rose-500 transition"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link
                to="/"
                className="hover:text-teal-400 transition hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </motion.nav>
      <Outlet />
    </>
  );
}
