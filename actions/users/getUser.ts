"use server";

import prismadb from "@/lib/prisma";

export const GetUser = async (userId) => {
  const users = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
  });
  return users;
};
