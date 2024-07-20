import React from "react";
import prismadb from "@/lib/prisma";
import BorderForm from "./_components/BorderForm";
import BorderList from "./_components/BorderList";

export default async function OccassionPage() {
  const categories = await prismadb.category.findMany({
    include: {
      Border: true,
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <BorderForm categories={categories} />
      <BorderList categories={categories} />
    </div>
  );
}
