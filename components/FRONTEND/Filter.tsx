"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Category } from "@prisma/client";
import { getCategory } from "@/actions/FRONTEND/get-categories";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function Filters() {
  const params = useParams();

  const [Category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      // @ts-ignore
      // const Category = await getCategory(params.categoryId);
      const Category = await getCategory(params.categoryId);
      setCategory(Category);
    };
    fetchCategory();
  }, [params.categoryId]);

  return (
    <div className="bg-[#e4e4e4] flex flex-col gap-2 py-4 h-full">
      {/* <div className="w-1/4 bg-[#f2f2f2] p-8 overflow-auto"> */}
      <div className="py-2 flex flex-col items-center gap-4">
        <h1 className="text-xl font-semibold">Filters</h1>
        <div className="flex flex-col gap-2 w-full px-8">
          {/* @ts-ignore */}
          {Category?.subcategory?.map((subcate) => (
            <Accordion type="single" collapsible key={subcate?.id} className="">
              <AccordionItem value="item-1" className="">
                <AccordionTrigger className="">
                  {subcate?.name}
                </AccordionTrigger>
                {subcate?.subsubcategory?.map((subsubcate, index) => (
                  <AccordionContent className="" key={index}>
                    <Link
                    // @ts-ignore
                      href={`/products/${Category?.id}/${subcate?.id}/${subsubcate?.id}/brands`}
                      key={subsubcate.id}
                    >
                      {subsubcate.name}
                    </Link>
                  </AccordionContent>
                ))}
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}
