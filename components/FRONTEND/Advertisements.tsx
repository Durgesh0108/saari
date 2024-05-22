"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Advertisement } from "@prisma/client";
import Image from "next/image";

const SliderAdCarousel = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);

  useEffect(() => {
    // Fetch ads data from the backend or database
    fetch("/api/advertisement/sliderAds")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Set the ads data
        setAds(data);
      })
      .catch((error) => {
        console.error("Error fetching ads data:", error);
      });
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {ads.map((ad) => (
          <div key={ad.id}>
            {/* <Image
              src={ad.imageUrl}
              height={200}
              width={1000}
              alt="ads"
              className="w-full"
            /> */}
            <Image src={ad.imageUrl} alt={ad.id} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderAdCarousel;
