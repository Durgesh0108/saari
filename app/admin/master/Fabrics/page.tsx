import React from "react";
import FabricForm from "./_components/FabricForm";
import FabricList from "./_components/FabricList";

export default function FabricPage() {
  return (
    <div className="flex flex-col gap-8">
      <FabricForm />
      <FabricList />
    </div>
  );
}
