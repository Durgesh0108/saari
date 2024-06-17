import prismadb from "@/lib/prisma";
import React from "react";
import BestPriceListPage from "./_component/BestPriceList";

export default async function BestPricePage({ params }) {
  const bestPrice = await prismadb.bestPrice.findUnique({
    where: {
      id: params.bestPriceId,
    },
  });

  const products = await prismadb.product.findMany({
    where: {
      price: {
        gte: parseInt(bestPrice.min),
        lte: parseInt(bestPrice.max),
      },
      // AND: [
      //   {
      //     price: {
      //       gte: parseInt(bestPrice.min),
      //     },
      //   },
      //   {
      //     price: {
      //       lte: parseInt(bestPrice.max),
      //     },
      //   },
      // ],
    },
    include: {
      type: true,
      category: true,
      color: true,
      description: true,
      images: true,
      occassion: true,
      pattern: true,
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
    <div>
      <BestPriceListPage
        bestPrice={bestPrice}
        products={products}
        category={categories}
      />
    </div>
  );
}
