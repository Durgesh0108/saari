// @ts-nocheck

"use client";

import React, { useCallback, useEffect, useReducer, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Nunito_Sans } from "next/font/google";
import Header2 from "@/components/ui/Header2";
import Header1 from "@/components/ui/Header1";

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

  const propertyLoadHandler = useCallback((propertyList) => {
    dispatchPropertyList({
      type: "LOAD_DATA",
      properties: propertyList,
    });
  }, []);

  useEffect(() => {
    propertyLoadHandler(products);
  }, [propertyLoadHandler, products]);

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
      router.push(`/products?occassionId=${selectedOccasion.id}`);
    }
  };

  return (
    <div className="my-8">
      <div className="container px-8 py-8 flex flex-col gap-y-4">
        {/* <div
          className={`font-medium text-[#afafaf] text-2xl ${nunito.className}`}
        >
        </div> */}
        <Header1>Shop By Occassion</Header1>
        {/* <div className="font-medium text-5xl italic"> */}
        {/* </div> */}
        <Header2>Styles for special events & everyday moments</Header2>
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap gap-6 my-6">
            {uniqueOccasions.map((city, id) => {
              return (
                <div key={id} className="flex flex-col items-center">
                  <button
                    className={`flex items-center justify-center bg-slate-200 border-none text-black w-36 h-36 rounded-full hover:scale-105 duration-300 ${
                      isActive ? "border-4 border-pink-500" : ""
                    }`}
                    onClick={() => filterItem(city.name)}
                  >
                    <Image
                      src={city.imageUrl}
                      alt={city.name}
                      height={1000}
                      width={1000}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                  <span className="block mt-2 text-center">{city.name}</span>
                </div>
              );
            })}
          </div>
          <div>
            {selectedOccasion && (
              <button
                onClick={handleViewMore}
                className="py-2 px-4 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition-colors duration-300"
              >
                View More
              </button>
            )}
          </div>
        </div>

        {propertyList.propertyOnPage.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {propertyList.propertyOnPage.map((property, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/product/${property.id}`}>
                  <div className="relative">
                    <Image
                      src={property.images[0].url}
                      alt={property.name}
                      height={1000}
                      width={1000}
                      className="w-full h-72 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-lg p-2">
                      {property.name}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 w-full h-80 flex justify-center items-center">
            <Image
              src="https://res.cloudinary.com/dttieobbt/image/upload/v1717074733/product-not-found_ptexdu.jpg"
              alt="No Product"
              height={500}
              width={500}
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopByOccassion;
