"use client";

import getTestimonials from "@/actions/FRONTEND/get-testimonial";
import { Testimonial } from "@prisma/client";
import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../ui/Card";
import { getShowingTestimonials } from "@/actions/server/TESTIMONIAL/Showing/showingTestimonail";
import LoaderCard from "./LoaderCard";

export default function Testimonials() {
  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  useEffect(() => {
    const fetchTestimonial = async () => {
      const testimonial = await getShowingTestimonials();
      await setTestimonials(testimonial);
      setIsLoading(false);
    };
    fetchTestimonial();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    lazyLoaded: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    initialSlide: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: true,
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          infinite: true,
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 3,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div>
        <h1 className="py-4 font-medium text-[18px] w-fit">
          <span>TESTIMONIALS</span>
          <hr className="w-3/4 mt-2 border-[1px] border-[#00aecd]" />
        </h1>
        <div className="grid grid-cols-1 md:hidden gap-4 h-fit">
          {[{}].map((brand, index) => (
            <LoaderCard key={index} />
          ))}
        </div>
        <div className="hidden lg:hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
          {[{}, {}].map((brand, index) => (
            <LoaderCard key={index} />
          ))}
        </div>
        <div className="hidden lg:grid lg:grid-cols-3 gap-4 h-fit">
          {[{}, {}, {}].map((brand, index) => (
            <LoaderCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="py-4 font-medium text-[18px] w-fit">
        <span>Testimonial</span>
        <hr className="w-3/4 mt-2 border-[1px] border-[#00aecd]" />
      </h1>

      <div className="carousel-container">
        <Slider {...settings}>
          {testimonials.map((testimonail) => (
            <div key={testimonail?.id} className="carousel-item">
              <Card
                className="h-full p-4 flex flex-col items-center justify-between "
                key={testimonail.id}
              >
                <div className="carousel-card">
                  <div>{testimonail.review}</div>
                  <div className="flex gadiv-2 items-center">
                    <div className="font-semibold text-lg text-center">
                      {/* @ts-ignore */}
                      {testimonail?.user?.name}
                    </div>
                    <span> - </span>
                    <div className="font-semibold text-lg text-[#00aedc]">
                      {testimonail.companyName}
                    </div>
                  </div>
                </div>
              </Card>
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
          height: 200px;
          // border: 2px solid black;
          // width:350px;
          /* Set the fixed height for each card */
        }
        .carousel-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          justify-items: center;
          // border: 2px solid red;
        }
      `}</style>
    </div>
  );
}
