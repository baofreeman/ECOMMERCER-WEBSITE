import { useMemo } from "react";

import { useGetUserQuery } from "../api/endpoints/authApiSlice";
import Cookies from "js-cookie";

const useAuth = () => {
  // Fetch user data
  const isRefreshToken = Cookies.get("refreshToken");
  const {
    data: currentUser,
    isLoading,
    isError,
  } = useGetUserQuery("currentUser", {
    skip: !isRefreshToken,
  });

  // Compute user object with default values and current user data
  const user = useMemo(() => {
    if (!isRefreshToken || isLoading || isError || !currentUser) {
      return {
        username: "",
        userId: null,
        roles: ["user"], // default role if user is not logged in
      };
    }

    return {
      username: currentUser.username,
      userId: currentUser._id,
      roles: currentUser.roles || ["user"],
    };
  }, [isRefreshToken, currentUser, isLoading, isError]);

  return user;
};

export default useAuth;
