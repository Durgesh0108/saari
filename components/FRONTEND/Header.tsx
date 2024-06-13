import prismadb from "@/lib/prisma";
import React from "react";
import Navbar from "./navbar";
import { cookieHandler } from "@/lib/cookieHandler";

export default async function Header() {
  const userId = cookieHandler.get("userId");

  const products = await prismadb.product.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      category: {
        include: {
          Pattern: true,
          Product: true,
          Type: true,
        },
      },
      color: true,
      description: true,
      images: true,
      occassion: true,
      pattern: true,
      type: true,
    },
  });

  // const user = await prismadb.user.findUnique({
  //   where: {
  //     id: userId,
  //   },
  //   include: {
  //     cartItems: true,
  //   },
  // });
  return (
    <>
      <Navbar products={products} />
    </>
  );
}
