import React from "react";
import SubTypeForm from "./_components/SubTypeForm";
import SubTypeList from "./_components/SubTypeList";

export default function SubType() {
  return (
    <div className="flex flex-col gap-8">
      <SubTypeForm />
      <SubTypeList />
    </div>
  );
}
