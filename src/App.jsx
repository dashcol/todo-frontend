import { Provider } from "react-redux";
import Todo from "./features/todo/todo";
import { persistor, store } from "./redux/store/store";
import Nav from "./features/nav/nav";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./features/signIn/signIN";
import SignUp from "./features/signup/signUP";
import Home from "./features/home/home";
import ProtectedRoute from "./features/protect/protect";
import { PersistGate } from "redux-persist/integration/react";
import Notes from "./features/notes/notes";
import Weather from "./features/weather/Weather";
import ForgotPass from "./features/signIn/forgot-pass/ForgotPass";
import ChangePass from "./features/signIn/change-pass/ChangePass";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        { index: true, element: <SignIn /> },
        { path: "/signUp", element: <SignUp /> },
        { path: "/forgot-pass", element: <ForgotPass /> },
        { path: "/change-pass", element: <ChangePass /> },
        {
          path: "/todos",
          element: (
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/notes",
          element: (
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          ),
        },
        {
          path: "/weather",
          element: (
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
