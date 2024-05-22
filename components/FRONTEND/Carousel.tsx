"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, EffectCards, Autoplay } from "swiper/modules";
import { AdvertisementSubscription } from "@prisma/client";
import { GetSliderAds } from "@/actions/advertisements/sliderAds/getSliderAds";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";

export default function Carousel() {
  const [sliderAds, setsliderAds] = useState<AdvertisementSubscription[]>([]);
  const [loading, setLoading] = useState(true);
   
  useEffect(() => {
    const fetchAdvertisements = async () => {
      const slider = await GetSliderAds();
      await setsliderAds(slider);
      setLoading(false);
    };
    fetchAdvertisements();
  }, []);

  const items = sliderAds.map((ads) => (
    <div key={ads.id} className="w-full h-[200px] md:h-[200px] mt-2">
      <Image
        // @ts-ignore
        src={ads?.advertisement?.imageUrl}
        height={240}
        width={1000}
        alt="ads"
        className="object-fill w-full h-full"
        loading="lazy"
      />
    </div>
  ));

  if (loading) {
    return (
      <div className="w-full h-[200px] md:h-[200px]">
        <Skeleton variant="rectangular" className="w-full h-full" />
      </div>
    );
  }
  return (
    <>
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
        className="w-full"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="h-full">
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
