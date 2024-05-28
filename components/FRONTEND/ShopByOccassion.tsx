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

const ShopByOccassion = () => {
  const [isActive, setIsActive] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productRes = await fetch(`/api/website/product`);
      const products = await productRes.json();
      console.log("collection block", products);
      setProducts(products);
    };
    fetchProducts();
  }, []);

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
  }, [products]);

  const showMoreHandler = () => {
    dispatchPropertyList({
      type: "SHOW_MORE",
      value: 3,
    });
  };

  const filterItem = (curcity) => {
    setIsActive(true);
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

  return (
    <div className="">
      <div className="container m-auto py-8 px-10 flex flex-col gap-y-4">
        <div
          className={`font-medium text-[#afafaf] text-2xl ${nunito.className}`}
        >
          Shop By Occassion
        </div>
        <div className="font-medium text-5xl italic ">
          Styles for special events & everyday moments
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-6 my-6 justify-between">
            {uniqueOccasions.map((city, id) => {
              return (
                <div key={id}>
                  <button
                    className={`flex flex-col items-center justify-center bg-slate-200 border-none text-black w-36 h-36 rounded-full ${
                      isActive ? "border-2 border-black" : ""
                    }`}
                    onClick={() => filterItem(city.name)}
                    key={id}
                  >
                    <Image
                      src={city.imageUrl}
                      alt={city.name}
                      height={1}
                      width={1000}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                  <span className="block mt-2 text-center">{city.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <ul className="grid grid-cols-4 rounded-tl-[100px]">
          {propertyList.propertyOnPage.slice(0,3).map((property, index) => (
            <div key={index} className="[&:nth-child(1)]:rounded-tl-[100px] last:rounded-br-2xl  only:rounded-tl-[100px]  h-96">
              <div className="">
                <li key={property.id}>
                  <div
                    className="hover:scale-y-110 z-50 duration-700 group"
                    key={index}
                  >
                    <div className=" h-96 relative">
                      <img
                        src={property.images[0].url}
                        alt={property.name}
                        className="w-full h-full overflow-hidden object-cover  group-hover:shadow-2xl group-hover:shadow-slate-300"
                      />
                    </div>
                    <div className="relative hidden group-hover:flex -top-8 left-4  group-hover:scale-110 group-hover:ml-3 group-hover:font-bold duration-500 italic text-2xl group-hover:text-[27px]">
                      {property.name}
                    </div>
                  </div>
                </li>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopByOccassion;