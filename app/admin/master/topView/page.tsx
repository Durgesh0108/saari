import React from "react";

import TopViewForm from "./components/topViewForm";
import prismadb from "@/lib/prisma";
import TopViewList from "./components/topViewList";

export default async function TopViewPage() {
  const topViews = await prismadb.topView.findMany({});
  return (
    <div className="flex flex-col gap-8">
      <TopViewForm />
      <TopViewList topViews={topViews} />
    </div>
  );
}
