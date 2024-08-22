import { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const authPaths = ["/account/register", "/account/login"];
const protectedPaths = ["/admin"];

const MiddlewareAuth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isRefreshToken = Cookies.get("refreshToken");

  useEffect(() => {
    if (isRefreshToken && authPaths.includes(pathname)) {
      navigate("/shop", { replace: true });
    }

    // Check protected Paths
    if (!isRefreshToken && protectedPaths.includes(pathname)) {
      navigate("/account/login", { replace: true });
    }
  }, [pathname, navigate, isRefreshToken]);

  return <Outlet />;
};

export default MiddlewareAuth;
