import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { authActions, authSelector } from "../../redux/redux.login";

export default function Nav() {
  const { isAuthenticated } = useSelector(authSelector);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <>
      <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 sticky top-0 z-10 shadow-md">
        <div className="text-white text-xl font-bold tracking-wide">
          <h1>GOtoO..</h1>
        </div>

        <div className="flex gap-6 text-white font-medium">
          <a
            href="/home"
            className="cursor-pointer hover:text-gray-300 transition-all"
          >
            Home
          </a>
          <a
            href="/todos"
            className="cursor-pointer hover:text-gray-300 transition-all"
          >
            Todo
          </a>
          <a
            href="/notes"
            className="cursor-pointer hover:text-gray-300 transition-all"
          >
            Notes
          </a>
          <a
            href="/weather"
            className="cursor-pointer hover:text-gray-300 transition-all"
          >
            Weather
          </a>
        </div>
        <div className=" text-white font-medium">
          {isAuthenticated ? (
            <img
              onClick={handleLogout}
              className="h-6 w-6 cursor-pointer opacity-80 hover:opacity-100 transition-all"
              alt="logout"
              src="https://cdn-icons-png.flaticon.com/128/13136/13136620.png"
            />
          ) : (
            <a
              href="/"
              className="cursor-pointer hover:text-gray-300 transition-all"
            >
              Login
            </a>
          )}
        </div>

        <div className="flex gap-3 items-center">
          <img
            className="h-6 w-6 cursor-pointer opacity-80 hover:opacity-100 transition-all"
            alt="settings"
            src="https://cdn-icons-png.flaticon.com/128/503/503849.png"
          />
          <img
            className="h-6 w-6 cursor-pointer opacity-80 hover:opacity-100 transition-all"
            alt="profile"
            src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png"
          />
        </div>
      </div>
      <Outlet />
    </>
  );
}
