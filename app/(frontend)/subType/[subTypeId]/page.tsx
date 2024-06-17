import React from "react";
import prismadb from "@/lib/prisma";
import SubTypeListPage from "./_components/SubTypeListPage";

export default async function SubTypePage({ params }) {
  const SubTypes = await prismadb.subType.findUnique({
    where: {
      id: params.subTypeId,
    },
  });

  const product = await prismadb.product.findMany({
    where: {
      subTypeId: params.subTypeId,
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
      <SubTypeListPage SubTypes={SubTypes} products={product} category={categories}/>
    </>
  );
}
