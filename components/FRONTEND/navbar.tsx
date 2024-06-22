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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DropdownMenu from "./DropDownMenu";

export default function Navbar({ products, categories, user, cart }) {
  useFrontAuthMiddleware();

  console.log("navbar", { categories });

  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const toggleSideBar = () => setSideBarIsOpen((current) => !current);
  // console.log("user Id", userId);

  return (
    <>
      {/* Desktop */}
      <div className="hidden w-full bg-white container px-8 py-4  md:grid grid-cols-12 items-center  ">
        <div className="col-span-2">
          <Link href="/" className="flex items-center ">
            <div className="text-2xl font-bold uppercase">SAARI WALI</div>
          </Link>
        </div>
        <div className="col-span-8 w-full  relative pr-8">
          <div className="flex justify-between p-2 text-xl">
            {/* dynamic */}
            {categories.map((category, index) => (
              <div className="group  flex flex-col items-center" key={index}>
                <div>
                  <Link href={`/category/${category.id}`}>{category.name}</Link>
                </div>
                <div
                  className={`duration-300 w-0  group-hover:w-full rounded-full border-b-2 border-b-black `}
                ></div>

                {/* Old Layout */}
                {/* <div className="absolute z-50 group-hover:flex flex-col top-10  left-0 w-full bg-white py-1 px-4 text-gray-800 shadow-xl hidden ">
                  <div className="mt-6 grid grid-cols-4">
                    {category.Type.map((type, index) => (
                      <div key={index}>
                        <div>
                          <Link href={`/products?typeId=${type.id}`}>
                            <div>{type.name}</div>
                            <hr className="w-1/4 mt-2 border-[1px] border-[#000000]" />
                          </Link>
                        </div>

                        <div className="mt-4 flex flex-col gap-4">
                          {type.SubType.map((subtype, index) => (
                            <div key={index} className="textbase">
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
                </div> */}

                {/* New Layout */}
                {/* <div className="absolute z-50 group-hover:flex flex-col top-10  left-0 w-full bg-white py-1 px-4 text-gray-800 shadow-xl hidden ">
                  <div className="grid grid-cols-6 group/silk">
                    <div className="col-span-1">Silk</div>
                    <div className="col-span-5 border-2 border-red-500 group-hover/silk:block hidden">
                      <div className="grid grid-cols-4">
                        {category.Type.map((type, index) => (
                          <div key={index}>
                            <div>
                              <Link href={`/products?typeId=${type.id}`}>
                                <div>{type.name}</div>
                                <hr className="w-1/4 mt-2 border-[1px] border-[#000000]" />
                              </Link>
                            </div>

                            <div className="mt-4 flex flex-col gap-4">
                              {type.SubType.map((subtype, index) => (
                                <div key={index} className="textbase">
                                  <Link
                                    href={`/products?subTypeId=${subtype.id}`}
                                  >
                                    {subtype.name}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        {category.Type.length === 0 && (
                          <div>No Type Available</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 group/cotton-silk">
                    <div className="col-span-1">Cotton Silk</div>
                    <div className="col-span-5 border-2 border-red-500 group-hover/cotton-silk:block hidden">
                      <div className="grid grid-cols-4">
                        {category.Type.map((type, index) => (
                          <div key={index}>
                            <div>
                              <Link href={`/products?typeId=${type.id}`}>
                                <div>{type.name}</div>
                                <hr className="w-1/4 mt-2 border-[1px] border-[#000000]" />
                              </Link>
                            </div>

                            <div className="mt-4 flex flex-col gap-4">
                              {type.SubType.map((subtype, index) => (
                                <div key={index} className="textbase">
                                  <Link
                                    href={`/products?subTypeId=${subtype.id}`}
                                  >
                                    {subtype.name}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        {category.Type.length === 0 && (
                          <div>No Type Available</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 group/tussar-silk">
                    <div className="col-span-1">Tussar Silk</div>
                    <div className="col-span-5 border-2 border-red-500 group-hover/tussar-silk:block hidden">
                      <div className="grid grid-cols-4">
                        {category.Type.map((type, index) => (
                          <div key={index}>
                            <div>
                              <Link href={`/products?typeId=${type.id}`}>
                                <div>{type.name}</div>
                                <hr className="w-1/4 mt-2 border-[1px] border-[#000000]" />
                              </Link>
                            </div>

                            <div className="mt-4 flex flex-col gap-4">
                              {type.SubType.map((subtype, index) => (
                                <div key={index} className="textbase">
                                  <Link
                                    href={`/products?subTypeId=${subtype.id}`}
                                  >
                                    {subtype.name}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        {category.Type.length === 0 && (
                          <div>No Type Available</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 group/tissue-silk">
                    <div className="col-span-1">Tissue Silk</div>
                    <div className="col-span-5 border-2 border-red-500 group-hover/tissue-silk:block hidden">
                      <div className="grid grid-cols-4">
                        {category.Type.map((type, index) => (
                          <div key={index}>
                            <div>
                              <Link href={`/products?typeId=${type.id}`}>
                                <div>{type.name}</div>
                                <hr className="w-1/4 mt-2 border-[1px] border-[#000000]" />
                              </Link>
                            </div>

                            <div className="mt-4 flex flex-col gap-4">
                              {type.SubType.map((subtype, index) => (
                                <div key={index} className="textbase">
                                  <Link
                                    href={`/products?subTypeId=${subtype.id}`}
                                  >
                                    {subtype.name}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        {category.Type.length === 0 && (
                          <div>No Type Available</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="absolute z-50 group-hover:flex flex-col top-[2.4rem]  left-0 w-full bg-white py-1 px-4 text-gray-800 shadow-xl hidden ">
                  <DropdownMenu categories={category.Fabric} />
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
                    {cart ? cart.length : 0}
                  </p>
                </div>
                <ShoppingCart />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div>
        {/* <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"> */}
        <nav className="fixed top-0 z-50 bg-white w-full text-black  md:hidden p-4 border-b">
          <div
            className={cn(
              " items-center justify-between md:hidden flex"
              // sideBarIsOpen ? "flex" : "hidden"
            )}
          >
            <div className="grid grid-cols-12 w-full items-center">
              <div className="col-span-3">
                {!sideBarIsOpen && <AlignJustify onClick={toggleSideBar} />}
                {sideBarIsOpen && <X onClick={toggleSideBar} />}
              </div>

              <div className="col-span-6 flex justify-center">
                <Link href="/" className="flex items-center ">
                  <div className="text-xl font-bold uppercase">SAARI WALI</div>
                </Link>
              </div>
              <div className="col-span-3 flex gap-4 items-center justify-end">
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
            "fixed w-64 mt-14 h-screen duration-700 bg-white  md:mt-0 z-10 md:flex overflow-auto",
            sideBarIsOpen ? "w-64 " : "w-0"
          )}
        >
          <div className="flex flex-col min-h-screen h-full w-full min-w-fit p-8  text-black ">
            <div>
              <Accordion type="single" collapsible>
                {categories.map((cate, index) => (
                  <div key={index}>
                    <AccordionItem value={`item-${index + 1}`} className="">
                      <AccordionTrigger className="text-xl font-medium py-2">
                        <div className="group/category w-fit ml-2">
                          <Link href={`/products?categoryId=${cate.id}`}>
                            <div>{cate.name}</div>
                            <div
                              className={`duration-300 w-0  group-hover/category:w-full rounded-full border-b-2 border-b-black `}
                            ></div>
                          </Link>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-lg font-medium pb-2">
                        <div>
                          <Accordion type="single" collapsible>
                            {cate.Type.map((type, index) => (
                              <div key={index} className=" ml-4">
                                <AccordionItem
                                  value={`item-${index + 1}`}
                                  className="border-0"
                                >
                                  <AccordionTrigger className="text-xl font-medium py-2">
                                    <div className="group/type w-fit">
                                      <Link
                                        href={`/products?typeId=${type.id}`}
                                      >
                                        <div className="">{type.name}</div>
                                        <div
                                          className={`duration-300 w-0  group-hover/type:w-full rounded-full border-b-2 border-b-black `}
                                        ></div>
                                      </Link>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="text-lg font-medium ">
                                    <div>
                                      {type.SubType.map((subtype, index) => (
                                        <div
                                          key={index}
                                          className=" ml-6 group/subtype w-fit"
                                        >
                                          <Link
                                            href={`/products?subTypeId=${subtype.id}`}
                                          >
                                            <div>{subtype.name}</div>
                                            <div
                                              className={`duration-300 w-0  group-hover/subtype:w-full rounded-full border-b-2 border-b-black `}
                                            ></div>
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </div>
                            ))}
                          </Accordion>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
