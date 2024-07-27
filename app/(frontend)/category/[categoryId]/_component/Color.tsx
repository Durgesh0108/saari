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

// ***********************************************************************

// // @ts-nocheck

// "use client";

// import Image from "next/image";
// import React, { useCallback, useEffect, useReducer, useState } from "react";
// import Banner1 from "@/public/assets/images/banner/1.png";
// import { Color, Product } from "@prisma/client";

// import { Nunito_Sans } from "next/font/google";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
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

// const FilterByColor = ({ color, products }) => {
//   const [isActive, setIsActive] = useState(false);
//   const [activeColor, setActiveColor] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const router = useRouter();
//   const params = useParams();

//   useEffect(() => {
//     const fetchProducts = async () => {

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
//   }, [products]);

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
//   }, [propertyLoadHandler,products]);

//   const showMoreHandler = () => {
//     dispatchPropertyList({
//       type: "SHOW_MORE",
//       value: 3,
//     });
//   };

//   const filterItem = (curcity) => {
//     setIsActive(true);
//     setActiveColor(curcity);
//     const color = uniqueColor.find((o) => o.name === curcity);
//     setSelectedColor(color);
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

//   const handleViewMore = () => {
//     if (selectedColor) {
//       // router.push(`/color/${selectedColor.id}`);
//       router.push(`/products?colorId=${selectedColor.id}`);
//     }
//   };

//   const firstProperty = propertyList.propertyOnPage[0];

//   return (
//     <div className="container py-8 px-8 ">
//       <div className="grid grid-cols-12 gap-2">
//         <div className="col-span-1">
//           <div className=" overflow-hidden h-full flex flex-col">

//             {color.map((color, index) => (
//               <div
//                 key={index}
//                 className={`flex h-full ${isActive ? "-ml-9 " : "-ml-9"}`}
//               >
//                 <button
//                   className={`flex flex-col items-center h-full justify-center border-none text-black
//                     hover:ml-2 ${
//                       activeColor === color.name
//                         ? "ml-4 border-2 border-blue-500 "
//                         : ""
//                     } `}
//                   onClick={() => filterItem(color.name)}
//                   key={index}
//                 >
//                   <div
//                     className="rounded-2xl  w-20 h-full  left-1 relative"
//                     style={{ backgroundColor: `${color.hexCode}` }}
//                   ></div>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="col-span-11 w-full ">
//           <div className=" flex ">
//             <div className=" w-2/3">
//               <div
//                 className={`font-medium text-[#afafaf] text-2xl ${nunito.className}`}
//               >
//                 Choose By Color
//               </div>
//               <div className="font-medium text-5xl italic mt-2 ">
//                 A rainbow of enchanting hues. Let your heart choose.
//               </div>
//             </div>

//             <div className="flex justify-end w-1/3  items-center">
//               {selectedColor && (
//                 <button
//                   onClick={handleViewMore}
//                   className=" py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
//                 >
//                   View More {selectedColor.name} Color Dress
//                 </button>
//               )}
//             </div>
//           </div>

//           {propertyList.propertyOnPage.length > 0 ? (
//             <div className=" mt-8  grid grid-cols-4 overflow-hidden w-full m-auto  h-96 ">
//               {propertyList.propertyOnPage
//                 .slice(0, 4)
//                 .map((property, index) => (
//                   <div
//                     className="hover:scale-110 hover:z-50 z-10 duration-700 group overflow-hidden h-96"
//                     key={index}
//                   >
//                     <Link key={index} href={`/product/${property.id}`}>
//                       <div className=" h-96 relative">
//                         <Image
//                           src={property.images[0].url}
//                           alt={property.name}
//                           width={1000}
//                           height={1}
//                           className="w-full h-full overflow-hidden object-cover  group-hover:shadow-2xl group-hover:shadow-slate-300"
//                         />
//                       </div>
//                       {/* <div className="relative hidden group-hover:flex -top-16 left-4  group-hover:scale-110 group-hover:ml-3 group-hover:font-bold duration-500 italic text-2xl group-hover:text-[27px]">
//                         {property.name}
//                       </div> */}
//                     </Link>
//                   </div>
//                 ))}
//             </div>
//           ) : (
//             <div className=" mt-8  overflow-hidden w-full m-auto  h-96">
//               {propertyList.propertyOnPage.length === 0 && (
//                 <div className="flex flex-col justify-center items-center text-center w-full h-full ">
//                   <p className=" flex items-center">
//                     <Image
//                       src={
//                         "https://res.cloudinary.com/dttieobbt/image/upload/v1717074733/product-not-found_ptexdu.jpg"
//                       }
//                       alt="no Product"
//                       height={1}
//                       width={1000}
//                       className="w-fit h-full object-contain "
//                     />
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}

//         </div>
//       </div>
//       <div className="hidden">
//         <div className="px-4">
//           <div
//             className={`font-medium text-[#afafaf] text-2xl ${nunito.className}`}
//           >
//             Choose By Color
//           </div>
//           <div className="font-medium text-5xl italic mt-2 w-2/3">
//             A rainbow of enchanting hues. Let your heart choose.
//           </div>
//         </div>
//         <div className="mt-8  grid grid-cols-12">
//           <div className="col-span-1  py-4 px-8 grid grid-cols-8  overflow-hidden">

//             <div className=" ">
//               {uniqueColor.map((color, index) => (
//                 <div
//                   key={index}
//                   className={`flex ${isActive ? "-ml-16" : "-ml-16"}`}
//                 >
//                   <button
//                     className={`flex flex-col items-center justify-center border-none text-black
//                     hover:ml-2 ${
//                       activeColor === color.name
//                         ? "border-2 border-blue-500 ml-2"
//                         : ""
//                     }`}
//                     onClick={() => filterItem(color.name)}
//                     key={index}
//                   >
//                     <div
//                       className="rounded-2xl border-[1px] border-black w-20 h-16 top-1 left-1 relative"
//                       style={{ backgroundColor: `${color.hexCode}` }}
//                     ></div>
//                     {/* <span>{color.name}</span> */}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="col-span-11  grid grid-cols-4  px-8 overflow-auto ">
//             {propertyList.propertyOnPage.map((property, index) => (
//               <div
//                 className="hover:scale-110 z-50 duration-700 group "
//                 key={index}
//               >
//                 {/* <div
//                 className="rounded-full w-5 h-5 top-1 left-1 relative "
//                 style={{ backgroundColor: `${property.color.hexCode}` }}
//               ></div> */}
//                 <div className=" h-80 relative -top-5  ">
//                   <Image
//                     src={property.images[0].url}
//                     alt={property.name}
//                     height={1}
//                     width={1000}
//                     className="w-full h-full overflow-hidden object-cover   "
//                   />
//                 </div>
//                 <div className="group-hover:scale-110 group-hover:ml-2 group-hover:font-bold duration-700 text-[20px]">
//                   {property.name}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterByColor;

// *****************************************************************

// @ts-nocheck

"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Color, Product } from "@prisma/client";
import { Nunito_Sans } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

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
              <h2
                className={`text-[#afafaf] text-2xl font-medium ${nunito.className}`}
              >
                Choose By Color
              </h2>
              <p className="text-5xl italic font-medium mt-2">
                A rainbow of enchanting hues. Let your heart choose.
              </p>
            </div>
            {selectedColor && (
              <button
                onClick={handleViewMore}
                className="py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
              >
                View More {selectedColor.name} Color Dress
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
