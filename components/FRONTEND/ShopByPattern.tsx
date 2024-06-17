// @ts-nocheck

"use client";

import React, { useEffect, useState } from "react";
import { Nunito_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export default function ShopByPattern({ Patterns }) {
  return (
    <div className="text-center mt-8">
      <div className="container m-auto py-8 px-10 flex flex-col gap-y-4">
        <div
          className={`font-medium text-[#afafaf] text-lg ${nunito.className}`}
        >
          IN THE SPOTLIGHT
        </div>
        <div className="font-medium text-5xl italic ">
          Unique Indian block prints
        </div>
        {/* <div className="flex justify-between  items-center "> */}
        {/* <div className="flex gap-6 my-6 justify-between"> */}
        <div className="px-32">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            loop={true}
            centeredSlides={true}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper selection:w-3/4 "
          >
            {Patterns.map((pattern, index) => (
              <SwiperSlide className=" w-1/3  overflow-hidden" key={index}>
                {/* <Link href={`/pattern/${pattern.id}`}> */}
                <Link href={`/products?patternId=${pattern.id}`}>
                  <div className=" h-80  relative  ">
                    <Image
                      src={pattern.imageUrl}
                      alt={pattern.name}
                      height={1}
                      width={1000}
                      className="w-full h-full overflow-hidden object-cover   "
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
