import { useMemo } from "react";

import { useGetUserQuery } from "../api/endpoints/authApiSlice";
import Cookies from "js-cookie";

const useAuth = () => {
  // Fetch user data
  const isAuthenticated = Cookies.get("auth_is_authenticated");
  const {
    data: currentUser,
    isLoading,
    isError,
  } = useGetUserQuery("currentUser", {
    skip: !isAuthenticated,
  });

  // Compute user object with default values and current user data
  const user = useMemo(() => {
    if (!isAuthenticated || isLoading || isError || !currentUser) {
      return {
        username: "",
        userId: null,
        roles: ["user"], // default role if user is not logged in
      };
    } else {
      return {
        username: currentUser.username,
        userId: currentUser._id,
        roles: currentUser.roles || ["user"],
      };
    }
  }, [isAuthenticated, currentUser, isLoading, isError]);

  return user;
};

export default useAuth;
