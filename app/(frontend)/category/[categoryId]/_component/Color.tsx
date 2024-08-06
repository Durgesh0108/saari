// @ts-nocheck

"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Color, Product } from "@prisma/client";
import { Nunito_Sans } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header1 from "@/components/ui/Header1";
import Header2 from "@/components/ui/Header2";

const nunito = Nunito_Sans({ subsets: ["latin"] });

const InitialState = {
  properties: [],
  propertyPerPage: 4,
  propertyOnPage: [],
};

const PropertyListReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_DATA":
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

    case "SHOW_MORE":
      const indexOfLastPropertyShowMore =
        1 * (state.propertyPerPage + action.value);
      const indexOfFirstPropertyShowMore =
        indexOfLastPropertyShowMore - (state.propertyPerPage + action.value);
      const currentListOfPropertyShowMore = state.properties.slice(
        indexOfFirstPropertyShowMore,
        indexOfLastPropertyShowMore
      );
      return {
        propertyOnPage: currentListOfPropertyShowMore,
        properties: state.properties,
        propertyPerPage: state.propertyPerPage + 3,
      };

    case "FILTER":
      const newItem = action.property.filter((newVal) => {
        return newVal.color.name === action.curcity;
      });
      const indexOfLastPropertyFilter = 1 * action.propertyPerPage;
      const indexOfFirstPropertyFilter =
        indexOfLastPropertyFilter - action.propertyPerPage;
      const currentListOfPropertyFilter = newItem.slice(
        indexOfFirstPropertyFilter,
        indexOfLastPropertyFilter
      );
      return {
        propertyOnPage: currentListOfPropertyFilter,
        properties: newItem,
        propertyPerPage: state.propertyPerPage,
      };

    default:
      return InitialState;
  }
};

const FilterByColor = ({ color, products }) => {
  const [isActive, setIsActive] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length > 0) {
        setActiveColor(products[0].color.name);
        dispatchPropertyList({
          type: "FILTER",
          property: products,
          curcity: products[0].color.name,
          propertyPerPage: 6,
        });
      }
    };
    fetchProducts();
  }, [products]);

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
    setActiveColor(curcity);
    const color = uniqueColor.find((o) => o.name === curcity);
    setSelectedColor(color);
    dispatchPropertyList({
      type: "FILTER",
      property: products,
      curcity,
      propertyPerPage: 6,
    });
  };

  const uniqueColor = products.reduce((acc, curr) => {
    if (!acc.some((item) => item.name === curr.color.name)) {
      acc.push({
        name: curr.color.name,
        hexCode: curr.color.hexCode,
        id: curr.color.id,
      });
    }
    return acc;
  }, []);

  const handleViewMore = () => {
    if (selectedColor) {
      router.push(`/products?colorId=${selectedColor.id}`);
    }
  };

  return (
    <div className="container mx-auto py-8 px-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/12 px-4 mb-8">
          <div className="h-full flex flex-col gap-2">
            {uniqueColor.map((color, index) => (
              <button
                key={index}
                className={`flex justify-center items-center rounded-lg p-2 transition-transform duration-300 ${
                  activeColor === color.name ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => filterItem(color.name)}
                style={{ backgroundColor: `${color.hexCode}` }}
              >
                <div className="w-full h-16"></div>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full md:w-11/12 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              {/* <h2
                className={`text-[#afafaf] text-2xl font-medium ${nunito.className}`}
              ></h2> */}
              <Header1>Choose By Color</Header1>
              {/* <p className="text-5xl italic font-medium mt-2"> */}
              <Header2>
                A rainbow of enchanting hues. Let your heart choose.
              </Header2>
              {/* </p> */}
            </div>
            {selectedColor && (
              <button
                onClick={handleViewMore}
                className="py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
              >
                View More
              </button>
            )}
          </div>
          {propertyList.propertyOnPage.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {propertyList.propertyOnPage.map((property, index) => (
                <Link key={index} href={`/product/${property.id}`} passHref>
                  <div className="overflow-hidden relative rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                    <Image
                      src={property.images[0].url}
                      alt={property.name}
                      layout="responsive"
                      width={1000}
                      height={750}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                      <h3 className="text-xl font-bold">{property.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 flex justify-center items-center h-96">
              <Image
                src="https://res.cloudinary.com/dttieobbt/image/upload/v1717074733/product-not-found_ptexdu.jpg"
                alt="No Products"
                width={1000}
                height={750}
                className="w-auto h-auto object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterByColor;
