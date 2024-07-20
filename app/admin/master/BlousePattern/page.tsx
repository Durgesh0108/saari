import React from "react";
import prismadb from "@/lib/prisma";
import BlousePatternForm from "./_components/BlousePattern";
import BlousePatternList from "./_components/BlousePatternList";

export default async function BlousePatternPage() {
  const categories = await prismadb.category.findMany({
    include: {
      BlousePattern: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <BlousePatternForm categories={categories} />
      <BlousePatternList categories={categories} />
    </div>
  );
}
