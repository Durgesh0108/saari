// @ts-nocheck

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Product } from "@prisma/client";
import Link from "next/link";

import { Nunito_Sans } from "next/font/google";
const nunito = Nunito_Sans({ subsets: ["latin"] });

export default function ShopByCategory({ categories }) {
  return (
    <div className="md:pt-20 pt-10 mb-8 ">
      <div className="container m-auto py-8 px-10 flex flex-col gap-y-4 ">
        <div
          className={`font-medium text-[#afafaf] text-2xl ${nunito.className}`}
        >
          Shop By Category
        </div>
        <div className="font-medium text-5xl italic  ">
          Fine drapes, ready-to-wear styles, and more
        </div>

        <div className="list-collection relative section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4 grid grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link href={`/category/${category.id}`} key={index}>
              <div
                className="hover:scale-110 z-50 duration-500 group "
                key={index}
              >
                <div
                  className="rounded-full w-5 h-5 top-1 left-1 relative"
                  style={{ backgroundColor: "#C2915E" }}
                ></div>
                <div className=" rounded-tl-[100px] rounded-br-2xl h-60 md:h-96 relative -top-5 ">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    height={1}
                    width={1000}
                    className="w-full h-full overflow-hidden object-cover  rounded-tl-[100px] rounded-br-2xl group-hover:shadow-2xl group-hover:shadow-slate-300"
                  />
                </div>
                <div className=" group-hover:scale-110 group-hover:ml-3 group-hover:font-bold duration-500 italic -mt-3 text-2xl group-hover:text-[27px]">
                  {category.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
