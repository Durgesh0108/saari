import prismadb from "@/lib/prisma";
import React from "react";
import AttireForm from "./components/attireForm";
import AttireList from "./components/attireList";

export default async function AttirePage() {
  const DressStyles = await prismadb.dressStyle.findMany({});
  const TopViews = await prismadb.topView.findMany({});
  const attires = await prismadb.attire.findMany({
    include: {
      dressstyle: true,
      topView: true,
      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <AttireForm DressStyles={DressStyles} topViews={TopViews} />
      <AttireList
        attires={attires}
        DressStyles={DressStyles}
        TopViews={TopViews}
      />
    </div>
  );
}
