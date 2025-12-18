import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ adminOnly, usersOnly }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    console.log("This is only for Registered User ");
    return <Navigate to="/login" />;
  }

  if (usersOnly && user.role !== "user") {
    console.log("This is only for Registered User , Not Even for Admins");

    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== "admin") {
    console.log("only admins");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
