import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ user, redirectTo = "/login" }) =>
  user ? <Outlet /> : <Navigate to={redirectTo} replace />;
