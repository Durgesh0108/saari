"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function CarouselSlider({ sliders }) {
  // const [sliders, setSliders] = useState([]);

  // useEffect(() => {
  //   const fetchSliders = async () => {
  //     const sliderRes = await fetch(`/api/website/slider`);
  //     const slider = await sliderRes.json();
  //     setSliders(slider);
  //   };
  //   fetchSliders();
  // }, []);

  return (
    // <div className=" slider-block  style-one bg-linear  md:h-[500px] sm:h-[500px] h-[350px] max-[420px]:h-[320px] w-full ">
    <div className="w-full ">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="w-full h-full"
      >
        {sliders.map((slide, index) => (
          <SwiperSlide className="h-full " key={index}>
            <div className="h-full w-full">
              <Image
                src={slide.imageUrl}
                alt={slide.id}
                width={9999}
                height={1}
                className="h-full w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
