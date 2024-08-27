import { useGetUserQuery } from "../api/endpoints/authApiSlice";
import { useMemo } from "react";

const useAuth = () => {
  // Fetch user data
  const { data: currentUser } = useGetUserQuery("currentUser");

  // Compute user object with default values and current user data
  const user = useMemo(
    () => ({
      username: currentUser?.username || "",
      userId: currentUser?._id,
      roles: currentUser?.roles || ["user"],
    }),
    [currentUser]
  );

  return user;
};

export default useAuth;
