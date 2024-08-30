import { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const authPaths = ["/account/register", "/account/login"];
const protectedPaths = ["/admin"];

const MiddlewareAuth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = Cookies.get("auth_is_authenticated");

  useEffect(() => {
    if (isAuthenticated && authPaths.includes(pathname)) {
      navigate("/shop", { replace: true });
    }

    // Check protected Paths
    if (!isAuthenticated && protectedPaths.includes(pathname)) {
      navigate("/account/login", { replace: true });
    }
  }, [pathname, navigate, isAuthenticated]);

  return <Outlet />;
};

export default MiddlewareAuth;
