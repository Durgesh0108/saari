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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export default function ProductsList({ Types, products }) {
  const params = useParams();

  const [distinctColors, setDistinctColors] = useState([]);
  const [distinctTypes, setDistinctTypes] = useState([]);
  const [distinctCategories, setDistinctCategories] = useState([]);
  const [distinctOccasions, setDistinctOccasions] = useState([]);
  const [distinctPatterns, setDistinctPatterns] = useState([]);
  const [distinctSubTypes, setDistinctSubTypes] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    color: [],
    type: [],
    occasion: [],
    pattern: [],
    subtype: [],
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

      const subtypes = products.map((product) => product.SubType.name);
      setDistinctSubTypes(Array.from(new Set(subtypes)));
    };

    fetchProducts();
  }, [params.typeId, products]);



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
      subtype: [],
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
    const subtypeFilter =
      !filters.subtype.length || filters.subtype.includes(product.SubType.name);

    return (
      colorFilter &&
      categoryFilter &&
      typeFilter &&
      occasionFilter &&
      patternFilter &&
      subtypeFilter
    );
  });

  const [FilterIsOpen, setFilterIsOpen] = useState(false);

  const toggleFilter = () => setFilterIsOpen((current) => !current);

  return (
    <div className=" no-scrollbar z-10">
      <div className=" ">
        {/* {Types?.bannerUrl && (
          <Image
            src={Types.bannerUrl}
            alt={Types.name}
            width={1000}
            height={500} // Updated to maintain aspect ratio
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )} */}
        <Image
          src={
            "https://res.cloudinary.com/dttieobbt/image/upload/v1718444371/kdfbqrm9nldxuprnxz1a.jpg"
          }
          alt={Types.name}
          width={1000}
          height={500} // Updated to maintain aspect ratio
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="hidden md:flex">
        <div className="grid grid-cols-8 container  ">
          <div className="col-span-2  h-full p-8 sticky ">
            <h1 className="text-3xl font-bold mb-4">Filters</h1>
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
                  </div>
                  {/* <div>
                    <Accordion type="single" collapsible>
                      {category.map((cate, index) => (
                        <div key={index}>
                          <AccordionItem
                            value={`item-${index + 1}`}
                            className="border-0"
                          >
                            <AccordionTrigger className="text-xl font-medium py-2">
                              <div className="group/category w-fit ml-2">
                                <Link href={`/products?categoryId=${cate.id}`}>
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
                                            <Link
                                              href={`/products?typeId=${type.id}`}
                                            >
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
                                                    href={`/products?subTypeId=${subtype.id}`}
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
                  </div> */}
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
                  SUBTYPES
                </AccordionTrigger>
                <AccordionContent className="text-lg font-medium">
                  <div>
                    {distinctSubTypes.map((subtype) => (
                      <div key={subtype} className="flex items-center">
                        <input
                          type="checkbox"
                          id={subtype}
                          name="subtype"
                          value={subtype}
                          checked={filters.subtype.includes(subtype)}
                          onChange={(e) =>
                            handleFilterChange("subtype", e.target.value)
                          }
                        />
                        <label htmlFor={subtype} className="ml-2">
                          {subtype}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
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

              <AccordionItem value="item-6">
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
                {Types?.name}
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
      <div className="flex md:hidden justify-center">
        <div className="">
          <div className="flex justify-between items-center">
            <div>
              <Button
                className="bg-pink-300 text-white  rounded"
                onClick={toggleFilter}
              >
                Filters
              </Button>
            </div>
            <div>
              <h1 className="text-xl font-bold  uppercase ">{Types?.name}</h1>
            </div>
            <div>
              <Button
                className="bg-red-500 text-white  rounded"
                onClick={handleResetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </div>
          <div className="col-span-6 p-4  ">
            {Object.entries(filters).length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2 md:px-4 ">
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
          <div
            className={cn(
              "fixed top-16  left-0 h-screen bg-white duration-700 overflow-auto z-10",
              FilterIsOpen ? "w-64 " : "w-0"
            )}
          >
            <div className="flex flex-col gap-4 p-8 h-full text-black">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl ">Filters</h2>
                <X onClick={toggleFilter} />
              </div>
              <div>
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
                      </div>
                      {/* <div>
                        <Accordion type="single" collapsible>
                          {category.map((cate, index) => (
                            <div key={index}>
                              <AccordionItem
                                value={`item-${index + 1}`}
                                className="border-0"
                              >
                                <AccordionTrigger className="text-xl font-medium py-2">
                                  <div className="group/category w-fit ml-2">
                                    <Link
                                      href={`/products?categoryId=${cate.id}`}
                                    >
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
                                                <Link
                                                  href={`/products?typeId=${type.id}`}
                                                >
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
                                                        href={`/products?subTypeId=${subtype.id}`}
                                                      >
                                                        <div>
                                                          {subtype.name}
                                                        </div>
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
                      </div> */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
