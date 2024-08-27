import { useState, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";

import { useLogoutUserMutation } from "../../api/endpoints/authApiSlice";
import useAuth from "../../hooks/useAuth";

import { Button } from "../../components/ui";
import { Loading } from "../../components/shared";

import { DeleteIcon } from "../../assets/icons";

const Profile = () => {
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [logoutUser] = useLogoutUserMutation();
  const { username, roles } = useAuth();

  // Toggle the visibility of the user modal
  const toggleModalUser = useCallback(() => {
    setShowUser((prev) => !prev);
  }, []);

  // Handle user logout process
  const handleLogOut = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await logoutUser();
      if (res.data) {
        // On successful logout, navigate to home and reload the page
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      // Handle error if logout fails
      console.error("Logout failed:", error);
    } finally {
      // Ensure loading state is reset regardless of success or failure
      setIsLoading(false);
    }
  }, [logoutUser, navigate]);

  // Render the user modal if the user is logged in
  const renderUser = username ? (
    <div className="w-[100px] sm:w-max text-center">
      <div
        className="relative w-full sm:w-[60px] flex justify-center cursor-pointer"
        onClick={toggleModalUser}
      >
        <h1 className="text-md hover:text-orange dark:hover:text-white select-none whitespace-nowrap overflow-hidden text-ellipsis">
          {username}
        </h1>
        {showUser && (
          <div className="absolute z-50 bg-light dark:bg-gray top-14 right-0 w-[150px] flex flex-col items-center justify-center gap-y-4 border border-orange p-4">
            <div className="absolute top-3 right-3">
              <DeleteIcon onClick={toggleModalUser} />
            </div>
            {roles?.includes("admin") && (
              <Button size="s-link" design="link-basic" to={"/admin"}>
                Admin
              </Button>
            )}
            <Button
              size="s-link"
              design="link-basic"
              to={"/account/change-password"}
            >
              Đổi mật khẩu
            </Button>
            <Button size="s-link" design="link-primary" onClick={handleLogOut}>
              Log out
            </Button>
          </div>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      {isLoading && <Loading />}
      {renderUser || (
        <div className="flex space-x-4 sm:space-x-2">
          <Button size="m" design="link-primary" to={"/account/login"}>
            Đăng nhập
          </Button>
          <Button size="m" design="link-primary" to={"/account/register"}>
            Đăng ký
          </Button>
        </div>
      )}
    </>
  );
};

export default memo(Profile);
