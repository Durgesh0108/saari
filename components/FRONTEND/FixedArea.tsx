// @ts-nocheck

"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import Banner1 from "@/public/assets/images/banner/1.png";
import { Product } from "@prisma/client";

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
      return newVal.color.name === action.curcity;
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

const Fixedimage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productRes = await fetch(`/api/website/product`);
      const products = await productRes.json();
      setProducts(products);
      // Create a map to store unique categories
      //   const colorMap = new Map();
      //   products.forEach((product) => {
      //     const color = product.color;
      //     if (!colorMap.has(color.name)) {
      //       colorMap.set(color.name, product);
      //     }
      //   });

      //   // Convert map values to an array
      //   const uniqueProducts = Array.from(colorMap.values());
      //   setProducts(uniqueProducts);
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
    // setIsActive(true);
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

  return (
    <div className="py-20 border-2 border-black">
      <h1 className="font-bold text-2xl">Filter by Color</h1>
      <div className="mt-8 border-2 border-black grid grid-cols-2">
        <div className="border-2 border-black py-4 px-8 grid grid-cols-8">
          <div className="col-span-6 border-2 border-black">Durgesh</div>
          <div className="col-span-2 border-2 border-black">
            {uniqueColor.map((color, index) => (
              <div key={index} className="flex gap-2">
                <button
                  className={`flex flex-col items-center justify-center  border-none text-black 
                    
                  `}
                  onClick={() => filterItem(color.name)}
                  key={index}
                >
                  <div
                    className="rounded-2xl border-2 border-black w-20 h-10 top-1 left-1 relative"
                    style={{ backgroundColor: `${color.hexCode}` }}
                  ></div>
                  <span>{color.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="border-2 border-black">
          <ul className="grid grid-cols-2 gap-6">
            {propertyList.propertyOnPage.map((property, index) => (
              <div key={index}>
                <div>
                  <li key={property.id}>
                    <div
                      className="hover:scale-110 z-50 duration-700 group"
                      key={index}
                    >
                      <div className="rounded-tl-[100px] rounded-br-2xl h-72 relative -top-5">
                        <img
                          src={property.images[0].url}
                          alt={property.name}
                          className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
                        />
                      </div>
                      <div className="group-hover:scale-110 duration-700 text-[20px]">
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
    </div>
  );
};

export default Fixedimage;
