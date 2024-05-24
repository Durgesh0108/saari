import React from "react";
import SliderForm from "./_components/SliderForm";
import SliderList from "./_components/SliderList";

export default function SliderPage() {
  return (
    <div className="flex flex-col gap-8">
      <SliderForm />
      <SliderList />
    </div>
  );
}
