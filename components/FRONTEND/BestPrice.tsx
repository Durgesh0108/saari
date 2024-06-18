// // @ts-nocheck

// "use client";

// import React, { useCallback, useEffect, useReducer, useState } from "react";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import { Product } from "@prisma/client";
// import Link from "next/link";
// import Image from "next/image";
// import { Nunito_Sans } from "next/font/google";
// import { useRouter } from "next/navigation";

// const nunito = Nunito_Sans({ subsets: ["latin"] });

// const InitialState = {
//   properties: [],
//   propertyPerPage: 4,
//   propertyOnPage: [],
// };

// const PropertyListReducer = (state, action) => {
//   if (action.type === "LOAD_DATA") {
//     const indexOfLastProperty = 1 * state.propertyPerPage;
//     const indexOfFirstProperty = indexOfLastProperty - state.propertyPerPage;
//     const currentListOfProperty = action.properties.slice(
//       indexOfFirstProperty,
//       indexOfLastProperty
//     );
//     return {
//       propertyOnPage: currentListOfProperty,
//       properties: action.properties,
//       propertyPerPage: state.propertyPerPage,
//     };
//   }

//   if (action.type === "SHOW_MORE") {
//     const indexOfLastProperty = 1 * (state.propertyPerPage + action.value);
//     const indexOfFirstProperty =
//       indexOfLastProperty - (state.propertyPerPage + action.value);
//     const currentListOfProperty = state.properties.slice(
//       indexOfFirstProperty,
//       indexOfLastProperty
//     );
//     return {
//       propertyOnPage: currentListOfProperty,
//       properties: state.properties,
//       propertyPerPage: state.propertyPerPage + 3,
//     };
//   }

//   if (action.type === "FILTER") {
//     const newItem = action.property.filter((newVal) => {
//       return newVal.occassion.name === action.curcity;
//     });

//     const indexOfLastProperty = 1 * action.propertyPerPage;
//     const indexOfFirstProperty = indexOfLastProperty - action.propertyPerPage;
//     const currentListOfProperty = newItem.slice(
//       indexOfFirstProperty,
//       indexOfLastProperty
//     );

//     return {
//       propertyOnPage: currentListOfProperty,
//       properties: newItem,
//       propertyPerPage: state.propertyPerPage,
//     };
//   }
//   return InitialState;
// };

// const BestPriceSection = ({ bestPrice }) => {
//   return (
//     <div className="">
//       <div className="container m-auto flex flex-col gap-y-4  w-full">
//         <div
//           className={`font-medium  text-[#afafaf] text-2xl ${nunito.className}`}
//         >
//           Best Price
//         </div>
//         <div className="font-medium text-5xl italic ">
//           Shop the Products at Best Price
//         </div>

//         {bestPrice.length > 0 ? (
//           <div className=" my-8  grid grid-cols-4  w-full m-auto  gap-4">
//             {bestPrice.slice(0, 4).map((best, index) => (
//               <Link key={index} href={`/BestPrice/${best.id}`}>
//                 <div className=" h-full" key={index}>
//                   <div className="h-96">
//                     <Image
//                       src={best.imageUrl}
//                       alt={best.name}
//                       height={1}
//                       width={1000}
//                       className="w-full h-full overflow-hidden object-cover rounded-tl-2xl rounded-br-2xl"
//                     />
//                   </div>
//                   {/* <div className=" duration-500 pt-1">
//                     <h1 className="text-2xl">{property.name}</h1>
//                   </div> */}
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className=" mt-8  overflow-hidden w-full m-auto  h-80">
//             <div className="flex flex-col justify-center items-center text-center w-full h-full ">
//               <p className=" flex items-center">
//                 <Image
//                   src={
//                     "https://res.cloudinary.com/dttieobbt/image/upload/v1717074733/product-not-found_ptexdu.jpg"
//                   }
//                   alt="no Product"
//                   height={1}
//                   width={1000}
//                   className="w-fit h-full object-contain "
//                 />
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BestPriceSection;

// @ts-nocheck

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({ subsets: ["latin"] });

const BestPriceSection = ({ bestPrice }) => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center mb-8">
          <div
            className={`font-medium text-[#afafaf] text-lg md:text-2xl ${nunito.className}`}
          >
            Best Price
          </div>
          <div className="font-medium text-3xl md:text-5xl italic">
            Shop the Products at Best Price
          </div>
        </div>

        {bestPrice.length > 0 ? (
          <div className="grid grid-cols-4 gap-2 md:gap-6">
            {bestPrice.slice(0, 4).map((best, index) => (
              <Link
                key={index}
                href={`/BestPrice/${best.id}`}
                className="group"
              >
                <div className="relative rounded-tl-2xl rounded-br-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={best.imageUrl}
                    alt={best.name}
                    layout="responsive"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-lg md:text-xl p-2 text-center">
                    {best.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col justify-center items-center text-center w-full">
            <Image
              src="https://res.cloudinary.com/dttieobbt/image/upload/v1717074733/product-not-found_ptexdu.jpg"
              alt="No Products Found"
              width={500}
              height={500}
              className="object-contain"
            />
            <p className="mt-4 text-lg text-gray-600">
              No products found for the best price.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestPriceSection;
