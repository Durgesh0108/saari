"use client";

import { useState } from "react";
import Image from "next/image";
import ProductListing from "@/components/ui/ProductListing";
import NoProduct from "@/components/ui/NoProduct";
import FilterPanel from "@/components/FRONTEND/FilterPanel";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX = 20000;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: "",
  },
  {
    value: MAX,
    label: "",
  },
];

export default function SearchResultListingPage({ results, similarResults }) {
  // const [filters, setFilters] = useState({
  //   category: [],
  //   occassion: [],
  //   type: [],
  //   subtype: [],
  //   pattern: [],
  //   color: [],
  // });

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
    priceRange: [MIN, MAX], // Add price range to filters
  });

  const handleRemoveFilter = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].filter((item) => item !== value),
    }));
  };

  // const handleRemoveFilter = (filterType, valueToRemove) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [filterType]: prevFilters[filterType].filter(
  //       (value) => value !== valueToRemove
  //     ),
  //   }));
  // };

  // const handleResetFilters = () => {
  //   setFilters({
  //     category: [],
  //     color: [],
  //     type: [],
  //     occassion: [],
  //     pattern: [],
  //     subtype: [],
  //     priceRange: [MIN, MAX],
  //   });
  // };

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

  const filteredProducts = results.filter((product) => {
    const fabricFilter =
      !filters.fabric.length || filters.fabric.includes(product.fabric.name);

    const weaveFilter =
      !filters.weave.length || filters.weave.includes(product.weave.name);

    const typeFilter =
      !filters.type.length || filters.type.includes(product.type.name);

    const occassionFilter =
      !filters.occassion.length ||
      filters.occassion.includes(product.occassion.name);

    const colorFilter =
      !filters.color.length || filters.color.includes(product.color.name);

    const zariFilter =
      !filters.zari.length || filters.zari.includes(product.zari.name);

    // const palluMotifFilter =
    //   !filters.palluMotif.length ||
    //   filters.palluMotif.includes(product.palluMotif.name);

    const borderFilter =
      !filters.border.length || filters.border.includes(product.border.name);

    const categoryFilter =
      !filters.category.length ||
      filters.category.includes(product.category.name);

    const patternFilter =
      !filters.pattern.length || filters.pattern.includes(product.pattern.name);

    const subtypeFilter =
      !filters.subtype.length || filters.subtype.includes(product.subType.name);

    const priceFilter =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];

    return (
      fabricFilter &&
      weaveFilter &&
      typeFilter &&
      occassionFilter &&
      colorFilter &&
      zariFilter &&
      // palluDesignFilter &&
      borderFilter &&
      categoryFilter &&
      patternFilter &&
      subtypeFilter &&
      priceFilter
    );
  });

  // const filteredProducts = results.filter((product) => {
  //   const colorFilter =
  //     !filters.color.length || filters.color.includes(product.color.name);
  //   const categoryFilter =
  //     !filters.category.length ||
  //     filters.category.includes(product.category.name);
  //   const typeFilter =
  //     !filters.type.length || filters.type.includes(product.type.name);
  //   const occassionFilter =
  //     !filters.occassion.length ||
  //     filters.occassion.includes(product.occassion.name);
  //   const patternFilter =
  //     !filters.pattern.length || filters.pattern.includes(product.pattern.name);
  //   const subtypeFilter =
  //     !filters.subtype.length || filters.subtype.includes(product.subType.name);
  //   const priceFilter =
  //     product.price >= filters.priceRange[0] &&
  //     product.price <= filters.priceRange[1];

  //   return (
  //     colorFilter &&
  //     categoryFilter &&
  //     typeFilter &&
  //     occassionFilter &&
  //     patternFilter &&
  //     subtypeFilter &&
  //     priceFilter
  //   );
  // });

  // const handleResetFilters = () => {
  //   setFilters({
  //     category: [],
  //     occassion: [],
  //     type: [],
  //     subtype: [],
  //     pattern: [],
  //     color: [],
  //   });
  // };

  // const filteredResults = results.filter((product) => {
  //   const colorFilter =
  //     !filters.color.length || filters.color.includes(product.color.name);
  //   const categoryFilter =
  //     !filters.category.length ||
  //     filters.category.includes(product.category.name);
  //   const typeFilter =
  //     !filters.type.length || filters.type.includes(product.type.name);
  //   const occassionFilter =
  //     !filters.occassion.length ||
  //     filters.occassion.includes(product.occassion.name);
  //   const patternFilter =
  //     !filters.pattern.length || filters.pattern.includes(product.pattern.name);
  //   const subtypeFilter =
  //     !filters.subtype.length || filters.subtype.includes(product.SubType.name);

  //   return (
  //     colorFilter &&
  //     categoryFilter &&
  //     typeFilter &&
  //     occassionFilter &&
  //     patternFilter &&
  //     subtypeFilter
  //   );
  // });

  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const toggleFilter = () => setFilterIsOpen((current) => !current);

  // if (!results || results.length === 0) {
  //   return <NoProduct />;
  // }

  return (
    <div className="no-scrollbar z-10">
      <div>
        <Image
          src="https://res.cloudinary.com/dttieobbt/image/upload/v1718444371/kdfbqrm9nldxuprnxz1a.jpg"
          alt="banner"
          width={1000}
          height={500}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="hidden md:flex">
        <div className="grid grid-cols-8 container">
          {/* FilterPanel component */}
          <FilterPanel
            results={results}
            filters={filters}
            setFilters={setFilters}
            handleResetFilters={handleResetFilters}
          />
          <div className="col-span-6 p-4">
            <div className="specified">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold m-4 ml-0 uppercase px-4">
                  Search Result
                </h1>
              </div>
              {/* <div className="mb-4 flex flex-wrap gap-2 px-4">
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
            </div> */}
              <div>
                {/* Display filtered results */}
                {filteredProducts.length > 0 ? (
                  <ProductListing products={filteredProducts} />
                ) : (
                  <div className="py-12 px-4 h-screen overflow-auto no-scrollbar">
                    <NoProduct />
                  </div>
                )}
              </div>
            </div>
            <div className="similar">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold m-4 ml-0 uppercase px-4">
                  Similar Result
                </h1>
              </div>

              <div>
                {/* Display filtered results */}
                {similarResults.length > 0 ? (
                  <ProductListing products={similarResults} />
                ) : (
                  <div className="py-12 px-4 h-screen overflow-auto no-scrollbar">
                    <NoProduct />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile view */}
      <div className="flex md:hidden justify-center">
        <div className="">
          <div className="flex justify-between items-center p-4">
            <div>
              <Button
                className="bg-pink-300 text-white rounded"
                onClick={toggleFilter}
              >
                Filters
              </Button>
            </div>
            <div>
              <h1 className="text-xl font-bold uppercase">Search Result</h1>
            </div>
          </div>
          {/* Display active filters on mobile */}
          {Object.entries(filters).length > 0 && (
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
          )}
          {/* Filter panel for mobile */}
          <div
            className={cn(
              "fixed top-16 left-0 h-screen bg-white duration-700 overflow-auto z-10",
              filterIsOpen ? "w-64" : "w-0"
            )}
          >
            <div className="flex flex-col gap-4  h-full text-black">
              <div className="flex justify-between items-center p-4">
                <h2 className="font-bold text-xl invisible">Filters</h2>
                <X onClick={toggleFilter} />
              </div>
              {/* FilterPanel component for mobile */}
              <FilterPanel
                results={results}
                filters={filters}
                setFilters={setFilters}
                handleResetFilters={handleResetFilters}
              />
            </div>
          </div>
          {/* Display filtered results on mobile */}
          <div className="col-span-6 border-2 p-4">
            {filteredProducts.length > 0 ? (
              <ProductListing products={filteredProducts} />
            ) : (
              <div className="py-12 px-4 h-screen overflow-auto no-scrollbar">
                {filteredProducts.length === 0 && <NoProduct />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
