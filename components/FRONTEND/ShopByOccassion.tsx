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

const nunito = Nunito_Sans({ subsets: ["latin"] });

const InitialState = {
  properties: [],
  propertyPerPage: 4,
  propertyOnPage: [],
};

const PropertyListReducer = (state, action) => {
  if (action.type === "LOAD_DATA") {
    const indexOfLastProperty = 1 * state.propertyPerPage;
    const indexOfFirstProperty = indexOfLastProperty - state.propertyPerPage;
    const currentListOfProperty = action.properties.slice(
      indexOfFirstProperty,
      indexOfLastProperty
    );
    return {
      propertyOnPage: currentListOfProperty,
      properties: action.properties,
      propertyPerPage: state.propertyPerPage,
    };
  }

  if (action.type === "SHOW_MORE") {
    const indexOfLastProperty = 1 * (state.propertyPerPage + action.value);
    const indexOfFirstProperty =
      indexOfLastProperty - (state.propertyPerPage + action.value);
    const currentListOfProperty = state.properties.slice(
      indexOfFirstProperty,
      indexOfLastProperty
    );
    return {
      propertyOnPage: currentListOfProperty,
      properties: state.properties,
      propertyPerPage: state.propertyPerPage + 3,
    };
  }

  if (action.type === "FILTER") {
    const newItem = action.property.filter((newVal) => {
      return newVal.occassion.name === action.curcity;
    });

    const indexOfLastProperty = 1 * action.propertyPerPage;
    const indexOfFirstProperty = indexOfLastProperty - action.propertyPerPage;
    const currentListOfProperty = newItem.slice(
      indexOfFirstProperty,
      indexOfLastProperty
    );

    return {
      propertyOnPage: currentListOfProperty,
      properties: newItem,
      propertyPerPage: state.propertyPerPage,
    };
  }
  return InitialState;
};

const ShopByOccassion = ({ occassion, products }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const router = useRouter();

  const [propertyList, dispatchPropertyList] = useReducer(
    PropertyListReducer,
    InitialState
  );

  const propertyLoadHandler = useCallback(
    (propertyList) => {
      dispatchPropertyList({
        type: "LOAD_DATA",
        properties: propertyList,
      });
    },
    [propertyList]
  );

  useEffect(() => {
    propertyLoadHandler(products);
  }, [products]);

  const showMoreHandler = () => {
    dispatchPropertyList({
      type: "SHOW_MORE",
      value: 3,
    });
  };

  const filterItem = (curcity) => {
    setIsActive(true);
    const occasion = uniqueOccasions.find((o) => o.name === curcity);
    setSelectedOccasion(occasion);
    dispatchPropertyList({
      type: "FILTER",
      property: products,
      curcity,
      propertyPerPage: 6,
    });
  };

  const uniqueOccasions = products.reduce((acc, curr) => {
    if (!acc.some((item) => item.name === curr.occassion.name)) {
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
      router.push(`/occassion/${selectedOccasion}`);
    }
  };

  const firstImage = propertyList.propertyOnPage[0];

  console.log("selected Occassion", { selectedOccasion });

  return (
    <div className="">
      <div className="relative ">
        <div className=" py-8  flex flex-col gap-y-4">
          <div className="grid grid-cols-3  items-center justify-center ">
            <div className=" w-full h-full col-span-1">
              {/* {firstImage && (
                <Link href={`/product/${firstImage.id}`}>
                  <div className=" h-96 relative">
                    <Image
                      src={occassion.imageUrl}
                      alt={firstImage.name}
                      height={1}
                      width={1000}
                      className="w-full h-full overflow-hidden object-cover  group-hover:shadow-2xl group-hover:shadow-slate-300"
                    />
                  </div>
                </Link>
              )} */}
              <Link href={`/occassion/${selectedOccasion}`}>
                <div className="h-[420px] relative">
                  <Image
                    src={
                      selectedOccasion
                        ? occassion.find((occ) => occ.id === selectedOccasion)
                            .imageUrl
                        : `${occassion[0].imageUrl}`
                    }
                    alt="Occassion"
                    height={1}
                    width={1000}
                    className="w-full h-full overflow-hidden object-cover group-hover:shadow-2xl group-hover:shadow-slate-300"
                  />
                </div>
              </Link>
            </div>

            <div className="col-span-2  ">
              <div className="flex flex-col h-full ">
                <div className="">
                  <div className="mx-4 ">
                    <div
                      className={`font-medium text-[#afafaf] text-2xl ${nunito.className}`}
                    >
                      Shop By Occassion
                    </div>
                    <div className="font-medium text-5xl italic ">
                      Styles for special events & everyday moments
                    </div>
                  </div>
                  <div className="flex  mx-4  items-center  ">
                    <div className="flex gap-6  justify-between">
                      {occassion.map((city, id) => {
                        return (
                          <div key={id}>
                            <button
                              className={`flex flex-col items-center justify-center group/category text-black    duration-500 ${
                                isActive ? "" : ""
                              }`}
                              onClick={() => {
                                filterItem(city.name);
                                setSelectedOccasion(city.id);
                              }}
                              key={id}
                            >
                              {/* <Image
                            src={city.imageUrl}
                            alt={city.name}
                            height={1}
                            width={1000}
                            className="w-full h-full object-cover rounded-full"
                          /> */}
                              <span className="block mt-2 text-center text-xl">
                                {city.name}
                              </span>
                              <div
                                className={`duration-500 w-0 group-hover/category:w-full rounded-full border-b-2 border-b-black `}
                              ></div>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <div className="ml-80">
                      {selectedOccasion && (
                        <button
                          onClick={handleViewMore}
                          className=" py-2 px-4 bg-pink-500 text-white font-bold rounded-full "
                        >
                          View More
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" ">
                  {propertyList.propertyOnPage.length > 0 ? (
                    <div className=" mt-2   grid grid-cols-4 overflow-hidden h-full w-full m-auto ">
                      {propertyList.propertyOnPage.map((property, index) => (
                        <div key={index} className="">
                          <Link key={index} href={`/product/${property.id}`}>
                            <div className="" key={index}>
                              <div className=" h-52 relative">
                                <Image
                                  src={property.images[0].url}
                                  alt={property.name}
                                  height={1}
                                  width={1000}
                                  className="w-full h-full overflow-hidden object-cover  group-hover:shadow-2xl group-hover:shadow-slate-300"
                                />
                              </div>
                              <div className="duration-500 italic text-lg 2xl:text-2xl">
                                {property.name}
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className=" mt-8  overflow-hidden w-full m-auto ">
                      {propertyList.propertyOnPage.length === 0 && (
                        <div className="flex flex-col justify-center items-center text-center w-full h-full ">
                          <p className="h-44 flex items-center">
                            <Image
                              src={
                                "https://res.cloudinary.com/dttieobbt/image/upload/v1717074733/product-not-found_ptexdu.jpg"
                              }
                              alt="no Product"
                              height={1}
                              width={1000}
                              className="h-full w-full  object-contain "
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
  );
};

export default ShopByOccassion;
