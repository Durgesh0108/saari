import React from "react";
import TypeListPage from "./_component/TypeListPage";
import prismadb from "@/lib/prisma";

export default async function TypePage({ params }) {
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
  return (
    <>
      <TypeListPage Types={type} products={product} />
    </>
  );
}
