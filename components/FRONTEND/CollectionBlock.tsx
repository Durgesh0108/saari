// // @ts-nocheck

// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";

// import Swimwear from "@/public/assets/images/collection/swimwear.png";
// import top from "@/public/assets/images/collection/top.png";
// import { Product } from "@prisma/client";
// // import Swimwear from "@/public/assets/images/collection/swimwear.png";

// const data = {
//   slides: [
//     {
//       href: "shop-breadcrumb1.html",
//       imgSrc: "/assets/images/sarri/Sarees.jpg",
//       altText: "swimwear",
//       collectionName: "Sarees",
//       heading: "Sarees",
//     },
//     {
//       href: "shop-breadcrumb1.html",
//       imgSrc: "/assets/images/sarri/kurta.jpg",
//       altText: "top",
//       collectionName: "top",
//       heading: "Kurta",
//     },
//     {
//       href: "shop-breadcrumb1.html",
//       imgSrc: "/assets/images/sarri/kurta-sets.jpg",
//       altText: "sets",
//       collectionName: "sets",
//       heading: "Kurta Sets",
//     },
//     {
//       href: "shop-breadcrumb1.html",
//       imgSrc: "/assets/images/sarri/gift.jpg",
//       altText: "outerwear",
//       collectionName: "outerwear",
//       heading: "Gifts",
//     },
//   ],
// };

// export default function CollectionBlack() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productRes = await fetch(`/api/website/product`);
//       const Product = await productRes.json();
//       setProducts(Product);
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div className="collection-block md:pt-20 pt-10 mb-8 font-serif">
//       <div className="container px-8">
//         <div className="font-medium text-[#afafaf] text-2xl">
//           Shop By Category
//         </div>
//         <div className="font-medium  text-5xl italic mt-2 ">
//           Styles for special events & everyday moments
//         </div>
//       </div>
//       <div className="list-collection relative section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4 ">
//         {/* <div className="swiper-button-prev lg:left-10 left-6" /> */}
//         <Swiper
//           slidesPerView={4}
//           spaceBetween={30}
//           loop={true}
//           pagination={{
//             dynamicBullets: true,
//             clickable: true,
//           }}
//           autoplay={{
//             delay: 2000,
//             disableOnInteraction: false,
//           }}
//           modules={[Autoplay]}
//           className="w-full h-full  "
//         >
//           {products.map((slide, index) => (
//             <SwiperSlide className="h-full m-8" key={index}>
//               <div
//                 className="hover:scale-110 z-50 duration-700 group "
//                 key={index}
//               >
//                 <div
//                   className="rounded-full w-5 h-5 top-1 left-1 relative"
//                   style={{ backgroundColor: "#C2915E" }}
//                 ></div>
//                 <div className=" rounded-tl-[100px] rounded-br-2xl  h-72 relative -top-5 ">
//                   <img
//                     src={slide?.category?.imageUrl}
//                     alt={slide?.category?.name}
//                     className="w-full h-full overflow-hidden object-cover  rounded-tl-[100px] rounded-br-2xl"
//                   />

//                   {/* <Image src={slide.imgSrc} alt={slide.altText} fill/> */}
//                 </div>
//                 <div className=" group-hover:scale-110 duration-700 text-[20px]">
//                   {slide?.category?.name}
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* <div className="swiper-button-next lg:right-10 right-6" /> */}
//       </div>
//     </div>
//   );
// }

// @ts-nocheck

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import Swimwear from "@/public/assets/images/collection/swimwear.png";
import top from "@/public/assets/images/collection/top.png";
import { Product } from "@prisma/client";
import Link from "next/link";

// import Swimwear from "@/public/assets/images/collection/swimwear.png";

const data = {
  slides: [
    {
      href: "shop-breadcrumb1.html",
      imgSrc: "/assets/images/sarri/Sarees.jpg",
      altText: "swimwear",
      collectionName: "Sarees",
      heading: "Sarees",
    },
    {
      href: "shop-breadcrumb1.html",
      imgSrc: "/assets/images/sarri/kurta.jpg",
      altText: "top",
      collectionName: "top",
      heading: "Kurta",
    },
    {
      href: "shop-breadcrumb1.html",
      imgSrc: "/assets/images/sarri/kurta-sets.jpg",
      altText: "sets",
      collectionName: "sets",
      heading: "Kurta Sets",
    },
    {
      href: "shop-breadcrumb1.html",
      imgSrc: "/assets/images/sarri/gift.jpg",
      altText: "outerwear",
      collectionName: "outerwear",
      heading: "Gifts",
    },
  ],
};

export default function CollectionBlack() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productRes = await fetch(`/api/website/product`);
      const products = await productRes.json();

      // Create a map to store unique categories
      const categoryMap = new Map();
      products.forEach((product) => {
        const category = product.category;
        if (!categoryMap.has(category.name)) {
          categoryMap.set(category.name, product);
        }
      });

      // Convert map values to an array
      const uniqueProducts = Array.from(categoryMap.values());
      setProducts(uniqueProducts);
    };
    fetchProducts();
  }, []);

  return (
    <div className="md:pt-20 pt-10 mb-8 font-serif">
      <div className="container px-8">
        <div className="font-medium text-[#afafaf] text-2xl">
          Shop By Category
        </div>
        <div className="font-medium  text-5xl italic mt-2 ">
          Styles for special events & everyday moments
        </div>
      </div>
      <div className="list-collection relative section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4 ">
        {/* <div className="swiper-button-prev lg:left-10 left-6" /> */}
        <Swiper
          slidesPerView={4}
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
          className="w-full h-full  "
        >
          {products.map((slide, index) => (
            <SwiperSlide className="h-full m-8" key={index}>
              <Link href={`/category/${slide.categoryId}`}>
                <div
                  className="hover:scale-110 z-50 duration-700 group "
                  key={index}
                >
                  <div
                    className="rounded-full w-5 h-5 top-1 left-1 relative"
                    style={{ backgroundColor: "#C2915E" }}
                  ></div>
                  <div className=" rounded-tl-[100px] rounded-br-2xl  h-72 relative -top-5 ">
                    <img
                      src={slide?.category?.imageUrl}
                      alt={slide?.category?.name}
                      className="w-full h-full overflow-hidden object-cover  rounded-tl-[100px] rounded-br-2xl"
                    />

                    {/* <Image src={slide.imgSrc} alt={slide.altText} fill/> */}
                  </div>
                  <div className=" group-hover:scale-110 duration-700 text-[20px]">
                    {slide?.category?.name}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* <div className="swiper-button-next lg:right-10 right-6" /> */}
      </div>
    </div>
  );
}
