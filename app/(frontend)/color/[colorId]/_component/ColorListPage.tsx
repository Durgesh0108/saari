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

export default function ColorListPage({ Color, products }) {
  const params = useParams();

  // const [Color, setColor] = useState([]);
  // const [products, setProducts] = useState([]);
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
  }, [params.colorId]);

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
    <div className=" no-scrollbar z-10">
      <div className=" ">
        {Color.bannerUrl && (
          <Image
            src={Color.bannerUrl}
            alt={Color.name}
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
          <div className="col-span-6 p-4  ">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold m-4 ml-0 uppercase px-4">
                {Color?.name}
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
                <div className="grid grid-cols-3 gap-8  py-12 px-4   h-screen overflow-auto no-scrollbar">
                  {filteredProducts.map((product, index) => (
                    <Link key={index} href={`/product/${product.id}`}>
                      <div
                        className="hover:scale-110 z-50 duration-700 group"
                        key={index}
                      >
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
                    </Link>
                  ))}

                  {/* {[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}].map(
                (product, index) => (
                  <div
                    className="hover:scale-105 z-10 duration-700 group  rounded-lg p-2 hover:shadow-3xl "
                    key={index}
                  >
                    <div className="rounded-tl-[100px] rounded-br-2xl h-80 relative ">
                      <img
                        src={
                          "https://res.cloudinary.com/dttieobbt/image/upload/v1716532524/rfecteffexn2d8ukadbz.jpg"
                        }
                        alt={"Banarasi Saaris"}
                        className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
                      />
                    </div>
                    <div className="group-hover:scale-110 group-hover:ml-3 duration-500 relative text-[20px]">
                      <p>Banarasi Saaris</p>
                      <p>Price: Rs 3000</p>
                    </div>
                  </div>
                )
              )} */}
                </div>
              ) : (
                <div className="  py-12 px-4   h-screen overflow-auto no-scrollbar">
                  {filteredProducts.length === 0 && (
                    <div className="flex flex-col justify-center items-center text-center w-full h-full ">
                      <p className=" flex items-center">
                        <Image
                          src={
                            "https://res.cloudinary.com/dttieobbt/image/upload/v1717074733/product-not-found_ptexdu.jpg"
                          }
                          alt="no Product"
                          height={1}
                          width={1000}
                          className="w-fit h-full object-contain "
                        />
                      </p>
                    </div>
                  )}
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
