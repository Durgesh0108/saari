// @ts-nocheck

"use client";

import React, { useEffect, useState } from "react";
import { Nunito_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

const nunito = Nunito_Sans({ subsets: ["latin"] });

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
//       return newVal.color.name === action.curcity;
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

export default function ShopByPattern() {
  const [products, setProducts] = useState([]);
  const [uniquePatterns, setUniquePatterns] = useState([]);

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       const productRes = await fetch(`/api/website/product`);
  //       const products = await productRes.json();
  //       setProducts(products);

  //       const patternMap = new Map();
  //       products.forEach((product) => {
  //         const pattern = product.pattern;
  //         if (pattern && !patternMap.has(pattern.id)) {
  //           patternMap.set(pattern.id, pattern);
  //         }
  //       });

  //       const uniquePatterns = Array.from(patternMap.values());
  //       setUniquePatterns(uniquePatterns);
  //     };
  //     fetchProducts();
  //   }, []);

  useEffect(() => {
    const fetchpatterns = async () => {
      const patternRes = await fetch(`/api/pattern`);
      const patterns = await patternRes.json();
      setUniquePatterns(patterns);
    };
    fetchpatterns();
  }, []);

  return (
    <div className="text-center">
      <div className="container m-auto py-8 px-10 flex flex-col gap-y-4">
        <div
          className={`font-medium text-[#afafaf] text-lg ${nunito.className}`}
        >
          IN THE SPOTLIGHT
        </div>
        <div className="font-medium text-5xl italic ">
          Unique Indian block prints
        </div>
        {/* <div className="flex justify-between  items-center "> */}
        {/* <div className="flex gap-6 my-6 justify-between"> */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          loop={true}
          centeredSlides={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="mySwiper  p-8"
        >
          {uniquePatterns.map((pattern, index) => (
            <SwiperSlide
              className="w-1/3 rounded-tl-[100px] rounded-br-3xl overflow-hidden"
              key={index}
            >
              <Link href={`/pattern/${pattern.id}`}>
                {/* <div
                  className="rounded-full w-5 h-5 top-1 left-1 relative"
                  style={{ backgroundColor: "#C2915E" }}
                ></div> */}
                <div className="   h-96 relative  ">
                  <Image
                    src={pattern.imageUrl}
                    alt={pattern.name}
                    height={1}
                    width={1000}
                    className="w-full h-full overflow-hidden object-cover   "
                  />
                </div>
                {/* <div className=" group-hover:scale-110 group-hover:ml-3 group-hover:font-bold duration-500 italic -mt-3 text-2xl group-hover:text-[27px]">
                  {pattern.name}
                </div> */}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
