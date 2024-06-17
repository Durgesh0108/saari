import Image from "next/image";
import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="hover:scale-110 z-50 duration-700 group">
      <div className="rounded-tl-[100px] rounded-br-2xl h-72 relative -top-5">
        <Image
          src={product.images[0].url}
          alt={product.name}
          height={1}
          width={1000}
          className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
        />
      </div>
      <div className="group-hover:scale-110 group-hover:ml-3 duration-700 text-[20px]">
        {product.name}
      </div>
    </div>
  );
}
