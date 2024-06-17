import prismadb from "@/lib/prisma";
import React from "react";
import Navbar from "./navbar";
import { cookieHandler } from "@/lib/cookieHandler";

export default async function Header() {
  const products = await prismadb.product.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      category: {
        include: {
          Pattern: true,
          Product: true,
          Type: {
            include: {
              SubType: true,
            },
          },
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

  const categories = await prismadb.category.findMany({
    where: {
      name: {
        not: "Gift Card",
      },
    },
    include: {
      Pattern: true,
      Type: {
        include: {
          SubType: true,
        },
      },
    },

    // take: 3,
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
      <Navbar products={products} categories={categories} />
    </>
  );
}
