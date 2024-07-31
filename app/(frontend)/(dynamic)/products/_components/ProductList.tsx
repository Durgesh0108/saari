// *********************************************

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import ProductListing from "@/components/ui/ProductListing";
import NoProduct from "@/components/ui/NoProduct";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import FilterPanel from "@/components/FRONTEND/FilterPanel";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@mui/material";

const MAX = 20000;
const MIN = 0;
const marks = [
  { value: MIN, label: "" },
  { value: MAX, label: "" },
];

export default function ProductsList({ Types, products }) {
  const params = useParams();

  const [filters, setFilters] = useState({
    fabric: [],
    weave: [],
    type: [],
    occassion: [],
    color: [],
    zari: [],
    palluMotif: [],
    border: [],
    category: [],
    pattern: [],
    subtype: [],
    priceRange: [MIN, MAX],
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilter = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value];
      return { ...prevFilters, [filterType]: updatedFilter };
    });
  };

  const handlePriceRangeChange = (_, newValue) => {
    setFilters((prevFilters) => ({ ...prevFilters, priceRange: newValue }));
  };

  const handleRemoveFilter = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].filter((item) => item !== value),
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      fabric: [],
      weave: [],
      type: [],
      occassion: [],
      color: [],
      zari: [],
      palluMotif: [],
      border: [],
      category: [],
      pattern: [],
      subtype: [],
      priceRange: [MIN, MAX],
    });
  };

  const filteredProducts = products.filter((product) => {
    const filterConditions = [
      !filters.fabric.length || filters.fabric.includes(product.fabric?.name),
      !filters.weave.length || filters.weave.includes(product.weave?.name),
      !filters.type.length || filters.type.includes(product.type?.name),
      !filters.occassion.length ||
        filters.occassion.includes(product.occassion?.name),
      !filters.color.length || filters.color.includes(product.color?.name),
      !filters.zari.length || filters.zari.includes(product.zari?.name),
      !filters.palluMotif.length ||
        filters.palluMotif.includes(product.palluMotif?.name),
      !filters.border.length || filters.border.includes(product.border?.name),
      !filters.category.length ||
        filters.category.includes(product.category?.name),
      !filters.pattern.length ||
        filters.pattern.includes(product.pattern?.name),
      !filters.subtype.length ||
        filters.subtype.includes(product.SubType?.name),
      product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1],
    ];

    return filterConditions.every((condition) => condition);
  });

  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const toggleFilter = () => setFilterIsOpen((current) => !current);

  return (
    <div className="no-scrollbar z-10">
      <div>
        <Image
          src="https://res.cloudinary.com/dttieobbt/image/upload/v1718444371/kdfbqrm9nldxuprnxz1a.jpg"
          alt={Types.name}
          width={1000}
          height={500}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="hidden md:flex">
        <div className="grid grid-cols-8 container">
          <FilterPanel
            results={products}
            filters={filters}
            setFilters={setFilters}
            handleResetFilters={handleResetFilters}
          />
          <div className="col-span-6 p-4">
            <div className="flex items-center justify-between sticky top-20 z-40 bg-white">
              <h1 className="text-3xl font-bold m-4 ml-0 uppercase px-4">
                {Types?.name}
              </h1>
            </div>
            <Suspense
              fallback={Array(6).map((_, index) => (
                <Card key={index}>
                  <Skeleton
                    variant="rectangular"
                    height={100}
                    width={100}
                    className="rounded-md"
                  />
                  <Skeleton
                    variant="rectangular"
                    height={10}
                    width={100}
                    className="rounded-md"
                  />
                  <Skeleton
                    variant="rectangular"
                    height={10}
                    width={20}
                    className="rounded-md"
                  />
                </Card>
              ))}
            >
              <div>
                {filteredProducts.length > 0 ? (
                  <ProductListing products={filteredProducts} />
                ) : (
                  <div className="py-12 px-4 h-screen overflow-auto no-scrollbar">
                    <NoProduct />
                  </div>
                )}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
      <div className="flex md:hidden justify-center">
        <div>
          <div className="flex items-center p-4 w-full">
            <div className="flex justify-start">
              <Button
                // className="bg-pink-300 text-white rounded"
                className="bg-transparent hover:bg-transparent"
                onClick={toggleFilter}
              >
                {/* Filters */}
                <SlidersHorizontal fill="black" className="text-black" />
              </Button>
            </div>
            <div className="flex justify-center w-full">
              <h1 className="text-3xl font-bold m-4 ml-0 uppercase px-4">
                {Types?.name}
              </h1>
            </div>
          </div>
          {/* {Object.entries(filters).length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2 md:px-4">
              {Object.entries(filters).map(([filterType, values]) =>
                values.map((value) => (
                  <div
                    key={`${filterType}-${value}`}
                    className="bg-gray-200 p-2 rounded flex items-center"
                  >
                    <span>{value}</span>
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => handleRemoveFilter(filterType, value)}
                    >
                      &times;
                    </button>
                  </div>
                ))
              )}
            </div>
          )} */}
          <div
            className={cn(
              "fixed top-16 left-0 h-screen bg-white duration-700 overflow-auto z-10",
              filterIsOpen ? "w-64" : "w-0"
            )}
          >
            <div className="flex flex-col gap-4 h-full text-black">
              <div className="flex justify-between items-center p-4">
                <h2 className="font-bold text-xl invisible">Filters</h2>
                <X onClick={toggleFilter} />
              </div>
              <FilterPanel
                results={products}
                filters={filters}
                setFilters={setFilters}
                handleResetFilters={handleResetFilters}
              />
            </div>
          </div>
          <div className="col-span-6 border-2 p-4">
            {filteredProducts.length > 0 ? (
              <ProductListing products={filteredProducts} />
            ) : (
              <div className="py-12 px-4 h-screen overflow-auto no-scrollbar">
                <NoProduct />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    // <FilterPanel
    //             results={products}
    //             filters={filters}
    //             setFilters={setFilters}
    //             handleResetFilters={handleResetFilters}
    //           />
    // <div className="no-scrollbar z-10">
    //   <div>
    //     <Image
    //       src="https://res.cloudinary.com/dttieobbt/image/upload/v1718444371/kdfbqrm9nldxuprnxz1a.jpg"
    //       alt={Types.name}
    //       width={1200}
    //       height={500}
    //       className="w-full object-cover md:h-[650px] h-[400px]"
    //       loading="lazy"
    //     />
    //   </div>

    //   <div className="lg:hidden p-4 flex justify-end items-center">
    //     <Button onClick={toggleFilter}>Filter</Button>
    //   </div>

    //   <div className="grid grid-cols-8 p-4 lg:p-10 gap-4 lg:gap-10">
    //     <div
    //       className={cn(
    //         "col-span-8 lg:col-span-2 bg-white z-10 fixed lg:sticky inset-0 h-screen overflow-y-auto transition-transform transform lg:transform-none",
    //         filterIsOpen ? "translate-x-0" : "translate-x-full"
    //       )}
    //     >
    //       <div className="flex justify-end p-4 lg:hidden">
    //         <Button onClick={toggleFilter}>
    //           <X />
    //         </Button>
    //       </div>

    //     </div>

    //     <div className="col-span-8 lg:col-span-6">
    //       {filters.priceRange[0] > MIN ||
    //       filters.priceRange[1] < MAX ||
    //       Object.values(filters).some(
    //         (filterArray) => filterArray.length > 0
    //       ) ? (
    //         <div className="my-4 flex flex-wrap gap-2">
    //           {Object.entries(filters).map(([filterType, values]) => {
    //             if (filterType === "priceRange") {
    //               return (
    //                 <>
    //                   {filters.priceRange[0] > MIN && (
    //                     <Button
    //                       key="min-price"
    //                       variant="outline"
    //                       className="flex items-center gap-2"
    //                       onClick={() =>
    //                         setFilters((prev) => ({
    //                           ...prev,
    //                           priceRange: [MIN, prev.priceRange[1]],
    //                         }))
    //                       }
    //                     >
    //                       Min Price: {filters.priceRange[0]} <X size={14} />
    //                     </Button>
    //                   )}
    //                   {filters.priceRange[1] < MAX && (
    //                     <Button
    //                       key="max-price"
    //                       variant="outline"
    //                       className="flex items-center gap-2"
    //                       onClick={() =>
    //                         setFilters((prev) => ({
    //                           ...prev,
    //                           priceRange: [prev.priceRange[0], MAX],
    //                         }))
    //                       }
    //                     >
    //                       Max Price: {filters.priceRange[1]} <X size={14} />
    //                     </Button>
    //                   )}
    //                 </>
    //               );
    //             } else {
    //               return values.map((value) => (
    //                 <Button
    //                   key={value}
    //                   variant="outline"
    //                   className="flex items-center gap-2"
    //                   onClick={() => handleRemoveFilter(filterType, value)}
    //                 >
    //                   {value} <X size={14} />
    //                 </Button>
    //               ));
    //             }
    //           })}
    //         </div>
    //       ) : null}

    //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    //         {filteredProducts.length > 0 ? (
    //           // filteredProducts.map((product) => (
    //           <ProductListing products={filteredProducts} />
    //         ) : (
    //           // ))
    //           <NoProduct />
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

// ****************************************************************
