import prismadb from "@/lib/prisma";

export const GetUser = async (userId) => {
  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};
