// // @ts-nocheck

// "use client";

// import React, { useCallback, useEffect, useReducer, useState } from "react";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";

// const data = {
//   products: [
//     {
//       name: "Raglan Sleeve T-shirt",
//       text: "Formal1",
//       images: "/assets/images/sarri/formal1.jpg",
//       data: {
//         type: "Formal",
//         image: "/assets/images/sarri/formal1.jpg",
//       },
//     },
//     {
//       name: "Raglan Sleeve T-shirt",
//       text: "Festive1",
//       images: "/assets/images/sarri/festive1.jpg",
//       data: {
//         type: "Festive",
//         image: "/assets/images/sarri/festive1.jpg",
//       },
//     },
//     {
//       name: "Raglan Sleeve T-shirt",
//       text: "Wedding1",
//       images: "/assets/images/sarri/wedding1.jpg",
//       data: {
//         type: "Wedding",
//         image: "/assets/images/sarri/wedding1.jpg",
//       },
//     },
//     {
//       name: "Raglan Sleeve T-shirt",
//       text: "Causal1",
//       images: "/assets/images/sarri/causal1.jpg",
//       data: {
//         type: "Casual",
//         image: "/assets/images/sarri/causal1.jpg",
//       },
//     },
//     {
//       name: "Raglan Sleeve T-shirt",
//       text: "Formal2",
//       images: "/assets/images/sarri/formal2.jpg",
//       data: {
//         type: "Formal",
//         image: "/assets/images/sarri/formal1.jpg",
//       },
//     },
//     {
//       name: "Raglan Sleeve T-shirt",
//       text: "Formal3",
//       images: "/assets/images/sarri/formal1.jpg",
//       data: {
//         type: "Formal",
//         image: "/assets/images/sarri/formal1.jpg",
//       },
//     },
//     {
//       name: "Raglan Sleeve T-shirt",
//       text: "Kurtaset3",
//       images: "/assets/images/sarri/formal2.jpg",
//       data: {
//         type: "Casual",
//         image: "/assets/images/sarri/causal1.jpg",
//       },
//     },
//     {
//       name: "Raglan Sleeve T-shirt",
//       text: "Wedding2",
//       images: "/assets/images/sarri/wedding2.jpg",
//       data: {
//         type: "Wedding",
//         image: "/assets/images/sarri/wedding1.jpg",
//       },
//     },
//     {
//       name: "Raglan Sleeve T-shirt",
//       text: "Wedding3",
//       images: "/assets/images/sarri/wedding3.jpg",
//       data: {
//         type: "Wedding",
//         image: "/assets/images/sarri/wedding1.jpg",
//       },
//     },
//     {
//       name: "Raglan Sleeve T-shirt",
//       text: "Wedding4",
//       images: "/assets/images/sarri/wedding4.jpg",
//       data: {
//         type: "Wedding",
//         image: "/assets/images/sarri/wedding1.jpg",
//       },
//     },
//     {
//       name: "Raglan Sleeve T-shirt",
//       text: "Festive2",
//       images: "/assets/images/sarri/festive2.jpg",
//       data: {
//         type: "Festive",
//         image: "/assets/images/sarri/festive1.jpg",
//       },
//     },
//     {
//       name: "Raglan Sleeve T-shirt",
//       text: "Festive3",
//       images: "/assets/images/sarri/festive3.jpg",
//       data: {
//         type: "Festive",
//         image: "/assets/images/sarri/festive1.jpg",
//       },
//     },
//     {
//       name: "Raglan Sleeve T-shirt",
//       text: "Festive4",
//       images: "/assets/images/sarri/festive4.jpg",
//       data: {
//         type: "Festive",
//         image: "/assets/images/sarri/festive1.jpg",
//       },
//     },
//     {
//       name: "Raglan Sleeve T-shirt",
//       text: "Formal4",
//       images: "/assets/images/sarri/formal2.jpg",
//       data: {
//         type: "Formal",
//         image: "/assets/images/sarri/formal1.jpg",
//       },
//     },
//   ],
// };
// const InitialState = {
//   properties: data.products,
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
//       properties: state.properties,
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
//       return newVal.data.type === action.curcity;
//       // comparing category for displaying data
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

// const Tabsectionpart2 = () => {
//   const [isActive, setIsActive] = useState(false);
//   const [propertyList, dispatchPropertyList] = useReducer(
//     PropertyListReducer,
//     InitialState
//   );

//   const propertyLoadHandler = useCallback((propertyList) => {
//     dispatchPropertyList({
//       type: "LOAD_DATA",
//       properties: propertyList,
//     });
//   }, []);

//   useEffect(() => {
//     propertyLoadHandler(data.products);
//   }, []);

//   const showMoreHandler = () => {
//     dispatchPropertyList({
//       type: "SHOW_MORE",
//       value: 3,
//     });
//   };

//   const filterItem = (curcity) => {
//     setIsActive(true);
//     dispatchPropertyList({
//       type: "FILTER",
//       property: data.products,
//       curcity,
//       propertyPerPage: 6,
//     });
//   };

//   // const cities = [...new Set(data.products.map((Val) => Val.data.type))];

//   const uniqueTypes = data.products.reduce((acc, curr) => {
//     if (!acc.some((item) => item.type === curr.data.type)) {
//       acc.push({ type: curr.data.type, image: curr.data.image });
//     }
//     return acc;
//   }, []);

//   // console.log(propertyList.properties.length);
//   // console.log(propertyList.propertyOnPage.length);

//   // if (
//   // 	(propertyList.properties.length > propertyList.propertyOnPage.length)
//   // ) {
//   // 	setDataAvailable(false);
//   // }

//   return (
//     <div className=" ">
//       <div className="container m-auto py-8 px-10 flex flex-col gap-y-5">
//         {/* <Header /> */}
//         <div className="font-medium text-[#afafaf] text-2xl">
//           Shop By Occassion
//         </div>
//         <div className="font-medium  text-5xl italic mt-2">
//           Styles for special events & everyday moments
//         </div>
//         <div className="flex justify-between items-center">
//           <div className="flex gap-6 my-6 justify-between">
//             {uniqueTypes.map((city, id) => {
//               return (
//                 <div key={id}>
//                   <button
//                     className={`flex flex-col items-center justify-center bg-slate-200 border-none text-black w-36 h-36 rounded-full ${
//                       isActive ? "bg-indigo-600" : ""
//                     }`}
//                     onClick={() => filterItem(city.type)}
//                     key={id}
//                   >
//                     <img
//                       src={city.image}
//                       alt={city.type}
//                       className="w-full h-full object-cover rounded-full "
//                     />
//                   </button>
//                   <span className="block mt-2 text-center">{city.type}</span>
//                 </div>
//               );
//             })}
//           </div>
//           {/* <div>
//             <button
//               className="flex items-center gap-3 px-4"
//               onClick={() => propertyLoadHandler(data.products)}
//             >
//               <span>View All</span>
//             </button>
//           </div> */}
//         </div>

//         <ul className="grid grid-cols-4 gap-6">
//           {propertyList.propertyOnPage.map((property, index) => (
//             <div key={index}>
//               <div>
//                 <li key={property.id}>
//                   {/* cart */}
//                   <div
//                     className="hover:scale-110 z-50 duration-700 group"
//                     key={index}
//                   >
//                     {/* <div
//                   className="rounded-full w-5 h-5 top-1 left-1 relative"
//                   style={{ backgroundColor: "#C2915E" }}
//                 ></div> */}
//                     <div className=" rounded-tl-[100px] rounded-br-2xl  h-72 relative -top-5">
//                       <img
//                         src={property.images}
//                         alt={property.text}
//                         className="w-full h-full overflow-hidden object-cover  rounded-tl-[100px] rounded-br-2xl"
//                       />

//                       {/* <Image src={slide.imgSrc} alt={slide.altText} fill/> */}
//                     </div>
//                     <div className=" group-hover:scale-110 duration-700 text-[20px]">
//                       {property.text}
//                     </div>
//                   </div>

//                   {/* <img src={property.images} /> */}
//                 </li>
//               </div>
//             </div>
//           ))}
//         </ul>
//         {/* <button
//           onClick={showMoreHandler}
//           className="w-fit self-center text-white px-4 bg-indigo-600"
//         >
//           Show More
//         </button> */}
//       </div>
//     </div>
//   );
// };

// export default Tabsectionpart2;

// @ts-nocheck

"use client";

import React, { useCallback, useEffect, useReducer, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
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

const Tabsectionpart2 = () => {
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

  //   const uniqueTypes = data.products.reduce((acc, curr) => {
  //     if (!acc.some((item) => item.type === curr.data.type)) {
  //       acc.push({ type: curr.data.type, image: curr.data.image });
  //     }
  //     return acc;
  //   }, []);

  const uniqueOccasions = products.reduce((acc, curr) => {
    if (!acc.some((item) => item.name === curr.occassion.name)) {
      acc.push({
        name: curr.occassion.name,
        imageUrl: curr.occassion.imageUrl,
      });
    }
    return acc;
  }, []);

  return (
    <div className="font-serif">
      <div className="container m-auto py-8 px-10 flex flex-col gap-y-5">
        <div className="font-medium text-[#afafaf] text-2xl">
          Shop By Occassion
        </div>
        <div className="font-medium text-5xl italic mt-2">
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
                    <img
                      src={city.imageUrl}
                      alt={city.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                  <span className="block mt-2 text-center">{city.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <ul className="grid grid-cols-4 gap-6">
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
  );
};

export default Tabsectionpart2;
