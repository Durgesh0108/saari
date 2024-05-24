// @ts-nocheck

"use client";

import React, { useCallback, useEffect, useReducer, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const data = {
  products: [
    {
      name: "Raglan Sleeve T-shirt",
      text: "Formal1",
      images: "/assets/images/sarri/formal1.jpg",
      data: {
        type: "Formal",
        image: "/assets/images/sarri/formal1.jpg",
      },
    },
    {
      name: "Raglan Sleeve T-shirt",
      text: "Festive1",
      images: "/assets/images/sarri/festive1.jpg",
      data: {
        type: "Festive",
        image: "/assets/images/sarri/festive1.jpg",
      },
    },
    {
      name: "Raglan Sleeve T-shirt",
      text: "Wedding1",
      images: "/assets/images/sarri/wedding1.jpg",
      data: {
        type: "Wedding",
        image: "/assets/images/sarri/wedding1.jpg",
      },
    },
    {
      name: "Raglan Sleeve T-shirt",
      text: "Casual1",
      images: "/assets/images/sarri/casual1.jpg",
      data: {
        type: "Casual",
        image: "/assets/images/sarri/casual1.jpg",
      },
    },
    {
      name: "Raglan Sleeve T-shirt",
      text: "Formal2",
      images: "/assets/images/sarri/formal2.jpg",
      data: {
        type: "Formal",
        image: "/assets/images/sarri/formal1.jpg",
      },
    },
    {
      name: "Raglan Sleeve T-shirt",
      text: "Formal3",
      images: "./assets/images/product/fashion/18-1.png",
      data: {
        type: "Formal",
        image: "/assets/images/sarri/formal1.jpg",
      },
    },
    {
      name: "Raglan Sleeve T-shirt",
      text: "Kurtaset3",
      images: "./assets/images/product/fashion/18-1.png",
      data: {
        type: "Casual",
        image: "/assets/images/sarri/casual1.jpg",
      },
    },
    {
      name: "Raglan Sleeve T-shirt",
      text: "Kurta2",
      images: "./assets/images/product/fashion/18-1.png",
      data: {
        type: "Wedding",
        image: "/assets/images/sarri/wedding1.jpg",
      },
    },
    {
      name: "Raglan Sleeve T-shirt",
      text: "saari3",
      images: "/assets/images/product/fashion/18-1.png",
      data: {
        type: "Festive",
        image: "/assets/images/sarri/festive1.jpg",
      },
    },
    {
      name: "Raglan Sleeve T-shirt",
      text: "Kurtaset4",
      images: "./assets/images/product/fashion/18-1.png",
      data: {
        type: "Formal",
        image: "/assets/images/sarri/formal1.jpg",
      },
    },
  ],
};
const InitialState = {
  properties: data.products,
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
      properties: state.properties,
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
      return newVal.data.type === action.curcity;
      // comparing category for displaying data
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

const Tabsectionpart2 = () => {
  const [isActive, setIsActive] = useState(false);
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
    propertyLoadHandler(data.products);
  }, []);

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
      property: data.products,
      curcity,
      propertyPerPage: 6,
    });
  };

  // const cities = [...new Set(data.products.map((Val) => Val.data.type))];

  const uniqueTypes = data.products.reduce((acc, curr) => {
    if (!acc.some((item) => item.type === curr.data.type)) {
      acc.push({ type: curr.data.type, image: curr.data.image });
    }
    return acc;
  }, []);

  // console.log(propertyList.properties.length);
  // console.log(propertyList.propertyOnPage.length);

  // if (
  // 	(propertyList.properties.length > propertyList.propertyOnPage.length)
  // ) {
  // 	setDataAvailable(false);
  // }

  return (
    <div className="bg-slate-300 ">
      <div className="container m-auto py-8 px-10 flex flex-col gap-y-5">
        {/* <Header /> */}
        <div className="flex justify-between items-center">
          <div className="flex gap-6 my-6 justify-between">
            {uniqueTypes.map((city, id) => {
              return (
                <div key={id}>
                  <button
                    className={`flex flex-col items-center justify-center bg-slate-200 border-none text-black w-36 h-36 rounded-full ${
                      isActive ? "bg-indigo-600" : ""
                    }`}
                    onClick={() => filterItem(city.type)}
                    key={id}
                  >
                    <img
                      src={city.image}
                      alt={city.type}
                      className="w-full h-full object-cover rounded-full border-2 border-black"
                    />
                  </button>
                  <span className="block mt-2 text-center">{city.type}</span>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="flex items-center gap-3 px-4"
              onClick={() => propertyLoadHandler(data.products)}
            >
              <span>View All</span>
              {/* <BsArrowRight /> */}
            </button>
          </div>
        </div>

        <ul className="grid grid-cols-4 gap-6">
          {propertyList.propertyOnPage.map((property, index) => (
            <div key={index}>
              <div>
                <li key={property.id}>
                  {/* {property.text} */}
                  <img src={property.images} />
                </li>
              </div>
            </div>
          ))}
        </ul>
        <button
          onClick={showMoreHandler}
          className="w-fit self-center text-white px-4 bg-indigo-600"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Tabsectionpart2;
