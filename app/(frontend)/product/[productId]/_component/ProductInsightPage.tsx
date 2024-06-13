// @ts-nocheck

"use client";

import { Product } from "@prisma/client";
import {
  Box,
  BriefcaseBusiness,
  Heart,
  MapPin,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { cookieHandler } from "@/lib/cookieHandler";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProductInsightPage({
  product,
  Colorproduct,
  Categoryproduct,
  Occassionproduct,
}) {
  const router = useRouter();
  const userId = cookieHandler.get("userId");
  const params = useParams();

  const handleViewMoreColorProduct = () => {
    router.push(`/color/${product.colorId}`);
  };

  const handleViewMoreCategoryProduct = () => {
    router.push(`/category/${product.categoryId}`);
  };
  const handleViewMoreoccassionProduct = () => {
    router.push(`/occassion/${product.occassionId}`);
  };

  const addToCart = async (id) => {
    try {
      if (!userId) {
        router.push("/Login");
      } else {
        const response = await axios.post(`/api/cart/${userId}`, {
          productId: id,
          quantity: 1,
        });
        toast.success("Added To Cart");
        console.log("Cart:", response.data);
      }
    } catch (error) {
      toast.error("Error Adding To Cart");
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="container flex flex-col gap-4">
      <div className=" grid grid-cols-2 gap-8 bg-white rounded-xl border-[1px] border-pink-100 h-[520px]">
        <div className=" bg-white rounded-xl  p-4">
          <div className="w-full flex flex-col items-center">
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
                                  "w-full h-full object-contain ",
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
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-white rounded-xl  p-4">
          <div>
            <h1 className="text-2xl font-medium text-gray-400">
              {product.name}
            </h1>
            <h1 className="text-3xl font-semibold ">&#8377; {product.price}</h1>
            <h1 className="text-lg font-medium text-gray-400">
              Inclusive of all taxes
            </h1>
            <div className="flex justify-center items-center mt-4 gap-8">
              <button className="flex  gap-4 py-2 px-8   font-bold rounded-full border-2 group">
                <Heart fill="#ff0000" />
                <span className="">Add To Wishlist</span>
              </button>
              <button
                onClick={() => addToCart(product.id)}
                className="flex gap-4 py-2 px-8 bg-pink-500 text-white font-bold rounded-full border-2 border-pink-500"
              >
                <ShoppingCart />
                Add To Cart
              </button>
            </div>
          </div>
          <hr className="border-[1.5px]" />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Home Delivery</h1>
            <div className="flex gap-4">
              <Truck className="text-gray-400" />
              <span>Usually Dispatches within 1 to 2 Days</span>
            </div>
            <div className="flex gap-4">
              <MapPin className="text-gray-400" />
              <span>Enter pincode for delivery date</span>
            </div>
            <div className="flex gap-4">
              <Box className="text-gray-400" />
              <span>Easy 7 day return</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border-[1px] border-pink-100 max-h-[520px] no-scrollbar overflow-auto px-4 py-12 flex flex-col gap-4">
        <div>
          <h1 className="text-4xl font-semibold ">Product Details</h1>
        </div>
        <div className="w-full  h-full grid grid-cols-8 ">
          <div className="col-span-2 ">
            <h1>PRODUCT SPECS</h1>
          </div>
          <div className="col-span-6 ">
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
      <div className="bg-white rounded-xl border-[1px] border-pink-100  px-4 py-12 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">
              Explore More From {product?.color?.name}
            </h1>
            <div>
              <button
                onClick={handleViewMoreColorProduct}
                className=" py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
              >
                View More
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {Colorproduct.slice(0, 4).map((product, index) => (
              <div
                className="hover:scale-105 z-10 duration-700 group rounded-tl-[108px] border-[1px] border-pink-100  rounded-lg p-2 hover:shadow-3xl "
                key={index}
              >
                <Link key={index} href={`/product/${product.id}`}>
                  <div className=" rounded-tl-[100px] rounded-br-2xl h-80 relative ">
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      width={1000}
                      height={1}
                      className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
                    />
                  </div>

                  <div className="group-hover:scale-110 group-hover:ml-3 duration-500 top-2 mb-2 relative text-[20px]">
                    <p className="text-base text-gray-400">{product.name}</p>
                    <p className="text-2xl font-medium ">
                      &#8377; {product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">
              Explore More From {product?.category?.name}
            </h1>
            <div>
              <button
                onClick={handleViewMoreCategoryProduct}
                className=" py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
              >
                View More
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {Categoryproduct.slice(0, 4).map((product, index) => (
              <div
                className="hover:scale-105 z-10 duration-700 group rounded-tl-[108px] border-[1px] border-pink-100  rounded-lg p-2 hover:shadow-3xl "
                key={index}
              >
                <Link key={index} href={`/product/${product.id}`}>
                  <div className=" rounded-tl-[100px] rounded-br-2xl h-80 relative ">
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      width={1000}
                      height={1}
                      className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
                    />
                  </div>

                  <div className="group-hover:scale-110 group-hover:ml-3 duration-500 top-2 mb-2 relative text-[20px]">
                    <p className="text-base text-gray-400">{product.name}</p>
                    <p className="text-2xl font-medium ">
                      &#8377; {product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">
              Explore More From {product?.occassion?.name}
            </h1>
            <div>
              <button
                onClick={handleViewMoreoccassionProduct}
                className=" py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
              >
                View More
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {Occassionproduct.slice(0, 4).map((product, index) => (
              <div
                className="hover:scale-105 z-10 duration-700 group rounded-tl-[108px] border-[1px] border-pink-100  rounded-lg p-2 hover:shadow-3xl "
                key={index}
              >
                <Link key={index} href={`/product/${product.id}`}>
                  <div className=" rounded-tl-[100px] rounded-br-2xl h-80 relative ">
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      width={1000}
                      height={1}
                      className="w-full h-full overflow-hidden object-cover rounded-tl-[100px] rounded-br-2xl"
                    />
                  </div>

                  <div className="group-hover:scale-110 group-hover:ml-3 duration-500 top-2 mb-2 relative text-[20px]">
                    <p className="text-base text-gray-400">{product.name}</p>
                    <p className="text-2xl font-medium ">
                      &#8377; {product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
