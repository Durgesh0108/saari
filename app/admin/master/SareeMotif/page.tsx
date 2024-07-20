import React from "react";
import prismadb from "@/lib/prisma";
import ZariForm from "./_components/SareeMotifForm";
import ZariList from "./_components/SareeMotifList";

export default async function SareeMotifPage() {
  const categories = await prismadb.category.findMany({
    include: {
      SareeMotif: {
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
