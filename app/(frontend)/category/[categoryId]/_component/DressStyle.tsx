"use client";

import { Preview } from "@/components/preview";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Skeleton } from "@mui/material";

export default function DressStyleComponent({
  DressStyles,
  TopViews,
  Attires,
}) {
  const [selectedDressStyle, setSelectedDressStyle] = useState(
    DressStyles[0].id
  );
  const [selectedTopView, setSelectedTopView] = useState(TopViews[0].id);

  const [dressStyle, setDressStyle] = useState(DressStyles[0]);
  const [topView, setTopView] = useState(TopViews[0]);
  const [attire, setAttire] = useState(null);

  useEffect(() => {
    const dress = DressStyles.find((dress) => dress.id === selectedDressStyle);
    setDressStyle(dress);
  }, [DressStyles, selectedDressStyle]);

  useEffect(() => {
    const topview = TopViews.find((top) => top.id === selectedTopView);
    setTopView(topview);
  }, [TopViews, selectedTopView]);

  useEffect(() => {
    const attires = Attires.filter(
      (attire) =>
        attire.dressStyleId === selectedDressStyle &&
        attire.topViewId === selectedTopView
    );

    if (!attires.length) {
      setAttire(null);
    } else {
      setAttire(attires[0]);
    }
  }, [selectedDressStyle, selectedTopView, Attires]);

  return (
    <div className="mt-4 container">
      <div className="grid grid-cols-3 gap-4">
        <div className="h-full w-full col-span-1 flex flex-col gap-4">
          <div className="h-[600px] ">
            <div className="h-full">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                  dynamicBullets: true,
                  clickable: true,
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="w-full h-full"
              >
                {!attire || !attire.images || attire.images.length === 0 ? (
                  <SwiperSlide className="h-full">
                    <div className="h-full w-full flex items-center justify-center">
                      {/* <Image
                        src={`https://placehold.co/400x600?text=No+Image`}
                        alt="No image available"
                        width={400}
                        height={600}
                        className="h-full w-full object-cover rounded-md"
                      /> */}
                      <Skeleton
                        variant="rectangular"
                        className="rounded h-full w-full"
                      />
                    </div>
                  </SwiperSlide>
                ) : (
                  attire.images.map((image, index) => (
                    <SwiperSlide className="h-full" key={index}>
                      <div className="h-full w-full">
                        <Image
                          src={image.url}
                          alt={image.id}
                          width={150}
                          height={100}
                          className="h-full w-full object-cover rounded-md"
                        />
                      </div>
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </div>
          </div>
          <div className="h-1/4 ">
            <div className="h-full flex gap-4 justify-center">
              {TopViews.map((top, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedTopView(top.id)}
                  className={`h-24 w-36 cursor-pointer ${
                    selectedTopView === top.id ? "border-2 border-blue-500" : ""
                  }`}
                >
                  <Image
                    src={top.imageUrl}
                    height={100}
                    width={150}
                    alt={`top-view-${top.name}`}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2 gap-4 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ol>
                {DressStyles.map((dress, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedDressStyle(dress.id)}
                    className={`cursor-pointer ${
                      selectedDressStyle === dress.id
                        ? "font-bold text-blue-500"
                        : ""
                    }`}
                  >
                    {dress.name}
                  </li>
                ))}
              </ol>
            </div>
            <div className="w-full">
              <Preview value={dressStyle?.description} />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 ">
            {dressStyle?.videoUrl?.split(", ").map((video, index) => (
              <div key={index} className="w-full">
                <iframe
                  src={video}
                  height={120}
                  width={200}
                  key={index}
                  title={`video-${index}`}
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
