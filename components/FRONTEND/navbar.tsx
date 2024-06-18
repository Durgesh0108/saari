// @ts-nocheck

"use client";

import {
  AlignJustify,
  Cross,
  Heart,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserProfile from "./User";
import { useFrontAuthMiddleware } from "@/app/(frontend)/middleware";
import { cookieHandler } from "@/lib/cookieHandler";
import { cn } from "@/lib/utils";

export default function Navbar({ products, categories }) {
  useFrontAuthMiddleware();
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

  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const toggleSideBar = () => setSideBarIsOpen((current) => !current);
  // console.log("user Id", userId);

  return (
    <>
      <div className="hidden w-full bg-white container px-8 py-4  md:grid grid-cols-12 items-center  ">
        <div className="col-span-2">
          <Link href="/" className="flex items-center ">
            <div className="text-2xl font-bold uppercase">SAARI WALI</div>
          </Link>
        </div>
        <div className="col-span-8 w-full  relative pr-8">
          <div className="flex justify-between py-2 text-xl">
            {/* dynamic */}
            {categories.map((category, index) => (
              <div className="group  flex flex-col items-center" key={index}>
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
                          {/* <Link href={`/type/${type.id}?typeId=${type.id}`}> */}
                          <Link href={`/products?typeId=${type.id}`}>
                            <div>{type.name}</div>
                            <hr className="w-1/4 mt-2 border-[1px] border-[#000000]" />
                          </Link>
                        </div>

                        <div className="mt-4 flex flex-col gap-4">
                          {type.SubType.map((subtype, index) => (
                            <div key={index} className="textbase">
                              {/* <Link href={`/subType/${subtype.id}`}> */}
                              <Link href={`/products?subTypeId=${subtype.id}`}>
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
            <Link href={"/order"}>
              <UserProfile />
            </Link>
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
      <div>
        {/* <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"> */}
        <nav className="fixed top-0 z-50 w-full text-white bg-gray-800 border-gray-700 md:hidden p-4 border-b">
          <div
            className={cn(
              " items-center justify-between md:hidden flex"
              // sideBarIsOpen ? "flex" : "hidden"
            )}
          >
            <div className="flex justify-between w-full items-center">
              <div>
                {!sideBarIsOpen && <AlignJustify onClick={toggleSideBar} />}
                {sideBarIsOpen && <X onClick={toggleSideBar} />}
              </div>

              <div className="">
                <Link href="/" className="flex items-center ">
                  <div className="text-xl font-bold uppercase">SAARI WALI</div>
                </Link>
              </div>
              <div className=" justify-center flex gap-4 items-center">
                <div>
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <Link href={"/order"}>
                    <UserProfile />
                  </Link>
                </div>
                {/* <div className=" flex justify-center items-center">
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
                </div> */}

                <div className=" flex justify-center items-center">
                  <Link href={"/cart"}>
                    <div className="relative py-2">
                      <div className="-top-[1px] absolute left-3">
                        <p className="flex h-2 w-2 items-center justify-center rounded-full bg-pink-500 p-2 text-sm text-white">
                          0
                        </p>
                      </div>
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div
          className={cn(
            "fixed w-64 h-screen duration-700  bg-gray-800 dark:border-gray-700 md:mt-0 z-10 md:flex overflow-auto",
            sideBarIsOpen ? "w-64 mt-14" : "w-0"
          )}
        >
          <div className="flex flex-col min-h-screen h-full w-full min-w-fit p-8  text-white">
            {/* <div className="flex gap-4 items-end">
              <Link href={"/"}>
                <Image
                  src={r5logo}
                  width={40}
                  height={40}
                  alt="R5 Design Hub"
                  loading="lazy"
                />
              </Link>
              <h1 className="mb-2">Admin</h1>
            </div>
            <h1 className="font-bold text-[0.75rem] my-4 ">Durgesh</h1>
            <div className="flex flex-col gap-2 h-full pb-16">
              <div className="flex flex-col justify-between gap-4">
                <div className="">
                  {sideBarList.map((item) => (
                    <Accordion type="single" collapsible key={item.title}>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className=" hover:text-yellow-400 ">
                          {item.title}
                        </AccordionTrigger>
                        {item.paths.map((list) => (
                          <Link
                            href={`${list.location}`}
                            key={list.name}
                            className=""
                            onClick={toggleSideBar}
                          >
                            <AccordionContent className=" hover:ml-3 hover:text-yellow-400 hover:bold transition-all ml-2">
                              {list.name}
                            </AccordionContent>
                          </Link>
                        ))}
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
                <Button className="flex gap-4" onClick={onLogout}>
                  <span>Logout</span>
                  <LogOut />
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
