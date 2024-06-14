import React from "react";
import BestPrice from "./_component/BestPriceForm";
import BestPriceList from "./_component/BestPriceList";

export default function BestPricePage() {
  return (
    <div className="flex flex-col gap-8">
      <BestPrice />
      <BestPriceList />
    </div>
  );
}
