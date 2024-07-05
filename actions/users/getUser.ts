"use server";
import prismadb from "@/lib/prisma";

const GetUser = async (userId) => {
  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export default GetUser;
