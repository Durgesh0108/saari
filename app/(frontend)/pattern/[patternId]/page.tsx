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

export default function ColorPage() {
  const params = useParams();

  const [products, setProducts] = useState([]);
  const [Pattern, setPattern] = useState({});
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
      const res = await fetch(`/api/pattern/${params.patternId}/product`);
      const productData = await res.json();
      setProducts(productData);

      const colors = productData.map((product) => product.color.name);
      setDistinctColors(Array.from(new Set(colors)));

      const categories = productData.map((product) => product.category.name);
      setDistinctCategories(Array.from(new Set(categories)));

      const occasions = productData.map((product) => product.occassion.name);
      setDistinctOccasions(Array.from(new Set(occasions)));

      const types = productData.map((product) => product.type.name);
      setDistinctTypes(Array.from(new Set(types)));

      const patterns = productData.map((product) => product.pattern.name);
      setDistinctPatterns(Array.from(new Set(patterns)));
    };

    fetchProducts();
  }, [params.patternId]);

  useEffect(() => {
    const fetchPattern = async () => {
      const res = await fetch(`/api/pattern/${params.patternId}`);
      const patternData = await res.json();
      setPattern(patternData);
    };

    fetchPattern();
  }, [params.patternId]);

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
    <div className="">
      <div className="h-80 ">
        {Pattern.imageUrl && (
          <Image
            src={Pattern.imageUrl}
            alt={Pattern.name}
            width={1000}
            height={1}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="grid grid-cols-8 container h-screen overflow-auto ">
        <div className="col-span-2  h-full p-4 bg-pink-200">
          <h1 className="text-2xl font-bold mb-4">Filters</h1>
          <div className="">
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
            </Accordion>
          </div>
          <div className="">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
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
                    {distinctColors.length > 5 && (
                      <div className="text-blue-500 cursor-pointer">
                        +{distinctColors.length - 5} More
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
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
            </Accordion>
          </div>
          <div className="">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
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
                    {distinctTypes.length > 5 && (
                      <div className="text-blue-500 cursor-pointer">
                        +{distinctTypes.length - 5} More
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
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
          </div>
        </div>
        <div className="col-span-6 p-4 h-full ">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold m-4 ml-0 uppercase">
              {Pattern?.name}
            </h1>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
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
          <div className="grid grid-cols-3 gap-8  py-12  ">
            {filteredProducts.map((product, index) => (
              <div key={index}>
                <div>
                  <div key={product.id}>
                    <div
                      className="hover:scale-110 z-50 duration-700 group"
                      key={index}
                    >
                      <div className="rounded-tl-[100px] rounded-br-2xl h-72 relative -top-5">
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
                        />
                      </div>
                      <div className="group-hover:scale-110 group-hover:ml-3 duration-700 text-[20px]">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <p className="text-2xl ">No Products Available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
