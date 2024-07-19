import React from "react";
import WeaveForm from "./_components/WeaveForm";
import WeaveList from "./_components/WeaveList";
import prismadb from "@/lib/prisma";

export default async function OccassionPage() {
  const weave = await prismadb.weave.findMany({})

  return (
    <div className="flex flex-col gap-8">
      <WeaveForm />
      <WeaveList weave={weave}/>
    </div>
  );
}
