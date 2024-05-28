// // @ts-nocheck

// "use client";

// import Image from "next/image";
// import React, { useCallback, useEffect, useReducer, useState } from "react";
// import Banner1 from "@/public/assets/images/banner/1.png";
// import { Product } from "@prisma/client";

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
//       return newVal.color.name === action.curcity;
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

// const FilterByColor = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productRes = await fetch(`/api/website/product`);
//       const products = await productRes.json();
//       setProducts(products);
//       // Create a map to store unique categories
//       //   const colorMap = new Map();
//       //   products.forEach((product) => {
//       //     const color = product.color;
//       //     if (!colorMap.has(color.name)) {
//       //       colorMap.set(color.name, product);
//       //     }
//       //   });

//       //   // Convert map values to an array
//       //   const uniqueProducts = Array.from(colorMap.values());
//       //   setProducts(uniqueProducts);
//     };
//     fetchProducts();
//   }, []);

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
//     dispatchPropertyList({
//       type: "FILTER",
//       property: products,
//       curcity,
//       propertyPerPage: 6,
//     });
//   };

//   const uniqueColor = products.reduce((acc, curr) => {
//     if (!acc.some((item) => item.name === curr.color.name)) {
//       acc.push({
//         name: curr.color.name,
//         hexCode: curr.color.hexCode,
//         id: curr.color.id,
//       });
//     }
//     return acc;
//   }, []);

//   return (
//     <div className="py-16 border-2 border-black">
//       <div className="px-4">
//         <div className="font-medium text-[#afafaf] text-2xl">
//           CHOOSE BY COLOR
//         </div>
//         <div className="font-medium text-5xl italic mt-2 w-1/2">
//           A rainbow of enchanting hues. Let your heart choose.
//         </div>
//       </div>
//       <div className="mt-8 border-2 border-black grid grid-cols-2">
//         <div className="border-2 border-black py-4 px-8 grid grid-cols-8">
//           <div className="col-span-6 border-2 border-black bg-red-500 ">
//             Durgesh
//           </div>
//           <div className="col-span-2 border-2 border-black">
//             {uniqueColor.map((color, index) => (
//               <div
//                 key={index}
//                 className={`flex   ${isActive ? " -ml-6" : "-ml-10"}`}
//               >
//                 <button
//                   className={`flex flex-col items-center justify-center  border-none text-black hover:ml-4
//                     ${isActive ? "border-2 border-blue-500 ml-4" : ""}
//                   `}
//                   onClick={() => filterItem(color.name)}
//                   key={index}
//                 >
//                   <div
//                     className="rounded-2xl border-2 border-black w-20 h-10 top-1 left-1 relative"
//                     style={{ backgroundColor: `${color.hexCode}` }}
//                   ></div>
//                   {/* <span>{color.name}</span> */}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="border-2 border-black grid grid-cols-2 gap-6 p-8">
//           {propertyList.propertyOnPage.map((property, index) => (
//             <div
//               className="hover:scale-110 z-50 duration-700 group "
//               key={index}
//             >
//               <div className="rounded-tl-[100px] rounded-br-2xl h-72 relative ">
//                 <Image
//                   src={property.images[0].url}
//                   alt={property.name}
//                   height={1}
//                   width={1000}
//                   className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
//                 />
//               </div>
//               <div className="group-hover:scale-110 duration-700 text-[20px]">
//                 {property.name}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterByColor;

// ***************************************
// // @ts-nocheck

// "use client";

// import Image from "next/image";
// import React, { useCallback, useEffect, useReducer, useState } from "react";
// import Banner1 from "@/public/assets/images/banner/1.png";
// import { Product } from "@prisma/client";

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
//       return newVal.color.name === action.curcity;
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

// const FilterByColor = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isActive, setIsActive] = useState(false);
//   const [activeColor, setActiveColor] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productRes = await fetch(`/api/website/product`);
//       const products = await productRes.json();
//       setProducts(products);
//       if (products.length > 0) {
//         setActiveColor(products[0].color.name);
//         dispatchPropertyList({
//           type: "FILTER",
//           property: products,
//           curcity: products[0].color.name,
//           propertyPerPage: 6,
//         });
//       }
//     };
//     fetchProducts();
//   }, []);

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
//     setActiveColor(curcity);
//     dispatchPropertyList({
//       type: "FILTER",
//       property: products,
//       curcity,
//       propertyPerPage: 6,
//     });
//   };

//   const uniqueColor = products.reduce((acc, curr) => {
//     if (!acc.some((item) => item.name === curr.color.name)) {
//       acc.push({
//         name: curr.color.name,
//         hexCode: curr.color.hexCode,
//         id: curr.color.id,
//       });
//     }
//     return acc;
//   }, []);

//   return (
//     <div className="py-16 border-2 border-black">
//       <div className="px-4">
//         <div className="font-medium text-[#afafaf] text-2xl">
//           CHOOSE BY COLOR
//         </div>
//         <div className="font-medium text-5xl italic mt-2 w-1/2">
//           A rainbow of enchanting hues. Let your heart choose.
//         </div>
//       </div>
//       <div className="mt-8 border-2 border-black grid grid-cols-2">
//         <div className="border-2 border-black py-4 px-8 grid grid-cols-8">
//           <div className="col-span-6 border-2 border-black bg-red-500 ">
//             Durgesh
//           </div>
//           <div className="col-span-2 border-2 border-black">
//             {uniqueColor.map((color, index) => (
//               <div
//                 key={index}
//                 className={`flex   ${isActive ? " -ml-6" : "-ml-10"}`}
//               >
//                 <button
//                   className={`flex flex-col items-center justify-center border-none text-black
//                     hover:ml-4 ${
//                       activeColor === color.name ? "border-2 border-blue-500 ml-4" : ""
//                     }`}
//                   onClick={() => filterItem(color.name)}
//                   key={index}
//                 >
//                   <div
//                     className="rounded-2xl border-2 border-black w-20 h-10 top-1 left-1 relative"
//                     style={{ backgroundColor: `${color.hexCode}` }}
//                   ></div>
//                   {/* <span>{color.name}</span> */}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="border-2 border-black grid grid-cols-2 gap-6 p-8">
//           {propertyList.propertyOnPage.map((property, index) => (
//             <div
//               className="hover:scale-110 z-50 duration-700 group "
//               key={index}
//             >
//               <div className="rounded-tl-[100px] rounded-br-2xl h-72 relative ">
//                 <Image
//                   src={property.images[0].url}
//                   alt={property.name}
//                   height={1}
//                   width={1000}
//                   className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
//                 />
//               </div>
//               <div className="group-hover:scale-110 duration-700 text-[20px]">
//                 {property.name}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterByColor;

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

const FilterByColor = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [activeColor, setActiveColor] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productRes = await fetch(`/api/website/product`);
      const products = await productRes.json();
      setProducts(products);
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
    setActiveColor(curcity);
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

  const firstProperty = propertyList.propertyOnPage[0];

  return (
    <div className="container py-16 border-2 border-black">
      <div className="px-4">
        <div className="font-medium text-[#afafaf] text-2xl">
          CHOOSE BY COLOR
        </div>
        <div className="font-medium text-5xl italic mt-2 w-1/2">
          A rainbow of enchanting hues. Let your heart choose.
        </div>
      </div>
      <div className="mt-8 border-2 border-black grid grid-cols-2">
        <div className="border-2 border-black py-4 px-8 grid grid-cols-8 min-h-[610px] max-h-[610px] overflow-hidden">
          <div className="col-span-6 border-2 border-black h-full  z-50 flex items-center justify-center">
            {firstProperty ? (
              <>
                <div className="z-50 duration-700 group h-full w-full">
                  <div className="rounded-tl-[100px] rounded-br-2xl h-full relative ">
                    <Image
                      src={firstProperty.images[0].url}
                      alt={firstProperty.name}
                      height={1}
                      width={1000}
                      className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
                    />
                  </div>
                  {/* <div className=" duration-700 text-[20px]">
                    {firstProperty.name}
                  </div> */}
                </div>
              </>
            ) : (
              "Loading..."
            )}
          </div>
          <div className="col-span-2 border-2 border-black">
            {uniqueColor.map((color, index) => (
              <div
                key={index}
                className={`flex ${isActive ? "-ml-16" : "-ml-16"}`}
              >
                <button
                  className={`flex flex-col items-center justify-center border-none text-black 
                    hover:ml-2 ${
                      activeColor === color.name
                        ? "border-2 border-blue-500 ml-2"
                        : ""
                    }`}
                  onClick={() => filterItem(color.name)}
                  key={index}
                >
                  <div
                    className="rounded-2xl border-[1px] border-black w-20 h-16 top-1 left-1 relative"
                    style={{ backgroundColor: `${color.hexCode}` }}
                  ></div>
                  {/* <span>{color.name}</span> */}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="border-2 border-black grid grid-cols-2 gap-6 p-8 max-h-[610px] overflow-auto ">
          {propertyList.propertyOnPage.map((property, index) => (
            <div
              className="hover:scale-110 z-50 duration-700 group "
              key={index}
            >
              <div
                className="rounded-full w-5 h-5 top-1 left-1 relative border-2 border-black"
                style={{ backgroundColor: `${property.color.hexCode}` }}
              ></div>
              <div className="rounded-tl-[100px] rounded-br-2xl h-72 relative -top-5  ">
                <Image
                  src={property.images[0].url}
                  alt={property.name}
                  height={1}
                  width={1000}
                  className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl border-[2px] border-black "
                />
              </div>
              <div className="group-hover:scale-110 duration-700 text-[20px]">
                {property.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterByColor;
