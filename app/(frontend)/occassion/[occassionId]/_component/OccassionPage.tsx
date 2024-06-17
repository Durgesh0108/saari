// @ts-nocheck

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import ProductListing from "@/components/ui/ProductListing";
import NoProduct from "@/components/ui/NoProduct";

export default function OccassionPage({ Occassion, products, category }) {
  const params = useParams();

  //   const [Occassion, setOccassion] = useState([]);
  //   const [products, setProducts] = useState([]);
  const [distinctColors, setDistinctColors] = useState([]);
  const [distinctTypes, setDistinctTypes] = useState([]);
  const [distinctCategories, setDistinctCategories] = useState([]);
  const [distinctOccasions, setDistinctOccasions] = useState([]);
  const [distinctPatterns, setDistinctPatterns] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    color: [],
    type: [],
    occasion: [],
    pattern: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const colors = products.map((product) => product.color.name);
      setDistinctColors(Array.from(new Set(colors)));

      const categories = products.map((product) => product.category.name);
      setDistinctCategories(Array.from(new Set(categories)));

      const occasions = products.map((product) => product.occassion.name);
      setDistinctOccasions(Array.from(new Set(occasions)));

      const types = products.map((product) => product.type.name);
      setDistinctTypes(Array.from(new Set(types)));

      const patterns = products.map((product) => product.pattern.name);
      setDistinctPatterns(Array.from(new Set(patterns)));
    };

    fetchProducts();
  }, [params.occassionId]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      let updatedFilter = [...prevFilters[filterType]];
      if (updatedFilter.includes(value)) {
        updatedFilter = updatedFilter.filter((item) => item !== value);
      } else {
        updatedFilter.push(value);
      }
      return { ...prevFilters, [filterType]: updatedFilter };
    });
  };

  const handleRemoveFilter = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].filter((item) => item !== value),
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: [],
      color: [],
      type: [],
      occasion: [],
      pattern: [],
    });
  };

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const res = await fetch(`/api/occassion/${params.occassionId}`);
  //     const occassions = await res.json();
  //     setOccassion(occassions);
  //   };

  //   fetchProducts();
  // }, [params.occassionId]);

  const filteredProducts = products.filter((product) => {
    const colorFilter =
      !filters.color.length || filters.color.includes(product.color.name);
    const categoryFilter =
      !filters.category.length ||
      filters.category.includes(product.category.name);
    const typeFilter =
      !filters.type.length || filters.type.includes(product.type.name);
    const occasionFilter =
      !filters.occasion.length ||
      filters.occasion.includes(product.occassion.name);
    const patternFilter =
      !filters.pattern.length || filters.pattern.includes(product.pattern.name);

    return (
      colorFilter &&
      categoryFilter &&
      typeFilter &&
      occasionFilter &&
      patternFilter
    );
  });

  return (
    <div className=" no-scrollbar z-10">
      <div className=" ">
        {Occassion.bannerUrl && (
          <Image
            src={Occassion.bannerUrl}
            alt={Occassion.name}
            width={1000}
            height={1}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="">
        <div className="grid grid-cols-8 container  ">
          <div className="col-span-2  h-full p-8 sticky ">
            <h1 className="text-3xl font-bold mb-4">Filters</h1>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-medium">
                  CATEGORY
                </AccordionTrigger>
                <AccordionContent className="text-lg font-medium">
                  {/* <div>
                      {distinctCategories.map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            id={category}
                            name="category"
                            value={category}
                            checked={filters.category.includes(category)}
                            onChange={(e) =>
                              handleFilterChange("category", e.target.value)
                            }
                          />
                          <label htmlFor={category} className="ml-2">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div> */}
                  <div>
                    <Accordion type="single" collapsible>
                      {category.map((cate, index) => (
                        <div key={index}>
                          <AccordionItem
                            value={`item-${index + 1}`}
                            className="border-0"
                          >
                            <AccordionTrigger className="text-xl font-medium py-2">
                              <div className="group/category w-fit ml-2">
                                <Link href={`/category/${cate.id}/products`}>
                                  <div>{cate.name}</div>
                                  <div
                                    className={`duration-300 w-0  group-hover/category:w-full rounded-full border-b-2 border-b-black `}
                                  ></div>
                                </Link>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-lg font-medium pb-2">
                              <div>
                                <Accordion type="single" collapsible>
                                  {cate.Type.map((type, index) => (
                                    <div key={index} className=" ml-4">
                                      <AccordionItem
                                        value={`item-${index + 1}`}
                                        className="border-0"
                                      >
                                        <AccordionTrigger className="text-xl font-medium py-2">
                                          <div className="group/type w-fit">
                                            <Link href={`/type/${type.id}`}>
                                              <div className="">
                                                {type.name}
                                              </div>
                                              <div
                                                className={`duration-300 w-0  group-hover/type:w-full rounded-full border-b-2 border-b-black `}
                                              ></div>
                                            </Link>
                                          </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-lg font-medium ">
                                          <div>
                                            {type.SubType.map(
                                              (subtype, index) => (
                                                <div
                                                  key={index}
                                                  className=" ml-6 group/subtype w-fit"
                                                >
                                                  <Link
                                                    href={`/subType/${subtype.id}`}
                                                  >
                                                    <div>{subtype.name}</div>
                                                    <div
                                                      className={`duration-300 w-0  group-hover/subtype:w-full rounded-full border-b-2 border-b-black `}
                                                    ></div>
                                                  </Link>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    </div>
                                  ))}
                                </Accordion>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </div>
                      ))}
                    </Accordion>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl font-medium ">
                  OCCASION
                </AccordionTrigger>
                <AccordionContent className="text-lg font-medium">
                  <div>
                    {distinctOccasions.map((occasion) => (
                      <div key={occasion} className="flex items-center">
                        <input
                          type="checkbox"
                          id={occasion}
                          name="occasion"
                          value={occasion}
                          checked={filters.occasion.includes(occasion)}
                          onChange={(e) =>
                            handleFilterChange("occasion", e.target.value)
                          }
                        />
                        <label htmlFor={occasion} className="ml-2">
                          {occasion}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl font-medium">
                  TYPES
                </AccordionTrigger>
                <AccordionContent className="text-lg font-medium">
                  <div>
                    {distinctTypes.map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={type}
                          name="type"
                          value={type}
                          checked={filters.type.includes(type)}
                          onChange={(e) =>
                            handleFilterChange("type", e.target.value)
                          }
                        />
                        <label htmlFor={type} className="ml-2">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-xl font-medium">
                  COLOR
                </AccordionTrigger>
                <AccordionContent className="text-lg font-medium">
                  <div>
                    {distinctColors.map((color) => (
                      <div key={color} className="flex items-center">
                        <input
                          type="checkbox"
                          id={color}
                          name="color"
                          value={color}
                          checked={filters.color.includes(color)}
                          onChange={(e) =>
                            handleFilterChange("color", e.target.value)
                          }
                        />
                        <label htmlFor={color} className="ml-2">
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-xl font-medium">
                  PATTERN
                </AccordionTrigger>
                <AccordionContent className="text-lg font-medium">
                  <div>
                    {distinctPatterns.map((pattern) => (
                      <div key={pattern} className="flex items-center">
                        <input
                          type="checkbox"
                          id={pattern}
                          name="pattern"
                          value={pattern}
                          checked={filters.pattern.includes(pattern)}
                          onChange={(e) =>
                            handleFilterChange("pattern", e.target.value)
                          }
                        />
                        <label htmlFor={pattern} className="ml-2">
                          {pattern}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="col-span-6 p-4  ">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold m-4 ml-0 uppercase px-4">
                {Occassion?.name}
              </h1>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            </div>
            <div className="mb-4 flex flex-wrap gap-2 px-4 ">
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
            <div>
              {filteredProducts.length > 0 ? (
                <ProductListing products={filteredProducts} />
              ) : (
                <div className="  py-12 px-4   h-screen overflow-auto no-scrollbar">
                  {filteredProducts.length === 0 && <NoProduct />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const filter = () => {
  <div className="col-span-2  h-full p-8 bg-pink-200 sticky ">
    <h1 className="text-3xl font-bold mb-4">Filters</h1>
    {/* <div className=""> */}
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-xl font-medium">
          CATEGORY
        </AccordionTrigger>
        <AccordionContent className="text-lg font-medium">
          <div>
            {distinctCategories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  name="category"
                  value={category}
                  checked={filters.category.includes(category)}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                />
                <label htmlFor={category} className="ml-2">
                  {category}
                </label>
              </div>
            ))}
            {distinctCategories.length > 5 && (
              <div className="text-blue-500 cursor-pointer">
                +{distinctCategories.length - 5} More
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
      {/* </Accordion> */}
      {/* </div> */}
      {/* <div className=""> */}
      {/* <Accordion type="single" collapsible> */}
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-xl font-medium">
          COLOR
        </AccordionTrigger>
        <AccordionContent className="text-lg font-medium">
          <div>
            {distinctColors.map((color) => (
              <div key={color} className="flex items-center">
                <input
                  type="checkbox"
                  id={color}
                  name="color"
                  value={color}
                  checked={filters.color.includes(color)}
                  onChange={(e) => handleFilterChange("color", e.target.value)}
                />
                <label htmlFor={color} className="ml-2">
                  {color}
                </label>
              </div>
            ))}
            {distinctColors.length > 5 && (
              <div className="text-blue-500 cursor-pointer">
                +{distinctColors.length - 5} More
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
      {/* </Accordion> */}
      {/* </div> */}
      {/* <div className=""> */}
      {/* <Accordion type="single" collapsible> */}
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-xl font-medium">
          PATTERN
        </AccordionTrigger>
        <AccordionContent className="text-lg font-medium">
          <div>
            {distinctPatterns.map((pattern) => (
              <div key={pattern} className="flex items-center">
                <input
                  type="checkbox"
                  id={pattern}
                  name="pattern"
                  value={pattern}
                  checked={filters.pattern.includes(pattern)}
                  onChange={(e) =>
                    handleFilterChange("pattern", e.target.value)
                  }
                />
                <label htmlFor={pattern} className="ml-2">
                  {pattern}
                </label>
              </div>
            ))}
            {distinctPatterns.length > 5 && (
              <div className="text-blue-500 cursor-pointer">
                +{distinctPatterns.length - 5} More
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
      {/* </Accordion> */}
      {/* </div> */}
      {/* <div className=""> */}
      {/* <Accordion type="single" collapsible> */}
      <AccordionItem value="item-4">
        <AccordionTrigger className="text-xl font-medium">
          TYPES
        </AccordionTrigger>
        <AccordionContent className="text-lg font-medium">
          <div>
            {distinctTypes.map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={type}
                  name="type"
                  value={type}
                  checked={filters.type.includes(type)}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                />
                <label htmlFor={type} className="ml-2">
                  {type}
                </label>
              </div>
            ))}
            {distinctTypes.length > 5 && (
              <div className="text-blue-500 cursor-pointer">
                +{distinctTypes.length - 5} More
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
      {/* </Accordion> */}
      {/* </div> */}
      {/* <div className=""> */}
      {/* <Accordion type="single" collapsible> */}
      <AccordionItem value="item-5">
        <AccordionTrigger className="text-xl font-medium">
          OCCASION
        </AccordionTrigger>
        <AccordionContent className="text-lg font-medium">
          <div>
            {distinctOccasions.map((occasion) => (
              <div key={occasion} className="flex items-center">
                <input
                  type="checkbox"
                  id={occasion}
                  name="occasion"
                  value={occasion}
                  checked={filters.occasion.includes(occasion)}
                  onChange={(e) =>
                    handleFilterChange("occasion", e.target.value)
                  }
                />
                <label htmlFor={occasion} className="ml-2">
                  {occasion}
                </label>
              </div>
            ))}
            {distinctOccasions.length > 5 && (
              <div className="text-blue-500 cursor-pointer">
                +{distinctOccasions.length - 5} More
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    {/* </div> */}
  </div>;
};
