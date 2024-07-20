import React from "react";
import prismadb from "@/lib/prisma";
import ButtiTypeForm from "./_components/ButtiTypeForm";
import ButtiTypeList from "./_components/ButtiTypeList";

export default async function ButtiTypePage() {
  const categories = await prismadb.category.findMany({
    include: {
      ButtiType: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <ButtiTypeForm categories={categories} />
      <ButtiTypeList categories={categories} />
    </div>
  );
}
