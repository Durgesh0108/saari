import React from "react";
import CategoryForm from "./_components/CategoryForm";
import CategoryList from "./_components/CategoryList";

export default function OccassionPage() {
  return (
    <div className="flex flex-col gap-8">
      <CategoryForm />
      <CategoryList />
    </div>
  );
}
