import React from "react";

import ColorListPage from "./_component/ColorListPage";
import prismadb from "@/lib/prisma";

export default async function ColorPage({ params }) {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  const product = await prismadb.product.findMany({
    where: {
      colorId: params.colorId,
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
      <ColorListPage Color={color} products={product} category={categories}/>
    </>
  );
}
