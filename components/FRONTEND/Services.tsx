"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import getServiceCategories from "@/actions/FRONTEND/get-servicescategory";
import { ServiceCategory } from "@prisma/client";

const Services = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  useEffect(() => {
    const fetchcategories = async () => {
      const res = await fetch(`/api/service/category`, {
        next: { revalidate: 60 },
      });
      const categories = await res.json();
      setCategories(categories);
    };
    fetchcategories();
  }, []);

  return (
    <>
      <div className=" bg-[#f2f2f2] p-8  h-full">
        <h1 className="py-4 font-medium text-[18px] w-fit">
          <span>SERVICES</span>
          <hr className="w-3/4 mt-2 border-[1px] border-[#00aecd]" />
        </h1>
        <div>
          {categories.map((category) => (
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
    </>
  );
};

export default Services;
