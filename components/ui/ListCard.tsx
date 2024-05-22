import React from "react";
import { Card } from "./Card";

export default function ListCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className: String | "";
}) {
  return (
    <Card
      className={`px-4 py-2 dark:bg-slate-500 dark:hover:bg-slate-600 hover:bg-slate-100 dark:text-white text-black flex justify-between  ${className}`}
    >
      {children}
    </Card>
  );
}
