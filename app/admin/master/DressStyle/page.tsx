import React from "react";
import DressStyleForm from "./components/DressStyleForm";
import DressStyleList from "./components/DressStyleList";
import prismadb from "@/lib/prisma";

export default async function DressStylePage() {
  const DressStyles = await prismadb.dressStyle.findMany({});
  return (
    <div className="flex flex-col gap-8">
      <DressStyleForm />
      <DressStyleList DressStyles={DressStyles} />
    </div>
  );
}
