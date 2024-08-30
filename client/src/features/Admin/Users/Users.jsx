import { useGetUsersQuery } from "../../../api/endpoints/usersApiSlice";
import { Loading } from "../../../components/shared";
import UserExtent from "./UserExtent";

const Users = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useGetUsersQuery("allUsers", {
    refetchOnMountOrArgChange: true,
  }); // GET all Users.
  let user;

  if (isLoading) return <Loading />;
  user =
    users.ids?.length > 0
      ? users.ids.map((userId) => <UserExtent key={userId} userId={userId} />)
      : (user = (
          <div className="w-full flex items-center justify-center">
            <h1>Không có người dùng</h1>
          </div>
        ));

  if (isSuccess)
    return (
      <div className="p-10 w-full">
        <section className="w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left px-8 py-4">UID</th>
                <th className="text-left px-8 py-4">Email</th>
                <th className="text-left px-8 py-4">Tên người dùng</th>
                <th className="text-left px-8 py-4">Vai trò</th>
                <th className="text-left px-8 py-4">Trạng thái</th>
                <th className="text-left px-8 py-4"></th>
              </tr>
            </thead>
            <tbody>{user}</tbody>
          </table>
        </section>
      </div>
    );
};

export default Users;
