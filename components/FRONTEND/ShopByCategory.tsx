// // @ts-nocheck

// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import { Product } from "@prisma/client";
// import Link from "next/link";

// import { Nunito_Sans } from "next/font/google";
// const nunito = Nunito_Sans({ subsets: ["latin"] });

// export default function ShopByCategory({ categories }) {
//   return (
//     <div className="">
//       <div className="container m-auto flex flex-col gap-y-2 md:gap-y-4 ">
//         <div
//           className={`font-medium text-[#afafaf] text-lg md:text-2xl ${nunito.className}`}
//         >
//           Shop By Category
//         </div>
//         <div className="font-medium text-2xl md:text-5xl italic  ">
//           Fine drapes, ready-to-wear styles, and more
//         </div>

//         <div className="list-collection relative section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4 grid grid-cols-4 gap-8">
//           {categories.map((category, index) => (
//             // <Link href={`/category/${category.id}`} key={index}>
//             <Link href={`/products?categoryId=${category.id}`} key={index}>
//               <div
//                 className="hover:scale-110 z-50 duration-500 group "
//                 key={index}
//               >
//                 <div
//                   className="hidden md:block rounded-full w-5 h-5 top-1 left-1 relative"
//                   style={{ backgroundColor: "#C2915E" }}
//                 ></div>
//                 <div className="rounded-2xl md:rounded-tl-[100px] md:rounded-br-2xl h-32 md:h-96 relative -top-5 ">
//                   <Image
//                     src={category.imageUrl}
//                     alt={category.name}
//                     height={1}
//                     width={1000}
//                     className="w-full h-full overflow-hidden object-cover rounded-2xl  md:rounded-tl-[100px] md:rounded-br-2xl group-hover:shadow-2xl group-hover:shadow-slate-300"
//                   />
//                 </div>
//                 <div className=" group-hover:scale-110 group-hover:ml-3 group-hover:font-bold duration-500 italic -mt-3 text-2xl group-hover:text-[27px]">
//                   {category.name}
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// @ts-nocheck

"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import Header1 from "../ui/Header1";
import Header2 from "../ui/Header2";
import { Nunito_Sans } from "next/font/google";
const nunito = Nunito_Sans({ subsets: ["latin"] });

export default function ShopByCategory({ categories }) {
  return (
    <div className="">
      <div className="container mx-auto flex flex-col gap-y-2 md:gap-y-4 px-4 sm:px-8">
        <Header1>Shop By Category</Header1>
        <Header2>Fine drapes, ready-to-wear styles & more</Header2>

        <div className="relative section-swiper-navigation  grid grid-cols-4 gap-2 md:gap-6 ">
          {categories.map((category) => (
            <Link
              href={`/products?categoryId=${category.id}`}
              key={category.id}
            >
              <div className="group hover:scale-105 duration-300 transform transition ">
                <div className="hidden md:block rounded-full w-5 h-5 top-1 left-1 relative bg-[#C2915E]"></div>
                <div className="rounded-2xl md:rounded-none md:rounded-tl-[100px] md:rounded-br-2xl h-40 sm:h-60 md:h-80 relative overflow-hidden md:-top-5">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-cover rounded-2xl md:rounded-none md:rounded-tl-[100px] md:rounded-br-2xl group-hover:shadow-2xl group-hover:shadow-slate-300"
                  />
                </div>
                <div className="text-base  md:text-2xl transition duration-700 group-hover:font-bold group-hover:text-lg md:group-hover:text-3xl">
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
