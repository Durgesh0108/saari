import React from "react";
import TypeListPage from "./_component/TypeListPage";
import prismadb from "@/lib/prisma";

export default async function TypePage({ params, searchParams }) {
  const type = await prismadb.type.findUnique({
    where: {
      id: params.typeId,
    },
  });

  const product = await prismadb.product.findMany({
    where: {
      typeId: params.typeId,
    },
    include: {
      category: true,
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
  return (
    <>
      <TypeListPage Types={type} products={product} category={categories} />
    </>
  );
}
