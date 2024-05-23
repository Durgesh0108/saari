import React from "react";
import ColorForm from "./_components/ColorForm";
import ColorList from "./_components/ColorList";

export default function OccassionPage() {
  return (
    <div className="flex flex-col gap-8">
      <ColorForm />
      <ColorList />
    </div>
  );
}
