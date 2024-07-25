import React from "react";
import prismadb from "@/lib/prisma";
import CategoryProductListGrid from "./_components/CategoryProductGridlist";

export default async function OccassionListPage({ params }) {
  const cate = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const product = await prismadb.product.findMany({
    where: {
      categoryId: params.categoryId,
    },
    include: {
      category: true,
      color: true,
      description: true,
      images: true,
      occassion: true,
      pattern: true,
      type: true,
      SubType: true,
      blouseColor: true,
      palluColor: true,
      fabric: true,
      blousePattern: true,
      border: true,
      borderColor: true,
      buttiType: true,
      palluMotif: true,
      sareeMotif: true,
      weave: true,
      weaveType: true,
      zari: true,
      zariColor: true,
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
      <CategoryProductListGrid
        cate={cate}
        products={product}
        category={categories}
      />
    </>
  );
}
