// @ts-nocheck

"use client";

import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Category } from "@prisma/client";
import getServiceCategories from "@/actions/FRONTEND/get-servicescategory";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isProductsMenuVisible, setProductsMenuVisible] = useState(false);
  const [isServiceMenuVisible, setServiceMenuVisible] = useState(false);

  const toggleProductsMenu = () => {
    setProductsMenuVisible(!isProductsMenuVisible);
    setServiceMenuVisible(false);
  };
  const toggleServiceMenu = () => {
    setServiceMenuVisible(!isServiceMenuVisible);
    setProductsMenuVisible(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`/api/category`, {
        next: { revalidate: 60 },
      });
      const category = await res.json();
      setCategories(category);
    };
    fetchCategories();
  }, []);

  const [Scategories, setSCategories] = useState<ServiceCategory[]>([]);
  useEffect(() => {
    const fetchcategories = async () => {
      const res = await fetch(`/api/service/category`, {
        next: { revalidate: 60 },
      });
      const categories = await res.json();
      setSCategories(categories);
    };
    fetchcategories();
  }, []);

  return (
    <div className="md:container ">
      {/* Desktop */}

      <div className="hidden md:flex w-full relative justify-center gap-10 ">
        {categories.map((category) => (
          <div
            className="group cursor-pointer py-2 text-[14px]"
            key={category.id}
          >
            <div className="flex justify-center bg-white px-1 z-10 container">
              <div className="flex justify-center items-center hover:text-blue-300 ">
                <span className="menu-hover py-2 text-sm font-normal lg:mx-1 w-full ">
                  {category.name}
                  {/* Durgesh fdsadadada dsadsad */}
                </span>
                <ChevronDown height={16} width={16} />
              </div>
            </div>

            <div className="h-96 overflow-auto invisible absolute -z-50 flex flex-col w-full left-0  bg-white py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
              <div className="grid grid-cols-4 justify-evenly">
                {/* @ts-ignore */}
                {category.subcategory.map((subcategory) => (
                  <div key={subcategory.id}>
                    <h1 className="text-md font-semibold py-3 ">
                      {subcategory.name}
                      <hr className="w-1/4 mt-2 border-[1px] border-[#00aecd]" />
                      <span className="underline-offset-8 underline text-blue-400">
                        {""}
                      </span>
                    </h1>
                    <div className="flex flex-col gap-2 mb-6">
                      {subcategory.subsubcategory.map((subsubcategory) => (
                        // <a
                        //   href={`/product/${subsubcategory.id}/brand`}
                        //   key={subsubcategory.id}
                        // >
                        //   {subsubcategory.name}
                        // </a>

                        <Link
                          href={`/products/${category.id}/${subcategory.id}/${subsubcategory.id}/brands`}
                          key={subsubcategory.id}
                        >
                          {subsubcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="grid grid-cols-2 justify-between bg-slate-300 p-2 md:hidden">
        <div className="">
          <div className=" flex justify-center">
            <h1
              className="text-base font-medium text-gray-800 group cursor-pointer"
              onClick={toggleServiceMenu}
            >
              Services
            </h1>
          </div>
          <div
            className={`${
              isServiceMenuVisible ? "block" : "hidden"
            } h-screen overflow-auto absolute z-50 flex flex-col w-full left-0 bg-white py-1 px-4 text-gray-800 shadow-xl fade-in-100 fade-out-100`}
          >
            {Scategories.map((category) => (
              <Accordion type="single" collapsible key={category.id}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{category.name}</AccordionTrigger>
                  {/* @ts-ignore */}
                  {category.servicesubcategory.map((subcategory) => (
                    <AccordionContent className="ml-2" key={subcategory.id}>
                      <Link href={`/services/${subcategory.id}/services`}>
                        - {subcategory.name}
                      </Link>
                    </AccordionContent>
                  ))}
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
        <div>
          <div className=" flex justify-center">
            <h1
              className="text-base font-medium text-gray-800 group cursor-pointer"
              onClick={toggleProductsMenu}
            >
              Products
            </h1>
          </div>
          <div
            className={`${
              isProductsMenuVisible ? "block" : "hidden"
            } h-screen overflow-auto absolute z-50 flex flex-col w-full left-0 bg-white py-1 px-4 text-gray-800 shadow-xl fade-in-100 fade-out-100`}
          >
            {categories.map((category) => (
              <Accordion type="single" collapsible key={category.id}>
                <AccordionItem value={`category-${category.id}`}>
                  <AccordionTrigger>{category.name}</AccordionTrigger>
                  <AccordionContent>
                    {category.subcategory.map((subcategory) => (
                      <Accordion type="single" collapsible key={subcategory.id}>
                        <AccordionItem value={`subcategory-${subcategory.id}`}>
                          <AccordionTrigger className="ml-4">
                            <h1 className="text-md font-semibold">
                              {subcategory.name}
                              <hr className="w-1/2 mt-2 border-[1px] border-[#00aecd]" />
                            </h1>
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-2">
                            {subcategory.subsubcategory.map(
                              (subsubcategory) => (
                                <Link
                                  href={`/products/${category.id}/${subcategory.id}/${subsubcategory.id}/brands`}
                                  key={subsubcategory.id}
                                  className="ml-8"
                                >
                                  - {subsubcategory.name}
                                </Link>
                              )
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
