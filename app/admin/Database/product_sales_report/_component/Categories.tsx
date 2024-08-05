"use client";

import React, { useState, useEffect } from "react";
import { Brands, Category, Subcategory, Subsubcategory } from "@prisma/client";
import { getCategory } from "@/actions/getCategories";
import getsubcatgeorybycategory from "@/actions/getsubcategorybycategory";
import { getsubsubcategory } from "@/actions/getsubsubcategory";
import { getBrandsBycategories } from "@/actions/brands/getBrandsByCategories";
import { Label } from "@/components/ui/label";

export default function Categories({ sendDatatoParents }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [subsubcategories, setsubsubcategories] = useState<Subsubcategory[]>(
    []
  );
  const [brands, setBrands] = useState<Brands[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedSubsubcategory, setSelectedSubsubcategory] =
    useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  // Category
  useEffect(() => {
    const fetchCategories = async () => {
      const category = await getCategory();
      setCategories(category);
      // setSelectedCategory(category[0]?.id);
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  //

  // SubCategory

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        const subcategory = await getsubcatgeorybycategory(selectedCategory);
        setSubcategories(subcategory);
        // setSelectedSubcategory(subcategory[0]?.id);
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(e.target.value);
  };

  //

  //SubSubCategory

  useEffect(() => {
    const fetchSubsubcategories = async () => {
      if (selectedCategory && selectedSubcategory) {
        const subsubdata = await getsubsubcategory(
          selectedCategory,
          selectedSubcategory
        );
        setsubsubcategories(subsubdata);
        // setSelectedSubsubcategory(subsubdata[0]?.id);
      }
    };

    fetchSubsubcategories();
  }, [selectedCategory, selectedSubcategory]);

  const handleSubsubCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSubsubcategory(e.target.value);
  };

  //

  // Brands

  useEffect(() => {
    const fetchBrands = async () => {
      if (selectedSubsubcategory) {
        const brands = await getBrandsBycategories(selectedSubsubcategory);
        setBrands(brands);
        // setSelectedBrand(brands[0]?.id);
        // sendDatatoParents(brands[0]?.id);
      }
      // setSelectedCategory(data[0]?.id);
    };

    fetchBrands();
  }, [selectedSubsubcategory]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    sendDatatoParents(e.target.value);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>Category</Label>
          <select
            name="category"
            id="category"
            // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
            className="p-2 border-black border-[1px] rounded-lg"
            onChange={handleCategoryChange}
          >
            {categories.length === 0 ? (
              <option>No Category Available</option>
            ) : (
              <option value={""}>Please Select Category</option>
            )}

            {categories.map((category) => (
              <option
                value={category.id}
                key={category.id}
                className="px-4 py-1"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Sub Category</Label>
          <select
            name="category"
            id="category"
            // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
            className="p-2 border-black border-[1px] rounded-lg"
            onChange={handleSubCategoryChange}
          >
            {subcategories.length === 0 ? (
              <option>No Subcatgeory Available</option>
            ) : (
              <option value={""}>Please Select Subcatgeory</option>
            )}

            {subcategories.map((subcategory) => (
              <option
                value={subcategory.id}
                key={subcategory.id}
                className="px-4 py-1"
              >
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Sub Sub Category</Label>
          <select
            name="category"
            id="category"
            // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
            className="p-2 border-black border-[1px] rounded-lg"
            onChange={handleSubsubCategoryChange}
          >
            {subsubcategories.length === 0 ? (
              <option>No Subsubcatgeory Available</option>
            ) : (
              <option value={""}>Please Select Subsubcatgeory</option>
            )}

            {subsubcategories.map((subsubcategory) => (
              <option
                value={subsubcategory.id}
                key={subsubcategory.id}
                className="px-4 py-1"
              >
                {subsubcategory.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Brand</Label>
          <select
            name="category"
            id="category"
            // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
            className="p-2 border-black border-[1px] rounded-lg"
            onChange={handleBrandChange}
          >
            {brands.length === 0 ? (
              <option>No Brands Available</option>
            ) : (
              <option value={""}>Please Select Brand</option>
            )}
            {brands.map((brand) => (
              <option value={brand.id} key={brand.id} className="px-4 py-1">
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
