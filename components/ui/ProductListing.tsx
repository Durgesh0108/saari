import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductListing({ products }) {
  return (
    <div className="grid grid-cols-3 gap-8  py-12 px-4 h-screen max-h-[800px] overflow-auto no-scrollbar">
      {products.map((product, index) => (
        <Link key={index} href={`/product/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}
