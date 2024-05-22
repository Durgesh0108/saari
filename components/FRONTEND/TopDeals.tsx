"use client";

import React, { useEffect, useState } from "react";

import { getProducts } from "@/actions/products/getProducts";
import LoaderCard from "./LoaderCard";
import ProductSlider from "./ProductSlider";

// import { getProducts } from "@/actions/server/Product/Product/product";

export default function TopDeals() {
  const [isLoading, setIsLoading] = useState(true);
  const [topTenProducts, setTopTenProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productRes = await fetch(`/api/website/product`, {
        next: { revalidate: 60 * 60 },
      });

      const products = await productRes.json();
      await setTopTenProducts(products.slice(0, 10));
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1 className="py-4 font-medium text-[18px] w-fit">
          <span>TOP DEALS</span>
          <hr className="w-3/4 mt-2 border-[1px] border-[#00aecd]" />
        </h1>
        <div className="grid grid-cols-3 md:hidden gap-4 h-fit">
          {[{}, {}, {}].map((brand, index) => (
            <LoaderCard key={index} />
          ))}
        </div>
        <div className="hidden lg:hidden md:grid md:grid-cols-6 gap-4 h-fit">
          {[{}, {}, {}, {}, {}, {}].map((brand, index) => (
            <LoaderCard key={index} />
          ))}
        </div>
        <div className="hidden lg:grid lg:grid-cols-8 gap-4 h-fit">
          {[{}, {}, {}, {}, {}, {}, {}, {}].map((brand, index) => (
            <LoaderCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="py-4 font-medium text-[18px] w-fit">
        <span>TOP DEALS</span>
        <hr className="w-3/4 mt-2 border-[1px] border-[#00aecd]" />
      </h1>

      <ProductSlider topTenProducts={topTenProducts} />
    </div>
  );
}
