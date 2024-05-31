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
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const [product, setProduct] = useState<Product>([]);
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const productRes = await fetch(
        `/api/website/product/${params.productId}`
      );
      const product = await productRes.json();
      setProduct(product);
    };
    fetchProduct();
  }, []);

  console.log(product);
  return (
    <div className="container flex flex-col gap-4">
      <div className=" grid grid-cols-2 gap-8 bg-white rounded-xl border-[1px] h-[520px]">
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
              <button className="flex gap-4 py-2 px-8 bg-pink-500 text-white font-bold rounded-full border-2 border-pink-500">
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
      <div className="bg-white rounded-xl border-[1px] h-[520px] px-4 py-12 flex flex-col gap-4">
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
    </div>
  );
}
