import React from "react";
import TypeForm from "./_components/TypeForm";
import TypeList from "./_components/TypeList";

export default function OccassionPage() {
  return (
    <div className="flex flex-col gap-8">
      <TypeForm />
      <TypeList />
    </div>
  );
}
