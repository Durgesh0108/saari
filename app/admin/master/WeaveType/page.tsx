import React from "react";
import prismadb from "@/lib/prisma";
import WeaveTypeForm from "./_components/WeaveTypeForm";
import WeaveTypeList from "./_components/WeaveTypeList";

export default async function OccassionPage() {
  const weaveType = await prismadb.weaveType.findMany({});

  const weaves = await prismadb.weave.findMany({
    include: {
      WeaveType: true,
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <WeaveTypeForm weave={weaves} />
      <WeaveTypeList weaves={weaves} />
    </div>
  );
}
