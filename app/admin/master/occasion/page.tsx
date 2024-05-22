import React from "react";
import OccassionForm from "./_components/OccassionForm";
import OccassionList from "./_components/OccassionList";

export default function OccassionPage() {
  return (
    <div className="flex flex-col gap-8">
      <OccassionForm />
      <OccassionList />
    </div>
  );
}
