import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { roles } = useAuth(); // Get roles from authentication hook.
  const location = useLocation();

  // Check if any of the user's roles are included in the allowed roles.
  const content = roles?.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to={"account/login"} state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
