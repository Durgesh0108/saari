import prismadb from "@/lib/prisma";
import React from "react";
import Navbar from "./navbar";

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
  return (
    <>
      <Navbar products={products} />
    </>
  );
}
