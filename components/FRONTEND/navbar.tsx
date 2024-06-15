// @ts-nocheck

"use client";

import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserProfile from "./User";
import { useFrontAuthMiddleware } from "@/app/(frontend)/middleware";
import { cookieHandler } from "@/lib/cookieHandler";

export default function Navbar({ products, categories }) {
  useFrontAuthMiddleware();
  console.log("navbar", { products });
  const [CategoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const categoryMap = new Map();
    products.forEach((product) => {
      const category = product.category;
      if (!categoryMap.has(category.name)) {
        categoryMap.set(category.name, category);
      }
    });

    const uniqueProducts = Array.from(categoryMap.values());
    setCategoryProducts(uniqueProducts);
  }, []);

  const userId = cookieHandler.get("userId");
  console.log("user Id", userId);

  return (
    <>
      <div className="w-full bg-white container px-8 py-4  grid grid-cols-12 items-center  ">
        <div className="col-span-2">
          <Link href="/" className="flex items-center ">
            <div className="text-2xl font-bold uppercase">SAARI WALI</div>
          </Link>
        </div>
        <div className="col-span-8 w-full  relative pr-8">
          <div className="flex justify-between py-2 text-xl">
            {/* dynamic */}
            {categories.map((category) => (
              <div className="group  flex flex-col items-center">
                <div>
                  <Link href={`/category/${category.id}`}>{category.name}</Link>
                </div>
                <div
                  className={`duration-300 w-0  group-hover:w-full rounded-full border-b-2 border-b-black `}
                ></div>
                <div className="absolute  z-50 group-hover:flex flex-col top-10  left-0 w-full bg-white py-1 px-4 text-gray-800 shadow-xl hidden ">
                  <div className="mt-6 grid grid-cols-4">
                    {category.Type.map((type, index) => (
                      <div key={index}>
                        <div>
                          <Link href={`/type/${type.id}`}>
                            <div>{type.name}</div>
                            <hr className="w-1/4 mt-2 border-[1px] border-[#000000]" />
                          </Link>
                        </div>

                        <div className="mt-4 flex flex-col gap-4">
                          {type.SubType.map((subtype, index) => (
                            <div key={index} className="textbase">
                              <Link href={`/subType/${subtype.id}`}>
                                {subtype.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {category.Type.length === 0 && <div>No Type Available</div>}
                  </div>
                </div>
              </div>
            ))}

            <div className="group  flex flex-col items-center">
              <div>The Silk</div>
              <div
                className={`duration-300 w-0  group-hover:w-full rounded-full border-b-2 border-b-black `}
              ></div>
              <div className="absolute z-50 top-10  left-0 w-full bg-white pt-8 pb-4 px-4 text-gray-800 shadow-xl hidden group-hover:block">
                <h1>What is Silk?</h1>
                <p>
                  The protein fiber of silk is composed mainly of fibroin and is
                  produced by certain insect larvae to form cocoons. The
                  best-known silk is obtained from the cocoons of the larvae of
                  the mulberry silkworm Bombyx mori reared in captivity
                  (sericulture).{" "}
                </p>
              </div>
            </div>
            <div>Sales</div>
            <div>Contact</div>
          </div>
        </div>
        <div className="col-span-2 justify-center flex gap-8 items-center">
          <div>
            <Search />
          </div>
          <div>
            <UserProfile />
          </div>
          <div className=" flex justify-center items-center">
            <Link href={"/wishlist"}>
              <div className="relative py-2">
                <div className="-top-[1px] absolute left-3">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-pink-500 p-2 text-sm text-white">
                    0
                  </p>
                </div>
                <Heart />
              </div>
            </Link>
          </div>

          <div className=" flex justify-center items-center">
            <Link href={"/cart"}>
              <div className="relative py-2">
                <div className="-top-[1px] absolute left-3">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-pink-500 p-2 text-sm text-white">
                    0
                  </p>
                </div>
                <ShoppingCart />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
