import { useState } from "react";
import { toast } from "react-toastify";

import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../../api/endpoints/usersApiSlice";

import { Modal } from "../../../components/shared";
import { DeleteIcon } from "../../../assets/icons";
import { useModal } from "../../../context/ModalContext";
import { ROLES } from "../../../constants";
import { Button } from "../../../components/ui";

const UserExtent = ({ userId }) => {
  const { user } = useGetUsersQuery("allUsers", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  }); // GET user based on userId
  const { openModal, closeModal } = useModal();
  const [roles, setRoles] = useState(user?.roles || ["user"]);

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleChange = (e) => {
    const selectedRole = e.target.value;
    setRoles((prevRoles) =>
      prevRoles.includes(selectedRole)
        ? prevRoles.filter((role) => role !== selectedRole)
        : [...prevRoles, selectedRole]
    );
  };

  // Update user
  const handleUpdate = async () => {
    try {
      const res = await updateUser({ userId, roles });
      toast.success(res?.data?.message);
    } catch (error) {
      return error;
    }
  };

  // Delete user
  const handleDelete = async () => {
    try {
      const res = await deleteUser(userId);
      toast.success(res?.data?.message);
      closeModal();
    } catch (error) {
      return error;
    }
  };

  const showDeleteModal = () => {
    openModal(
      <Modal
        callback={handleDelete}
        data={userId}
        title={"Bạn có muốn xóa người dùng khỏi hệ thống?"}
      />
    );
  };

  return (
    <tr>
      <td className="border px-8 py-4">{user?._id}</td>
      <td className="border px-8 py-4 whitespace-nowrap">{user?.email}</td>
      <td className="border px-8 py-4">
        <h1>{user?.username}</h1>
      </td>
      <td className="border px-8 py-4">
        {ROLES.map((role, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`role-${role}`}
              value={role}
              checked={roles.includes(role)}
              onChange={handleChange}
            />
            <label htmlFor={`role-${role}`} className="ml-2 uppercase">
              {role}
            </label>
          </div>
        ))}
        <Button
          size="s"
          design="link-basic"
          disabled={isLoading}
          onClick={handleUpdate}
        >
          Cập nhật
        </Button>
      </td>
      <td className="border px-8 py-4">
        <h1>{user?.is_verified ? "true" : "false"}</h1>
      </td>
      <td className="border px-8 py-4" onClick={showDeleteModal}>
        <DeleteIcon />
      </td>
    </tr>
  );
};

export default UserExtent;
