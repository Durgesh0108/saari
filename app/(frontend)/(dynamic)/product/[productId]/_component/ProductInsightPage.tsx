// // @ts-nocheck

// "use client";

// import { Product } from "@prisma/client";
// import {
//   Box,
//   BriefcaseBusiness,
//   Heart,
//   MapPin,
//   ShoppingCart,
//   Truck,
// } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { Tab } from "@headlessui/react";
// import Image from "next/image";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { cookieHandler } from "@/lib/cookieHandler";
// import toast from "react-hot-toast";
// import axios from "axios";

// export default function ProductInsightPage({
//   product,
//   Colorproduct,
//   Categoryproduct,
//   Occassionproduct,
// }) {
//   const router = useRouter();
//   const userId = cookieHandler.get("userId");
//   const params = useParams();

//   const handleViewMoreColorProduct = () => {
//     router.push(`/color/${product.colorId}`);
//   };

//   const handleViewMoreCategoryProduct = () => {
//     router.push(`/category/${product.categoryId}`);
//   };
//   const handleViewMoreoccassionProduct = () => {
//     router.push(`/occassion/${product.occassionId}`);
//   };

//   const addToCart = async (id) => {
//     try {
//       if (!userId) {
//         router.push("/Login");
//       } else {
//         const response = await axios.post(`/api/cart/${userId}`, {
//           productId: id,
//           quantity: 1,
//         });
//         toast.success("Added To Cart");
//       }
//     } catch (error) {
//       toast.error("Error Adding To Cart");
//       console.error("Error adding to cart:", error);
//     }
//   };

//   return (
//     <div className="container flex flex-col gap-4">
//       <div className=" grid grid-cols-2 gap-8 bg-white rounded-xl border-[1px] border-pink-100 h-[520px]">
//         <div className=" bg-white rounded-xl  p-4">
//           <div className="w-full flex flex-col items-center">
//             <Tab.Group>
//               <div className="w-full ">
//                 <div className="w-full  items-center ">
//                   <Tab.Panels className={"row-span-3 w-full h-96 "}>
//                     <div className="justify-center h-full w-full">
//                       {product?.images?.map((image, index) => (
//                         <Tab.Panel key={index} className="h-full w-full">
//                           <div className="flex justify-center h-[375px] w-full ">
//                             <Image
//                               src={image?.url}
//                               width={1000}
//                               height={1}
//                               alt={product.name}
//                               className="object-contain h-full w-full "
//                               loading="lazy"
//                             />
//                           </div>
//                         </Tab.Panel>
//                       ))}
//                     </div>
//                   </Tab.Panels>

//                   <Tab.List className={"row-span-1 w-full"}>
//                     <div className="flex h-full overflow-x-auto gap-4 items-center">
//                       {product?.images?.map((image, index) => (
//                         <Tab key={index}>
//                           {({ selected }) => (
//                             <div
//                               style={{
//                                 width: 100,
//                                 height: 100,
//                               }}
//                             >
//                               <Image
//                                 src={image?.url}
//                                 height={100}
//                                 width={100}
//                                 alt={"image"}
//                                 loading="lazy"
//                                 className={cn(
//                                   "w-full h-full object-cover ",
//                                   selected
//                                     ? "border-blue-500 border-2 text-white"
//                                     : "text-black"
//                                 )}
//                               />
//                             </div>
//                           )}
//                         </Tab>
//                       ))}
//                     </div>
//                   </Tab.List>
//                 </div>
//               </div>
//             </Tab.Group>
//           </div>
//         </div>
//         <div className="flex flex-col gap-4 bg-white rounded-xl  p-4">
//           <div>
//             <h1 className="text-2xl font-medium text-gray-400">
//               {product.name}
//             </h1>
//             <h1 className="text-3xl font-semibold ">&#8377; {product.price}</h1>
//             <h1 className="text-lg font-medium text-gray-400">
//               Inclusive of all taxes
//             </h1>
//             <div className="flex justify-center items-center mt-4 gap-8">
//               <button className="flex  gap-4 py-2 px-8   font-bold rounded-full border-2 group">
//                 <Heart fill="#ff0000" />
//                 <span className="">Add To Wishlist</span>
//               </button>
//               <button
//                 onClick={() => addToCart(product.id)}
//                 className="flex gap-4 py-2 px-8 bg-pink-500 text-white font-bold rounded-full border-2 border-pink-500"
//               >
//                 <ShoppingCart />
//                 Add To Cart
//               </button>
//             </div>
//           </div>
//           <hr className="border-[1.5px]" />
//           <div className="flex flex-col gap-2">
//             <h1 className="text-2xl font-semibold">Home Delivery</h1>
//             <div className="flex gap-4">
//               <Truck className="text-gray-400" />
//               <span>Usually Dispatches within 1 to 2 Days</span>
//             </div>
//             <div className="flex gap-4">
//               <MapPin className="text-gray-400" />
//               <span>Enter pincode for delivery date</span>
//             </div>
//             <div className="flex gap-4">
//               <Box className="text-gray-400" />
//               <span>Easy 7 day return</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-white rounded-xl border-[1px] border-pink-100 max-h-[520px] no-scrollbar overflow-auto px-4 py-12 flex flex-col gap-4">
//         <div>
//           <h1 className="text-4xl font-semibold ">Product Details</h1>
//         </div>
//         <div className="w-full  h-full grid grid-cols-8 ">
//           <div className="col-span-2 ">
//             <h1>PRODUCT SPECS</h1>
//           </div>
//           <div className="col-span-6 ">
//             <div className="grid grid-cols-2">
//               {product?.description?.map((desc, index) => (
//                 <div className="w-full grid grid-cols-2  " key={index}>
//                   <p className=" p-4 text-xl font-medium">{desc.key}:</p>
//                   <p className=" p-4 bg-[#fdf6ee] text-xl font-medium">
//                     {desc.value}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-white rounded-xl border-[1px] border-pink-100  px-4 py-12 flex flex-col gap-8">
//         <div className="flex flex-col gap-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-semibold">
//               Explore More From {product?.color?.name}
//             </h1>
//             <div>
//               <button
//                 onClick={handleViewMoreColorProduct}
//                 className=" py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
//               >
//                 View More
//               </button>
//             </div>
//           </div>
//           <div className="grid grid-cols-4 gap-4">
//             {Colorproduct.slice(0, 4).map((product, index) => (
//               <div
//                 className="hover:scale-105 z-10 duration-700 group rounded-tl-[108px] border-[1px] border-pink-100  rounded-lg p-2 hover:shadow-3xl "
//                 key={index}
//               >
//                 <Link key={index} href={`/product/${product.id}`}>
//                   <div className=" rounded-tl-[100px] rounded-br-2xl h-80 relative ">
//                     <Image
//                       src={product.images[0].url}
//                       alt={product.name}
//                       width={1000}
//                       height={1}
//                       className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
//                     />
//                   </div>

//                   <div className="group-hover:scale-110 group-hover:ml-3 duration-500 top-2 mb-2 relative text-[20px]">
//                     <p className="text-base text-gray-400">{product.name}</p>
//                     <p className="text-2xl font-medium ">
//                       &#8377; {product.price}
//                     </p>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="flex flex-col gap-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-semibold">
//               Explore More From {product?.category?.name}
//             </h1>
//             <div>
//               <button
//                 onClick={handleViewMoreCategoryProduct}
//                 className=" py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
//               >
//                 View More
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-4 gap-4">
//             {Categoryproduct.slice(0, 4).map((product, index) => (
//               <div
//                 className="hover:scale-105 z-10 duration-700 group rounded-tl-[108px] border-[1px] border-pink-100  rounded-lg p-2 hover:shadow-3xl "
//                 key={index}
//               >
//                 <Link key={index} href={`/product/${product.id}`}>
//                   <div className=" rounded-tl-[100px] rounded-br-2xl h-80 relative ">
//                     <Image
//                       src={product.images[0].url}
//                       alt={product.name}
//                       width={1000}
//                       height={1}
//                       className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
//                     />
//                   </div>

//                   <div className="group-hover:scale-110 group-hover:ml-3 duration-500 top-2 mb-2 relative text-[20px]">
//                     <p className="text-base text-gray-400">{product.name}</p>
//                     <p className="text-2xl font-medium ">
//                       &#8377; {product.price}
//                     </p>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="flex flex-col gap-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-semibold">
//               Explore More From {product?.occassion?.name}
//             </h1>
//             <div>
//               <button
//                 onClick={handleViewMoreoccassionProduct}
//                 className=" py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
//               >
//                 View More
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-4 gap-4">
//             {Occassionproduct.slice(0, 4).map((product, index) => (
//               <div
//                 className="hover:scale-105 z-10 duration-700 group rounded-tl-[108px] border-[1px] border-pink-100  rounded-lg p-2 hover:shadow-3xl "
//                 key={index}
//               >
//                 <Link key={index} href={`/product/${product.id}`}>
//                   <div className=" rounded-tl-[100px] rounded-br-2xl h-80 relative ">
//                     <Image
//                       src={product.images[0].url}
//                       alt={product.name}
//                       width={1000}
//                       height={1}
//                       className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
//                     />
//                   </div>

//                   <div className="group-hover:scale-110 group-hover:ml-3 duration-500 top-2 mb-2 relative text-[20px]">
//                     <p className="text-base text-gray-400">{product.name}</p>
//                     <p className="text-2xl font-medium ">
//                       &#8377; {product.price}
//                     </p>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// @ts-nocheck

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { Heart, ShoppingCart, Truck, MapPin, Box } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { cookieHandler } from "@/lib/cookieHandler";
import toast from "react-hot-toast";
import axios from "axios";
import { cn } from "@/lib/utils";

export default function ProductInsightPage({
  product,
  Colorproduct,
  Categoryproduct,
  Occassionproduct,
}) {
  const router = useRouter();
  const userId = cookieHandler.get("userId");
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const handleViewMoreColorProduct = () => {
  //   router.push(`/color/${product.colorId}`);
  // };

  // const handleViewMoreCategoryProduct = () => {
  //   router.push(`/category/${product.categoryId}`);
  // };

  // const handleViewMoreOccassionProduct = () => {
  //   router.push(`/occassion/${product.occassionId}`);
  // };

  const addToCart = async (id) => {
    try {
      if (!userId) {
        router.push("/Login");
      } else {
        const response = await axios.post(`/api/cart/${userId}`, {
          productId: id,
          quantity: 1,
        });
        console.log(response);
        toast.success("Added To Cart");
      }
    } catch (error) {
      toast.error("Error Adding To Cart");
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Product Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl border-[1px] border-pink-100 mb-8">
        {/* <div className="w-full flex flex-col items-center p-4">
          <Tab.Group>
            <div className="w-full ">
              <div className="w-full  items-center ">
                <Tab.Panels className={"row-span-3 w-full h-96 "}>
                  <div className="justify-center h-full w-full">
                    {product?.images?.map((image, index) => (
                      <Tab.Panel key={index} className="h-full w-full">
                        <div className="flex justify-center h-[375px] w-full ">
                          <Image
                            src={image?.url}
                            width={1000}
                            height={1}
                            alt={product.name}
                            className="object-contain h-full w-full "
                            loading="lazy"
                          />
                        </div>
                      </Tab.Panel>
                    ))}
                  </div>
                </Tab.Panels>
                <Tab.List className={"row-span-1 w-full"}>
                  <div className="flex h-full overflow-x-auto gap-4 items-center">
                    {product?.images?.map((image, index) => (
                      <Tab key={index}>
                        {({ selected }) => (
                          <div
                            style={{
                              width: 100,
                              height: 100,
                            }}
                          >
                            <Image
                              src={image?.url}
                              height={100}
                              width={100}
                              alt={"image"}
                              loading="lazy"
                              className={cn(
                                "w-full h-full object-cover ",
                                selected
                                  ? "border-blue-500 border-2 text-white"
                                  : "text-black"
                              )}
                            />
                          </div>
                        )}
                      </Tab>
                    ))}
                  </div>
                </Tab.List>
              </div>
            </div>
          </Tab.Group>
        </div> */}
        <div className="p-4">
          <Tab.Group>
            <div className="flex flex-col md:flex-row">
              {/* Thumbnail List */}
              <Tab.List className="flex md:flex-col gap-4 md:gap-0 overflow-x-auto md:overflow-y-auto md:h-full md:w-1/4">
                {product?.images?.map((image, index) => (
                  <Tab
                    key={index}
                    className={`
                      w-20 h-20 md:w-full md:h-32 rounded-md overflow-hidden 
                      ${
                        index === currentImageIndex
                          ? "border-2 border-blue-500"
                          : ""
                      }
                      cursor-pointer transition duration-300 transform hover:scale-105
                    `}
                  >
                    <Image
                      src={image.url}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="object-cover"
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  </Tab>
                ))}
              </Tab.List>

              {/* Main Image */}
              <Tab.Panels className="flex-1 h-full relative">
                {product?.images?.map((image, index) => (
                  <Tab.Panel key={index} className="h-full w-full">
                    <div className="h-full w-full relative">
                      <Image
                        src={image.url}
                        width={1000}
                        height={1000}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-8 p-4">
          <div>
            <h1 className="text-2xl font-medium text-gray-400 mb-2">
              {product.name}
            </h1>
            <h1 className="text-3xl font-semibold">&#8377; {product.price}</h1>
            <p className="text-lg font-medium text-gray-400">
              Inclusive of all taxes
            </p>
          </div>

          <div className="">
            <h1 className="text-2xl font-semibold mb-4">Home Delivery</h1>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Truck className="w-6 h-6 text-gray-400" />
                <span>Usually Dispatches within 1 to 2 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-gray-400" />
                <span>Enter pincode for delivery date</span>
              </div>
              <div className="flex items-center gap-2">
                <Box className="w-6 h-6 text-gray-400" />
                <span>Easy 7 day return</span>
              </div>
            </div>
          </div>


          <div className="flex gap-4 mt-4">
            <button className="flex items-center gap-2 py-2 px-4 bg-white border-2 border-gray-300 rounded-lg">
              <Heart className="w-6 h-6 text-red-500" />
              <span>Add To Wishlist</span>
            </button>
            <button
              onClick={() => addToCart(product.id)}
              className="flex items-center gap-2 py-2 px-4 bg-pink-500 text-white font-bold rounded-lg"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Add To Cart</span>
            </button>
          </div>
        </div>
        {/* Product Details */}
        {/* <div className="flex flex-col gap-8 p-4">
          <div>
            <div>
              <h1 className="text-2xl font-medium text-black mb-2">
                Description
              </h1>
              <p>
                Handloom pista green pure kanjeevaram silk saree has golden
                butti upper side and butti with checks on the lower side with
                rama green-red border. Intricate rama green pallu and running
                plain rama green blouse piece with border.
              </p>
              <p>
                This beautiful kanjeevaram saree can be a pride possession for
                you. Kanjeevaram has a special traditional and cultural
                significance.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xl">
                <span className="text-xl font-medium text-black ">
                  Saree Color:
                </span>
                <span>Pista Green</span>
              </div>
              <div className="text-xl">
                <span className="text-xl font-medium text-black ">Fabric:</span>
                <span>Pure Silk</span>
              </div>
              <div className="text-xl">
                <span className="text-xl font-medium text-black ">
                  Wash Care:
                </span>
                <span>Dry clean only</span>
              </div>
              <div className="text-xl">
                <span className="text-xl font-medium text-black ">
                  Occasion:
                </span>
                <span>Traditional Wear/ Special Wear</span>
              </div>
              <div className="text-xl">
                <span className="text-xl font-medium text-black ">Note:</span>
                <span>
                  Product color may slightly vary due to photographic lighting
                  sources or your monitor settings
                </span>
              </div>
            </div>

            <div>
              <h1>Saree measurements</h1>
              <div className="flex flex-col gap-4">
                <div className="text-xl">
                  <span className="text-xl font-medium text-black ">
                    Length:
                  </span>
                  <span>5.24 meter</span>
                </div>
                <div className="text-xl">
                  <span className="text-xl font-medium text-black ">
                    Height:
                  </span>
                  <span>47 inches</span>
                </div>
                <div className="text-xl">
                  <span className="text-xl font-medium text-black ">
                    Blouse piece:
                  </span>
                  <span>85 centimeters</span>
                </div>
              </div>
            </div>

            <div>
              <h1>Instructions</h1>
              <p>
                We strive to capture photographs that are as authentic as
                possible, no filters or other special effects are used. However,
                colours may differ depending on the screen resolution used to
                access the product.
              </p>
            </div>
            <div>
              <h1>Shipping & Returns</h1>
              <ul>
                <li>
                  Kindly note that within India we share the bill and tracking
                  information 24hrs after the goods are shipped, and after about
                  72 hrs if its shipped Internationally.
                </li>
                <li>
                  Within India, you would receive the shipment within a week
                  after dispatched, 10 to 15 days outside India.
                </li>
                <li>
                  Please do not accept the courier if the package is torn or not
                  in good condition.
                </li>
                <li>
                  You may relax knowing that your product has passed all the
                  quality check procedures. Please be aware that we do not
                  accept returns and exchanges.
                </li>
              </ul>
            </div>
            <div>
              <h1>Care Instructions</h1>
              <p>We would suggest dry clean only.</p>
            </div>
          </div>
        </div> */}

        
      </div>

      {/* Product Details Grid */}
      <div className="bg-white rounded-xl border-[1px] border-pink-100 mb-8 max-h-[520px] no-scrollbar overflow-auto px-4 py-12 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Product Description</h1>
        </div>
        <div className="w-full  h-full grid grid-cols-8 ">
          <div className="col-span-8 ">
            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                Handloom pista green pure kanjeevaram silk saree has golden
                butti upper side and butti with checks on the lower side with
                rama green-red border. Intricate rama green pallu and running
                plain rama green blouse piece with border.
              </p>
              <p className="text-gray-600">
                This beautiful kanjeevaram saree can be a pride possession for
                you. Kanjeevaram has a special traditional and cultural
                significance.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full  h-full grid grid-cols-8 ">
          <div className="col-span-8 ">
            <div className="flex flex-col gap-2">
              <div className="text-xl">
                <span className="font-medium text-gray-800">Saree Color: </span>
                <span>Pista Green</span>
              </div>
              <div className="text-xl">
                <span className="font-medium text-gray-800">Fabric: </span>
                <span>Pure Silk</span>
              </div>
              <div className="text-xl">
                <span className="font-medium text-gray-800">Wash Care: </span>
                <span>Dry clean only</span>
              </div>
              <div className="text-xl">
                <span className="font-medium text-gray-800">Occasion: </span>
                <span>Traditional Wear/ Special Wear</span>
              </div>
              <div className="text-xl">
                <span className="font-medium text-gray-800">Note: </span>
                <span>
                  Product color may slightly vary due to photographic lighting
                  sources or your monitor settings.
                </span>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Saree measurements
              </h2>
              <div className="grid gap-2">
                <div className="text-xl">
                  <span className="font-medium text-gray-800">Length: </span>
                  <span>5.24 meter</span>
                </div>
                <div className="text-xl">
                  <span className="font-medium text-gray-800">Height: </span>
                  <span>47 inches</span>
                </div>
                <div className="text-xl">
                  <span className="font-medium text-gray-800">
                    Blouse piece:{" "}
                  </span>
                  <span>85 centimeters</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Instructions
              </h2>
              <p className="text-gray-600">
                We strive to capture photographs that are as authentic as
                possible, no filters or other special effects are used. However,
                colours may differ depending on the screen resolution used to
                access the product.
              </p>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Shipping & Returns
              </h2>
              <ul className="list-disc list-inside text-gray-600">
                <li>
                  Kindly note that within India we share the bill and tracking
                  information 24hrs after the goods are shipped, and after about
                  72 hrs if its shipped Internationally.
                </li>
                <li>
                  Within India, you would receive the shipment within a week
                  after dispatched, 10 to 15 days outside India.
                </li>
                <li>
                  Please do not accept the courier if the package is torn or not
                  in good condition.
                </li>
                <li>
                  You may relax knowing that your product has passed all the
                  quality check procedures. Please be aware that we do not
                  accept returns and exchanges.
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Care Instructions
              </h2>
              <p className="text-gray-600">We would suggest dry clean only.</p>
            </div>
          </div>
        </div>

        <div className="w-full  h-full grid grid-cols-8 ">
          <div className="col-span-8 ">
            <div className="grid grid-cols-2">
              {product?.description?.map((desc, index) => (
                <div className="w-full grid grid-cols-2  " key={index}>
                  <p className=" p-4 text-xl font-medium">{desc.key}:</p>
                  <p className=" p-4 bg-[#fdf6ee] text-xl font-medium">
                    {desc.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Explore More Sections */}
      <div className="bg-white rounded-xl border-[1px] border-pink-100 mb-8 p-4">
        {/* Explore More Colors */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">
            Explore More From {product?.color?.name}
          </h1>
          <Link
            href={`/products?colorId=${product.colorId}`}
            className="py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
          >
            View More
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Colorproduct.slice(0, 4).map((product, index) => (
            <Link key={index} href={`/product/${product.id}`}>
              <div className="group">
                <div className="group-hover:scale-105 duration-700 rounded-lg overflow-hidden relative h-80">
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full rounded-tl-[100px] rounded-br-2xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-base text-gray-400">{product.name}</p>
                  <p className="text-2xl font-medium">
                    &#8377; {product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border-[1px] border-pink-100 mb-8 p-4">
        {/* Explore More Categories */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">
            Explore More From {product?.category?.name}
          </h1>
          <Link
            href={`/products?categoryId=${product.categoryId}`}
            className="py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
          >
            View More
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Categoryproduct.slice(0, 4).map((product, index) => (
            <Link key={index} href={`/product/${product.id}`}>
              <div className="group">
                <div className="group-hover:scale-105 duration-700 rounded-lg overflow-hidden relative h-80">
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full rounded-tl-[100px] rounded-br-2xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-base text-gray-400">{product.name}</p>
                  <p className="text-2xl font-medium">
                    &#8377; {product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border-[1px] border-pink-100 mb-8 p-4">
        {/* Explore More Occasions */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">
            Explore More From {product?.occassion?.name}
          </h1>
          <Link
            href={`/products?occassionId=${product.occassionId}`}
            className="py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
          >
            View More
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Occassionproduct.slice(0, 4).map((product, index) => (
            <Link key={index} href={`/product/${product.id}`}>
              <div className="group">
                <div className="group-hover:scale-105 duration-700 rounded-lg overflow-hidden relative h-80">
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full rounded-tl-[100px] rounded-br-2xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-base text-gray-400">{product.name}</p>
                  <p className="text-2xl font-medium">
                    &#8377; {product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
