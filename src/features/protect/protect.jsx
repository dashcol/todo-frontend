import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { authSelector } from "../../redux/redux.login";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, token } = useSelector(authSelector);
  console.log("Auth State:", { isAuthenticated, token });

  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/" />;
}
