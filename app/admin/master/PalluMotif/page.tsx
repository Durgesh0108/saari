import React from "react";
import prismadb from "@/lib/prisma";
import PalluMotifForm from "./_components/PalluMotifForm";
import PalluMotifList from "./_components/PalluMotifList";

export default async function OccassionPage() {
  const categories = await prismadb.category.findMany({
    include: {
      PalluMotif: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <PalluMotifForm categories={categories} />
      <PalluMotifList categories={categories} />
    </div>
  );
}
