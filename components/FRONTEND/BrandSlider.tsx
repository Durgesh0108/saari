"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../ui/Card";

export default function BrandSlider({ topTenBrands }) {
  const settings = {
    dots: true,
    infinite: true,
    lazyLoaded: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    initialSlide: 8,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          infinite: true,
          dots: true,
          slidesToShow: 6,
          slidesToScroll: 1,
          initialSlide: 8,
        },
      },
      {
        breakpoint: 800,
        settings: {
          infinite: true,
          dots: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 8,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          dots: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 8,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 8,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div>
      <div className="carousel-container py-2">
        <Slider {...settings}>
          {topTenBrands.map((brand) => (
            <div key={brand?.id} className="carousel-item">
              {/* <Link
                href={`/products/${brand?.category?.id}/${brand?.subcategory?.id}/${brand?.subsubcategory?.id}/brands/${brand?.id}/products`}
                className="h-full"
              > */}
              <Link
                href={`/brand/${brand?.id}/products`}
                className="h-full"
              >
                <Card className="h-[150px] md:h-[180px]">
                  <div className="p-2 w-full carousel-card">
                    <div className="flex justify-center h-[100px]">
                      <Image
                        src={brand.imageUrl}
                        width={150}
                        height={150}
                        alt={brand.name}
                        className="object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col items-center w-full">
                      <div className="text-xs md:text-base text-wrap">
                        {brand?.name}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
      <style jsx>{`
        .carousel-container {
          margin: 0 -10px; /* Adjust the margin as needed */
        }
        .carousel-item {
          padding: 0 10px; /* Adjust the padding as needed */
          height: 180px;
          /* Set the fixed height for each card */
        }
        .carousel-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          justify-items: center;
        }
      `}</style>
    </div>
  );
}
