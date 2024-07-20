import React from "react";
import prismadb from "@/lib/prisma";
import ZariForm from "./_components/ZariForm";
import ZariList from "./_components/ZariList";

export default async function OccassionPage() {
  const categories = await prismadb.category.findMany({
    include: {
      Zari: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <ZariForm categories={categories} />
      <ZariList categories={categories} />
    </div>
  );
}
