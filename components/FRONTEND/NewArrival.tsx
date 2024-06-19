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

// const NewArrivalSection = ({ products }) => {
//   const [isActive, setIsActive] = useState(false);
//   // const [products, setProducts] = useState<Product[]>([]);
//   const [selectedOccasion, setSelectedOccasion] = useState(null);
//   const router = useRouter();

//   const [occassion, setOccassion] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productRes = await fetch(`/api/occassion`);
//       const products = await productRes.json();
//       setOccassion(products);
//     };
//     fetchProducts();
//   }, []);

//   // useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     const productRes = await fetch(`/api/website/product`);
//   //     const products = await productRes.json();
//   //     setProducts(products);
//   //   };
//   //   fetchProducts();
//   // }, []);

//   const [propertyList, dispatchPropertyList] = useReducer(
//     PropertyListReducer,
//     InitialState
//   );

//   const propertyLoadHandler = useCallback(
//     (propertyList) => {
//       dispatchPropertyList({
//         type: "LOAD_DATA",
//         properties: propertyList,
//       });
//     },
//     [propertyList]
//   );

//   useEffect(() => {
//     propertyLoadHandler(products);
//   }, [products]);

//   const showMoreHandler = () => {
//     dispatchPropertyList({
//       type: "SHOW_MORE",
//       value: 3,
//     });
//   };

//   const filterItem = (curcity) => {
//     setIsActive(true);
//     const occasion = uniqueOccasions.find((o) => o.name === curcity);
//     setSelectedOccasion(occasion);
//     dispatchPropertyList({
//       type: "FILTER",
//       property: products,
//       curcity,
//       propertyPerPage: 6,
//     });
//   };

//   const uniqueOccasions = products.reduce((acc, curr) => {
//     if (!acc.some((item) => item.name === curr.occassion.name)) {
//       acc.push({
//         name: curr.occassion.name,
//         imageUrl: curr.occassion.imageUrl,
//         id: curr.occassion.id,
//       });
//     }
//     return acc;
//   }, []);

//   const handleViewMore = () => {
//     if (selectedOccasion) {
//       router.push(`/occassion/${selectedOccasion.id}`);
//     }
//   };

//   return (
//     <div className="">
//       <div className=" m-auto flex-col gap-y-4 flex">
//         <div className=" w-full text-center">
//           <div
//             className={`font-medium text-[#afafaf] text-2xl ${nunito.className}`}
//           >
//             New Arrivals
//           </div>
//           <div className="font-medium text-5xl italic ">
//             Shop the New Arrivals
//           </div>
//         </div>

//         {propertyList.propertyOnPage.length > 0 ? (
//           <div className=" my-8  grid grid-cols-4  w-full m-auto ">
//             {propertyList.propertyOnPage.slice(0, 4).map((property, index) => (
//               <Link key={index} href={`/product/${property.id}`}>
//                 <div className=" h-full" key={index}>
//                   <div className="h-72 2xl:h-96 ">
//                     <Image
//                       src={property.images[0].url}
//                       alt={property.name}
//                       height={1}
//                       width={1000}
//                       className="w-full h-full overflow-hidden object-cover "
//                     />
//                   </div>
//                   <div className=" duration-500 pl-2 pt-1 w-full text-center">
//                     <h1 className="text-2xl font-bold">{property.name}</h1>
//                     <p className="text-sm">
//                       {property.shortDescription}
//                       {/* Black Bagh Block Printed Pure Cotton Saree */}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className=" mt-8  overflow-hidden w-full m-auto  h-80">
//             {propertyList.propertyOnPage.length === 0 && (
//               <div className="flex flex-col justify-center items-center text-center w-full h-full ">
//                 <p className=" flex items-center">
//                   <Image
//                     src={
//                       "https://res.cloudinary.com/dttieobbt/image/upload/v1717074733/product-not-found_ptexdu.jpg"
//                     }
//                     alt="no Product"
//                     height={1}
//                     width={1000}
//                     className="w-fit h-full object-contain "
//                   />
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NewArrivalSection;
// @ts-nocheck

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header2 from "../ui/Header2";
import Header1 from "../ui/Header1";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const NewArrivalSection = ({ products }) => {
  return (
    <div className="">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center mb-8">
          <Header1>New Arrivals</Header1>
          <Header2>Shop The New Arrivals</Header2>
        </div>

        {products.length > 0 ? (
          <Swiper
            slidesPerView={2.5} // Adjust this for smaller viewports
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 3.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4.5,
                spaceBetween: 30,
              },
            }}
            className="w-full"
          >
            {products.map((property, index) => (
              <SwiperSlide key={index}>
                <Link
                  key={index}
                  href={`/product/${property.id}`}
                  className="group"
                >
                  <div className="relative rounded-tl-2xl rounded-br-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <Image
                      src={property.images[0].url}
                      alt={property.name}
                      width={600} // Increased width
                      height={600} // Increased height
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-2 text-center">
                      <h1 className="text-base md:text-xl font-bold line-clamp-1">
                        {property.name}
                      </h1>
                      <p className="text-sm md:text-lg line-clamp-1">
                        &#8377; {property.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="mt-8 flex flex-col justify-center items-center text-center w-full">
            <Image
              src="https://res.cloudinary.com/dttieobbt/image/upload/v1717074733/product-not-found_ptexdu.jpg"
              alt="No Products Found"
              width={500}
              height={500}
              className="object-contain"
            />
            <p className="mt-4 text-lg text-gray-600">No new arrivals found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivalSection;
