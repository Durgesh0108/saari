import React from "react";
import OccassionPage from "./_component/OccassionPage";
import prismadb from "@/lib/prisma";

export default async function OccassionListPage({ params }) {
  const occassion = await prismadb.occassion.findUnique({
    where: {
      id: params.occassionId,
    },
  });

  const product = await prismadb.product.findMany({
    where: {
      occassionId: params.occassionId,
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
      <OccassionPage Occassion={occassion} products={product} />
    </>
  );
}
