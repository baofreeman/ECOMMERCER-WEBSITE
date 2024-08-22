import { useState } from "react";
import { toast } from "react-toastify";

import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../api/endpoints/usersApiSlice";

import { Modal } from "../../../components/shared";
import { DeleteIcon } from "../../../assets/icons";
import { useModal } from "../../../context/ModalContext";

const UserExtent = ({ userId }) => {
  const { user } = useGetUsersQuery("allUsers", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  }); // GET user based on userId
  const { openModal, closeModal } = useModal();

  const [deleteUser] = useDeleteUserMutation();

  // Delete user.
  const handleDelete = async (userId) => {
    try {
      const res = await deleteUser({ userId });
      toast.success(res?.data?.message);
      closeModal();
    } catch (error) {
      return error;
    }
  };

  const showDeleteModal = (userId) => {
    openModal(
      <Modal
        callback={() => handleDelete(userId)}
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
        {user?.roles.map((role, index) => (
          <h1 key={index}>{role}</h1>
        ))}
      </td>
      <td className="border px-8 py-4">
        <h1>{user?.is_verified ? "true" : "false"}</h1>
      </td>
      <td
        className="border px-8 py-4"
        onClick={() => showDeleteModal(user?._id)}
      >
        <DeleteIcon />
      </td>
    </tr>
  );
};

export default UserExtent;
