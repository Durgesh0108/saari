"use client";

import React, { useEffect, useState } from "react";

// import { getBrands } from "@/actions/server/Product/Brands/brands";
import { getBrands } from "@/actions/brands/getBrands";
import Loader from "../Loader";
import LoaderCard from "./LoaderCard";
import BrandSlider from "./BrandSlider";

export default function Brands() {
  const [topTenBrands, setTopTenBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      // const data = await getBrands();
      const brandsRes = await fetch(`/api/brands`, {
        next: { revalidate: 60 },
        // cache: "force-cache",
      });

      const brands = await brandsRes.json();
      await setTopTenBrands(brands.slice(0, 10));

      console.log("brands slider",brands)
      setIsLoading(false);
    };
    fetchBrands();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1 className="py-4 font-medium text-[18px] w-fit">
          <span>BRANDS</span>
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

  // const brandsRes = await fetch(`http://localhost:3000/api/brands`, {
  //   next: { revalidate: 60 * 60 },
  // });

  // const brands = await brandsRes.json();

  return (
    <div>
      <h1 className="py-4 font-medium text-[18px] w-fit">
        <span>BRANDS</span>
        <hr className="w-3/4 mt-2 border-[1px] border-[#00aecd]" />
      </h1>
      <BrandSlider topTenBrands={topTenBrands} />
    </div>
  );
}
