// @ts-nocheck

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CategoryPage() {
  const params = useParams();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [distinctColors, setDistinctColors] = useState([]);
  const [distinctTypes, setDistinctTypes] = useState([]);
  const [distinctCategory, setDistinctCategory] = useState([]);
  const [distinctOccasion, setDistinctOccasion] = useState([]);
  const [distinctPattern, setDistinctPattern] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: null,
    fabric: null,
    color: [],
    craft: null,
    occasion: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/category/${params.categoryId}/product`
        // `/api/website/product`
      );
      const productData = await res.json();
      setProducts(productData);

      const colors = productData.map((product) => product.color.name);
      const uniqueColors = Array.from(new Set(colors));
      setDistinctColors(uniqueColors);

      const Category = productData.map((product) => product.category.name);
      const uniqueCategories = Array.from(new Set(Category));
      setDistinctCategory(uniqueCategories);

      const Occasion = productData.map((product) => product.occasion.name);
      const uniqueOccasion = Array.from(new Set(Occasion));
      setDistinctOccasion(uniqueOccasion);

      const type = productData.map((product) => product.type.name);
      const uniqueTypes = Array.from(new Set(type));
      setDistinctTypes(uniqueTypes);

      const patterns = productData.map((product) => product.pattern.name);
      const uniquePattern = Array.from(new Set(patterns));
      setDistinctPattern(uniquePattern);
    };

    fetchProducts();
  }, [params.categoryId]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch(`/api/category/${params.categoryId}`);
      const categoryData = await res.json();
      setCategory(categoryData);
    };

    fetchCategory();
  }, [params.categoryId]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      let updatedFilter = [...prevFilters[filterType]];
      if (updatedFilter.includes(value)) {
        updatedFilter = updatedFilter.filter((item) => item !== value);
      } else {
        updatedFilter.push(value);
      }
      return {
        ...prevFilters,
        [filterType]: updatedFilter,
      };
    });
  };

  const filteredProducts = products.filter((product) => {
    const colorFilter =
      filters.color.length === 0 || filters.color.includes(product.color.name);
      const categoryFilter = filters.category.length === 0 || filters.category.includes(product.category.name);
    const typeFilter = filters.type.length === 0 || filters.type.includes(product.type.name);
    const occasionFilter = filters.occasion.length === 0 || filters.occasion.includes(product.occasion.name);
    const patternFilter = filters.pattern.length === 0 || filters.pattern.includes(product.pattern.name);

    return colorFilter && categoryFilter && typeFilter && occasionFilter && patternFilter;
    // Add other filter conditions here
    // return colorFilter;
  });

  return (
    <div className="border-2 border-black">
      <div className="h-80 border-2 border-black">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 container border-2 border-black">
        <div className="col-span-1 border-2 border-black h-full p-4">
          <h1 className="heading4 mb-4">Filters</h1>
          <div className="mb-4">
            <h2 className="font-semibold">PRICE RANGE</h2>
            {/* Add price range filter options here */}
          </div>
          <div className="mb-4">
            <h2 className="font-semibold">CATEGORY</h2>
            <div>
              {distinctCategory.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category}
                    name="category"
                    value={category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                  />
                  <label htmlFor={category} className="ml-2">
                    {category}
                  </label>
                </div>
              ))}
              {/* Add a "Show More" link if there are more categories */}
              {distinctCategory.length > 5 && (
                <div className="text-blue-500 cursor-pointer">
                  +{distinctCategory.length - 5} More
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="font-semibold">COLOUR</h2>
            <div>
              {distinctColors.map((color) => (
                <div key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    id={color}
                    name="color"
                    value={color}
                    onChange={(e) =>
                      handleFilterChange("color", e.target.value)
                    }
                  />
                  <label htmlFor={color} className="ml-2">
                    {color}
                  </label>
                </div>
              ))}
              {/* Add a "Show More" link if there are more colors */}
              {distinctColors.length > 5 && (
                <div className="text-blue-500 cursor-pointer">
                  +{distinctColors.length - 5} More
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="font-semibold">PATTERN</h2>
            <div>
              {distinctPattern.map((pattern) => (
                <div key={pattern} className="flex items-center">
                  <input
                    type="checkbox"
                    id={pattern}
                    name="pattern"
                    value={pattern}
                    onChange={(e) =>
                      handleFilterChange("pattern", e.target.value)
                    }
                  />
                  <label htmlFor={pattern} className="ml-2">
                    {pattern}
                  </label>
                </div>
              ))}
              {/* Add a "Show More" link if there are more patterns */}
              {distinctPattern.length > 5 && (
                <div className="text-blue-500 cursor-pointer">
                  +{distinctPattern.length - 5} More
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="font-semibold">OCCASION</h2>
            <div>
              {distinctOccasion.map((occasion) => (
                <div key={occasion} className="flex items-center">
                  <input
                    type="checkbox"
                    id={occasion}
                    name="occasion"
                    value={occasion}
                    onChange={(e) =>
                      handleFilterChange("occasion", e.target.value)
                    }
                  />
                  <label htmlFor={occasion} className="ml-2">
                    {occasion}
                  </label>
                </div>
              ))}
              {/* Add a "Show More" link if there are more occasions */}
              {distinctOccasion.length > 5 && (
                <div className="text-blue-500 cursor-pointer">
                  +{distinctOccasion.length - 5} More
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <h1 className="heading2 m-4 uppercase">{category.name}</h1>
          <div className="grid grid-cols-3 gap-8 border-2 border-black p-16">
            {filteredProducts.map((product, index) => (
              <div key={index}>
                <div
                  key={product.id}
                  className="hover:scale-110 z-50 duration-700 group"
                >
                  <div className="rounded-tl-[100px] rounded-br-2xl h-72 relative -top-5">
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
                    />
                  </div>
                  <div className="group-hover:scale-110 duration-700 text-[20px]">
                    {product.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
