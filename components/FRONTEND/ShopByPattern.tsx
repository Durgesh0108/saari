// // @ts-nocheck

// "use client";

// import React, { useEffect, useState } from "react";
// import { Nunito_Sans } from "next/font/google";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";

// import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
// import Image from "next/image";

// const nunito = Nunito_Sans({ subsets: ["latin"] });

// export default function ShopByPattern({ Patterns }) {
//   return (
//     <div className="text-center ">
//       <div className="container m-auto flex flex-col gap-y-4">
//         <div
//           className={`font-medium text-[#afafaf] text-lg ${nunito.className}`}
//         >
//           IN THE SPOTLIGHT
//         </div>
//         <div className="font-medium text-5xl italic ">
//           Unique Indian block prints
//         </div>
//         {/* <div className="flex justify-between  items-center "> */}
//         {/* <div className="flex gap-6 my-6 justify-between"> */}
//         <div className="px-32">
//           <Swiper
//             effect={"coverflow"}
//             grabCursor={true}
//             loop={true}
//             centeredSlides={true}
//             pagination={{
//               dynamicBullets: true,
//               clickable: true,
//             }}
//             autoplay={{
//               delay: 2000,
//               disableOnInteraction: false,
//             }}
//             slidesPerView={"auto"}
//             coverflowEffect={{
//               rotate: 50,
//               stretch: 0,
//               depth: 100,
//               modifier: 1,
//               slideShadows: true,
//             }}
//             modules={[EffectCoverflow, Pagination, Navigation]}
//             className="mySwiper selection:w-3/4 "
//           >
//             {Patterns.map((pattern, index) => (
//               <SwiperSlide className=" w-1/3  overflow-hidden" key={index}>
//                 {/* <Link href={`/pattern/${pattern.id}`}> */}
//                 <Link href={`/products?patternId=${pattern.id}`}>
//                   <div className=" h-80  relative  ">
//                     <Image
//                       src={pattern.imageUrl}
//                       alt={pattern.name}
//                       height={1}
//                       width={1000}
//                       className="w-full h-full overflow-hidden object-cover   "
//                     />
//                   </div>
//                 </Link>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//         {/* </div> */}
//         {/* </div> */}
//       </div>
//     </div>
//   );
// }

// @ts-nocheck

"use client";

import React from "react";
import { Nunito_Sans } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

import "@/public/css/swiper.css";
import { EffectCards, EffectCoverflow, Pagination } from "swiper/modules";

const nunito = Nunito_Sans({ subsets: ["latin"] });

const ShopByPattern = ({ Patterns }) => {
  return (
    <div className="">
      <div className="container mx-auto px-4 sm:px-8 flex flex-col items-center">
        <div className="text-center mb-8">
          <div
            className={`font-medium text-[#afafaf] text-lg ${nunito.className}`}
          >
            IN THE SPOTLIGHT
          </div>
          <div className="font-medium text-5xl italic durgesh">
            Unique Indian block prints
          </div>
        </div>

        <div className="px-4 md:px-0 w-1/2 md:w-1/3 lg:w-1/4">
          {/* <Swiper
            effect="coverflow"
            grabCursor={true}
            loop={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          > */}
          <Swiper
            effect={"cards"}
            pagination={{
              clickable: true,
            }}
            loop={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {Patterns.map((pattern, index) => (
              <SwiperSlide key={index} className="swiper-slide ">
                <Link href={`/products?patternId=${pattern.id}`} className="">
                  <span className="flex h-48 md:h-80 relative rounded-lg overflow-hidden">
                    <Image
                      src={pattern.imageUrl}
                      alt={pattern.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ShopByPattern;
