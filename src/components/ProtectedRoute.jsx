import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, status } = useSelector(
    (store) => store.auth
  );

  // ⏳ WAIT until auth is resolved
  if (status === "idle" || status === "loading") {
    return null; // or <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated, status } = useSelector(
    (store) => store.auth
  );

  if (status === "idle" || status === "loading") {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};



export const AdminRoutes = ({ children }) => {
  const { user, isAuthenticated, status } = useSelector(
    (store) => store.auth
  );

  if (status === "idle" || status === "loading") {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "instructor") {
    return <Navigate to="/" replace />;
  }

  return children;
};
