import React from "react";
import Navbar from "./navbar";
import ProductCategory from "./ProductCategory";

export default function Header() {
  return (
    <div className="sticky top-0 bg-white z-50">
      <Navbar />
      <ProductCategory />
    </div>
  );
}
