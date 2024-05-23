import React from "react";
import PatternForm from "./_components/PatternForm";
import PatternList from "./_components/PatternList";

export default function OccassionPage() {
  return (
    <div className="flex flex-col gap-8">
      <PatternForm />
      <PatternList />
    </div>
  );
}
