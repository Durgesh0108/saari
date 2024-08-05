import prismadb from "@/lib/prisma";
import UserListPage from "./UserListPage";

const UsersPage = async () => {
  const users = await prismadb.user.findMany({});
  return (
    <>
      <UserListPage user={users} />
    </>
  );
};

export default UsersPage;
