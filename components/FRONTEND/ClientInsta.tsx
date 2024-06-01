"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Instagram } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const data = {
  slides: [
    {
      href: "https://www.instagram.com/",
      imgSrc: "assets/images/instagram/1.png",
      altText: "0",
      iconClass: "FaInstagram",
      iconSize: "text-2xl",
    },
    {
      href: "https://www.instagram.com/",
      imgSrc: "assets/images/instagram/1.png",
      altText: "1",
      iconClass: "FaInstagram",
      iconSize: "text-2xl",
    },
    {
      href: "https://www.instagram.com/",
      imgSrc: "assets/images/instagram/2.png",
      altText: "2",
      iconClass: "FaInstagram",
      iconSize: "text-2xl",
    },
    {
      href: "https://www.instagram.com/",
      imgSrc: "assets/images/instagram/3.png",
      altText: "3",
      iconClass: "FaInstagram",
      iconSize: "text-2xl",
    },
    {
      href: "https://www.instagram.com/",
      imgSrc: "assets/images/instagram/4.png",
      altText: "4",
      iconClass: "FaInstagram",
      iconSize: "text-2xl",
    },
    {
      href: "https://www.instagram.com/",
      imgSrc: "assets/images/instagram/5.png",
      altText: "5",
      iconClass: "FaInstagram",
      iconSize: "text-2xl",
    },
  ],
  customer: [],
};

const Clientinsta = () => {
  return (
    <div>
      <div className="instagram-block md:pt-20 pt-10">
        <div className="container">
          <div className="heading">
            <div className="heading3 text-center">Anvogue On Instagram</div>
            <div className="text-center mt-3">#Anvougetheme</div>
          </div>
          <div className="list-instagram md:mt-10 mt-6">
            <div className="swiper swiper-list-instagram">
              <div className="swiper-wrapper">
                <Swiper
                  slidesPerView={5}
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
                  modules={[Autoplay]}
                  className="w-full h-full"
                >
                  {data.slides.map((slide, index) => (
                    <SwiperSlide className="h-full " key={index}>
                      <div className="swiper-slide">
                        <a
                          href={slide.href}
                          target="_blank"
                          className="item relative block rounded-[32px] overflow-hidden"
                        >
                          Durgesh
                          {/* <img
														src={slide.imgSrc}
														alt={slide.altText}
														className="h-full w-full duration-500 relative"
													/> */}
                          <div className="icon w-12 h-12 bg-white hover:bg-black hover:text-white duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                            <FaInstagram className="text-2xl" />
                          </div>
                        </a>
                      </div>
                    </SwiperSlide>
                  ))}

                  {/* <SwiperSlide className="h-full">
                    <div className="swiper-slide">
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        className="item relative block rounded-[32px] overflow-hidden"
                      >
                        <img
                          src="assets/images/instagram/1.png"
                          alt={1}
                          className="h-full w-full duration-500 relative"
                        />
                        <div className="icon w-12 h-12 bg-white hover:bg-black hover:text-white duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                          <FaInstagram className="text-2xl" />
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="h-full">
                    <div className="swiper-slide">
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        className="item relative block rounded-[32px] overflow-hidden"
                      >
                        <img
                          src="assets/images/instagram/2.png"
                          alt={2}
                          className="h-full w-full duration-500 relative"
                        />
                        <div className="icon w-12 h-12 bg-white hover:bg-black hover:text-white duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                          <FaInstagram className="text-2xl" />
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper-slide">
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        className="item relative block rounded-[32px] overflow-hidden"
                      >
                        <img
                          src="assets/images/instagram/3.png"
                          alt={3}
                          className="h-full w-full duration-500 relative"
                        />
                        <div className="icon w-12 h-12 bg-white hover:bg-black hover:text-white duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                          <FaInstagram className="text-2xl" />
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper-slide ">
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        className="item relative block rounded-[32px] overflow-hidden"
                      >
                        <img
                          src="assets/images/instagram/4.png"
                          alt={4}
                          className="h-full w-full duration-500 relative"
                        />
                        <div className="icon w-12 h-12 bg-white hover:bg-black hover:text-white duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                          <FaInstagram className="text-2xl" />
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper-slide">
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        className="item relative block rounded-[32px] overflow-hidden"
                      >
                        <img
                          src="assets/images/instagram/5.png"
                          alt={5}
                          className="h-full w-full duration-500 relative"
                        />
                        <div className="icon w-12 h-12 bg-white hover:bg-black hover:text-white duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                          <FaInstagram className="text-2xl" />
                        </div>
                      </a>
                    </div>
                  </SwiperSlide> */}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clientinsta;
