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

// const ShopByOccassion = ({ occassion, products }) => {
//   const [isActive, setIsActive] = useState(false);
//   const [selectedOccasion, setSelectedOccasion] = useState(null);
//   const router = useRouter();

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
//       // router.push(`/occassion/${selectedOccasion}`);
//       router.push(`/products?occassionId=${selectedOccasion}`);
//     }
//   };

//   const firstImage = propertyList.propertyOnPage[0];

//   console.log("selected Occassion", { selectedOccasion });

//   return (
//     <div className="">
//       <div className="relative ">
//         <div className="  flex flex-col gap-y-4">
//           <div className="grid grid-cols-3  items-center justify-center ">
//             <div className=" w-full h-full col-span-1">
//               {/* {firstImage && (
//                 <Link href={`/product/${firstImage.id}`}>
//                   <div className=" h-96 relative">
//                     <Image
//                       src={occassion.imageUrl}
//                       alt={firstImage.name}
//                       height={1}
//                       width={1000}
//                       className="w-full h-full overflow-hidden object-cover  group-hover:shadow-2xl group-hover:shadow-slate-300"
//                     />
//                   </div>
//                 </Link>
//               )} */}
//               {/* <Link href={`/occassion/${selectedOccasion}`}> */}
//               <Link href={`/products?occassionId=${selectedOccasion}`}>
//                 <div className="h-64 md:h-[420px] relative">
//                   <Image
//                     src={
//                       selectedOccasion
//                         ? occassion.find((occ) => occ.id === selectedOccasion)
//                             .imageUrl
//                         : `${occassion[0].imageUrl}`
//                     }
//                     alt="Occassion"
//                     height={1}
//                     width={1000}
//                     className="w-full h-full overflow-hidden object-cover group-hover:shadow-2xl group-hover:shadow-slate-300"
//                   />
//                 </div>
//               </Link>
//             </div>

//             <div className="col-span-2  ">
//               <div className="flex flex-col h-full ">
//                 <div className="">
//                   <div className="mx-4 ">
//                     <div
//                       className={`font-medium text-[#afafaf] text-lg md:text-2xl ${nunito.className}`}
//                     >
//                       Shop By Occassion
//                     </div>
//                     <div className="font-medium text-3xl md:text-5xl italic ">
//                       Styles for special events & everyday moments
//                     </div>
//                   </div>
//                   <div className="flex  mx-4  items-center  ">
//                     <div className="flex gap-6  justify-between">
//                       {occassion.map((city, id) => {
//                         return (
//                           <div key={id}>
//                             <button
//                               className={`flex flex-col items-center justify-center group/category text-black    duration-500 ${
//                                 isActive ? "" : ""
//                               }`}
//                               onClick={() => {
//                                 filterItem(city.name);
//                                 setSelectedOccasion(city.id);
//                               }}
//                               key={id}
//                             >
//                               {/* <Image
//                             src={city.imageUrl}
//                             alt={city.name}
//                             height={1}
//                             width={1000}
//                             className="w-full h-full object-cover rounded-full"
//                           /> */}
//                               <span className="block mt-2 text-center text-base md:text-xl">
//                                 {city.name}
//                               </span>
//                               <div
//                                 className={`duration-500 w-0 group-hover/category:w-full rounded-full border-b-2 border-b-black `}
//                               ></div>
//                             </button>
//                           </div>
//                         );
//                       })}
//                     </div>
//                     <div className="ml-80">
//                       {selectedOccasion && (
//                         <button
//                           onClick={handleViewMore}
//                           className=" py-2 px-4 bg-pink-500 text-white font-bold rounded-full "
//                         >
//                           View More
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" ">
//                   {propertyList.propertyOnPage.length > 0 ? (
//                     <div className=" mt-2   grid grid-cols-4 overflow-hidden h-full w-full m-auto ">
//                       {propertyList.propertyOnPage.map((property, index) => (
//                         <div key={index} className="">
//                           <Link key={index} href={`/product/${property.id}`}>
//                             <div className="" key={index}>
//                               <div className="h-36 md:h-52 relative">
//                                 <Image
//                                   src={property.images[0].url}
//                                   alt={property.name}
//                                   height={1}
//                                   width={1000}
//                                   className="w-full h-full overflow-hidden object-cover  group-hover:shadow-2xl group-hover:shadow-slate-300"
//                                 />
//                               </div>
//                               <div className="duration-500 italic text-lg 2xl:text-2xl">
//                                 {property.name}
//                               </div>
//                             </div>
//                           </Link>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className=" mt-8  overflow-hidden w-full m-auto ">
//                       {propertyList.propertyOnPage.length === 0 && (
//                         <div className="flex flex-col justify-center items-center text-center w-full h-full ">
//                           <p className="h-44 flex items-center">
//                             <Image
//                               src={
//                                 "https://res.cloudinary.com/dttieobbt/image/upload/v1717074733/product-not-found_ptexdu.jpg"
//                               }
//                               alt="no Product"
//                               height={1}
//                               width={1000}
//                               className="h-full w-full  object-contain "
//                             />
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopByOccassion;
// @ts-nocheck

"use client";

import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Nunito_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import Header1 from "../ui/Header1";
import Header2 from "../ui/Header2";

const nunito = Nunito_Sans({ subsets: ["latin"] });

const InitialState = {
  properties: [],
  propertyPerPage: 4,
  propertyOnPage: [],
};

const PropertyListReducer = (state, action) => {
  if (action.type === "LOAD_DATA") {
    const indexOfLastProperty = state.propertyPerPage;
    const currentListOfProperty = action.properties.slice(
      0,
      indexOfLastProperty
    );
    return {
      ...state,
      properties: action.properties,
      propertyOnPage: currentListOfProperty,
    };
  }

  if (action.type === "SHOW_MORE") {
    const newPropertyPerPage = state.propertyPerPage + action.value;
    const currentListOfProperty = state.properties.slice(0, newPropertyPerPage);
    return {
      ...state,
      propertyPerPage: newPropertyPerPage,
      propertyOnPage: currentListOfProperty,
    };
  }

  if (action.type === "FILTER") {
    const filteredProperties = action.property.filter((newVal) => {
      return newVal.occassion.name === action.curcity;
    });

    const currentListOfProperty = filteredProperties.slice(
      0,
      state.propertyPerPage
    );
    return {
      ...state,
      properties: filteredProperties,
      propertyOnPage: currentListOfProperty,
    };
  }

  return state;
};

const ShopByOccassion = ({ occassion, products }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState(
    occassion.length > 0 ? occassion[0].id : null
  );
  const router = useRouter();

  const [propertyList, dispatchPropertyList] = useReducer(
    PropertyListReducer,
    InitialState
  );

  const propertyLoadHandler = useCallback((propertyList) => {
    dispatchPropertyList({
      type: "LOAD_DATA",
      properties: propertyList,
    });
  }, []);

  useEffect(() => {
    propertyLoadHandler(products);
  }, [products, propertyLoadHandler]);

  const showMoreHandler = () => {
    dispatchPropertyList({
      type: "SHOW_MORE",
      value: 3,
    });
  };

  const filterItem = (curcity, id) => {
    setIsActive(true);
    setSelectedOccasion(id);
    dispatchPropertyList({
      type: "FILTER",
      property: products,
      curcity,
      propertyPerPage: 6,
    });
  };

  const uniqueOccasions = products.reduce((acc, curr) => {
    if (!acc.some((item) => item.id === curr.occassion.id)) {
      acc.push({
        name: curr.occassion.name,
        imageUrl: curr.occassion.imageUrl,
        id: curr.occassion.id,
      });
    }
    return acc;
  }, []);

  const handleViewMore = () => {
    if (selectedOccasion) {
      router.push(`/products?occassionId=${selectedOccasion}`);
    }
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="relative ">
          <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-3 items-center justify-center">
              <div className="w-full h-full col-span-1">
                <Link href={`/products?occassionId=${selectedOccasion}`}>
                  <div className="h-64 md:h-[420px] relative">
                    <Image
                      src={
                        selectedOccasion
                          ? occassion.find((occ) => occ.id === selectedOccasion)
                              ?.imageUrl
                          : occassion[0]?.imageUrl || "/default-image.jpg" // Fallback image
                      }
                      alt="Occassion"
                      height={1}
                      width={1000}
                      className="w-full h-full overflow-hidden object-cover group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-slate-300"
                    />
                  </div>
                </Link>
              </div>
              <div className="col-span-2">
                <div className="flex flex-col h-full">
                  <div className="">
                    <div className="mx-4">
                      <Header1>Shop By Occasion</Header1>
                      <Header2>
                        Styles for special events & everyday moments
                      </Header2>
                    </div>
                    <div className="flex mx-4 items-center w-2/3 justify-between">
                      <div className="flex gap-6 justify-between">
                        {occassion.map((city, id) => (
                          <div key={id}>
                            <button
                              className={`flex flex-col items-center justify-center group/category text-black duration-500 ${
                                isActive ? "" : ""
                              }`}
                              onClick={() => filterItem(city.name, city.id)}
                            >
                              <span className="block mt-2 text-center text-lg md:text-2xl">
                                {city.name}
                              </span>
                              <div
                                className={`duration-500 w-0 group-hover/category:w-full rounded-full border-b-2 border-b-black`}
                              ></div>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="">
                        {selectedOccasion && (
                          <button
                            onClick={handleViewMore}
                            className="py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
                          >
                            View More
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="">
                    {propertyList.propertyOnPage.length > 0 ? (
                      <div className="mt-2 grid grid-cols-4 overflow-hidden h-full w-full m-auto">
                        {propertyList.propertyOnPage.map((property, index) => (
                          <div key={index} className="">
                            <Link href={`/product/${property.id}`}>
                              <div className="h-36 md:h-52 relative">
                                <Image
                                  src={property.images[0].url}
                                  alt={property.name}
                                  height={1}
                                  width={1000}
                                  className="w-full h-full overflow-hidden object-cover "
                                />
                              </div>
                              <div className="duration-500 text-xl line-clamp-1">
                                {property.name}
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-8 overflow-hidden w-full m-auto">
                        {propertyList.propertyOnPage.length === 0 && (
                          <div className="flex flex-col justify-center items-center text-center w-full h-full">
                            <p className="h-44 flex items-center">
                              <Image
                                src="https://res.cloudinary.com/dttieobbt/image/upload/v1717074733/product-not-found_ptexdu.jpg"
                                alt="no Product"
                                height={1}
                                width={1000}
                                className="h-full w-full object-contain"
                              />
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex flex-col gap-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 w-full">
                <div className="flex flex-col gap-4 h-full">
                  <div className="mb-4">
                    <Header1>Shop By Occasion</Header1>

                    <Header2>
                      Styles for special events & everyday moments
                    </Header2>
                  </div>
                  <div className="col-span-1 w-full">
                    <Link href={`/products?occassionId=${selectedOccasion}`}>
                      <div className="h-64 md:h-[420px] relative">
                        <Image
                          src={
                            selectedOccasion
                              ? occassion.find(
                                  (occ) => occ.id === selectedOccasion
                                )?.imageUrl
                              : occassion[0]?.imageUrl || "/default-image.jpg" // Fallback image
                          }
                          alt="Occassion"
                          height={1}
                          width={1000}
                          className="w-full h-full object-cover rounded-lg  group-hover:shadow-2xl transition-shadow duration-300"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap items-center gap-4">
                      {uniqueOccasions.map((city, id) => (
                        <button
                          className={`flex flex-col items-center group text-black duration-500 ${
                            selectedOccasion === city.id ? "font-bold" : ""
                          }`}
                          onClick={() => filterItem(city.name, city.id)}
                          key={id}
                        >
                          <span className="block mt-2 text-center text-lg md:text-2xl">
                            {city.name}
                          </span>
                          <div
                            className={`duration-500 w-0 group-hover:w-full rounded-full border-b-2 ${
                              selectedOccasion === city.id
                                ? "border-b-black"
                                : "border-b-transparent"
                            }`}
                          ></div>
                        </button>
                      ))}
                    </div>
                    {selectedOccasion && (
                      <div className="">
                        <button
                          onClick={handleViewMore}
                          className="py-2 px-4 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition duration-300"
                        >
                          View More
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {propertyList.propertyOnPage.length > 0 ? (
                propertyList.propertyOnPage
                  .slice(0, 4)
                  .map((property, index) => (
                    <div key={index} className="group">
                      <Link href={`/product/${property.id}`}>
                        <div className="relative h-48 md:h-64">
                          <Image
                            src={property.images[0].url}
                            alt={property.name}
                            // layout="fill"
                            fill
                            // objectFit="cover"
                            style={{ objectFit: 'cover' }}
                            className="w-full h-full object-cover rounded-lg group-hover:shadow-2xl transition-shadow duration-300"
                          />
                        </div>
                        <div className="mt-2 text-lg md:text-xl line-clamp-1">
                          {property.name}
                        </div>
                      </Link>
                    </div>
                  ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center">
                  <Image
                    src="https://res.cloudinary.com/dttieobbt/image/upload/v1717074733/product-not-found_ptexdu.jpg"
                    alt="No Product"
                    width={400}
                    height={300}
                    className="object-contain"
                  />
                  <p className="mt-4 text-lg text-gray-600">
                    No products found for the selected occasion.
                  </p>
                </div>
              )}
            </div>

            {/* {propertyList.properties.length >
              propertyList.propertyOnPage.length && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={showMoreHandler}
                  className="py-2 px-6 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition duration-300"
                >
                  Show More
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopByOccassion;
