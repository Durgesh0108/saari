// @ts-nocheck

"use client";

import {
  AlignJustify,
  Heart,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import UserProfile from "./User";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DropdownMenu from "@/components/FRONTEND/DropDownMenu";
import { SearchModal } from "@/components/modal/search-modal";
import LinkComponent from "@/components/ui/LinkComponent";
import { useRouter } from "next/navigation";
import { useFrontAuthMiddleware } from "@/app/(frontend)/middleware";
import { cookieHandler } from "@/lib/cookieHandler";
import LoadingLink from "../ui/LoadingLink";
import Image from "next/image";
import Logo from "@/public/img/logo.png";

export default function Navbar({ products, categories, users, cart }) {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();

  useFrontAuthMiddleware();

  const router = useRouter();

  const userId = cookieHandler.get("userId");
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const currentUser = users.find((user) => user.id === userId);
    setUser(currentUser || null);
  }, [users, userId]);

  const openSearchModal = () => setIsOpen(true);
  const closeSearchModal = () => setIsOpen(false);
  const toggleSideBar = () => setSideBarIsOpen((current) => !current);

  return (
    <>
      <SearchModal isOpen={isOpen} onClose={closeSearchModal} />
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
          <div className="loader">Loading...</div>
        </div>
      )}

      {/* <div> */}
      {/* Desktop */}

      <div className="w-full bg-[#b11e44] container  py-4 hidden lg:grid grid-cols-12 items-center">
        <div className="col-span-2 py-2 flex items-center">
          <Link href={"/"} className="flex items-center   w-full">
            <Image
              src={Logo}
              alt="Kaunshanee"
              className="object-contain w-full"
            />
          </Link>
        </div>
        <div className="col-span-8 w-full relative px-8 flex justify-center">
          <div className="flex gap-8 items-center p-2 text-xl">
            {categories.map((category, index) => (
              <div className="group flex flex-col items-center " key={index}>
                <div className="text-white group-hover:text-[#dcb06a] ">
                  <Link href={`/category/${category.id}`}>{category.name}</Link>
                  {/* <div
                    onClick={() => router.push(`/category/${category.id}`)}
                    className="cursor-pointer"
                  >
                    {category.name}
                  </div> */}
                </div>
                <div
                  className={`duration-300 w-0 group-hover:w-full rounded-full border-b-[1px] border-b-[#dcb06a]`}
                ></div>
                <div className="absolute z-50 group-hover:flex flex-col top-[2.4rem] left-0 w-full bg-[#b11e44] text-white py-1 px-4  shadow-xl hidden">
                  {/* text-gray-800 */}
                  <DropdownMenu Fabrics={category.Fabric} />
                </div>
              </div>
            ))}
            <div className="group flex flex-col items-center text-white cursor-pointer">
              <div className="text-white group-hover:text-[#dcb06a]">
                The Silk
              </div>
              <div
                className={`duration-300 w-0 group-hover:w-full rounded-full border-b-[1px] border-b-[#dcb06a]`}
              ></div>
              <div className="absolute z-50 top-[2.4rem] left-0 w-full bg-white pt-8 pb-4 px-4 text-gray-800 shadow-xl hidden group-hover:block">
                <h1>What is Silk?</h1>
                <p>
                  The protein fiber of silk is composed mainly of fibroin and is
                  produced by certain insect larvae to form cocoons. The
                  best-known silk is obtained from the cocoons of the larvae of
                  the mulberry silkworm Bombyx mori reared in captivity
                  (sericulture).
                </p>
              </div>
            </div>
            <div className="group flex flex-col items-center cursor-pointer">
              <div className="text-white hover:text-[#dcb06a]">Sales</div>
              <div
                className={`duration-300 w-0 group-hover:w-full rounded-full border-b-[1px] border-b-[#dcb06a]`}
              ></div>
            </div>
            <div className="group flex flex-col items-center cursor-pointer">
              <div className="text-white hover:text-[#dcb06a]">Contact</div>
              <div
                className={`duration-300 w-0 group-hover:w-full rounded-full border-b-[1px] border-b-[#dcb06a]`}
              ></div>
            </div>
          </div>
        </div>
        <div className="col-span-2 justify-end w-full flex gap-8 items-center">
          <div onClick={openSearchModal}>
            <Search className="text-white" />
          </div>
          <div>
            {/* <Link href={"/order"}> */}
              <UserProfile />
            {/* </Link> */}
          </div>
          {/* <div className="flex justify-center items-center">
            <Link href={"/wishlist"}>
              <div className="relative py-2">
                <div className="-top-[1px] absolute left-3">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-pink-500 p-2 text-sm text-white">
                    0
                  </p>
                </div>
                <Heart className="text-white" />
              </div>
            </Link>
          </div> */}
          <div className="flex justify-center items-center">
            <Link href={"/cart"}>
              <div className="relative py-2">
                <div className="-top-[1px] absolute left-3">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-pink-500 p-2 text-sm text-white">
                    {user?.cartItems.length > 0 ? user?.cartItems.length : 0}
                  </p>
                </div>
                <ShoppingCart className="text-white" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="w-full bg-[#b11e44] container py-4 hidden lg:grid grid-cols-12 items-center min-h-screen">
        <div className="col-span-2 py-2 flex items-center">
          <Link href={"/"} className="flex items-center w-full">

            <Image src={Logo} className="object-contain w-full" />
          </Link>
        </div>
        <div className="col-span-8 w-full relative px-8">
          <div className="flex justify-between items-center p-2 text-xl">
            {categories.map((category, index) => (
              <div className="group flex flex-col items-center" key={index}>
                <div className="text-white group-hover:text-[#dcb06a]">
                  <Link href={`/category/${category.id}`}>{category.name}</Link>
                </div>
                <div
                  className={`duration-300 w-0 group-hover:w-full rounded-full border-b-[1px] border-b-[#dcb06a]`}
                ></div>
                <div className="absolute z-50 group-hover:flex flex-col top-full left-0 w-full bg-white py-1 px-4 text-gray-800 shadow-xl hidden">
                  <DropdownMenu Fabrics={category.Fabric} />
                </div>
              </div>
            ))}
            <div className="group flex flex-col items-center text-white">
              <div className="text-white group-hover:text-[#dcb06a]">
                The Silk
              </div>
              <div
                className={`duration-300 w-0 group-hover:w-full rounded-full border-b-[1px] border-b-[#dcb06a]`}
              ></div>
              <div className="absolute z-50 top-full left-0 w-full bg-white pt-8 pb-4 px-4 text-gray-800 shadow-xl hidden group-hover:block">
                <h1>What is Silk?</h1>
                <p>
                  The protein fiber of silk is composed mainly of fibroin and is
                  produced by certain insect larvae to form cocoons. The
                  best-known silk is obtained from the cocoons of the larvae of
                  the mulberry silkworm Bombyx mori reared in captivity
                  (sericulture).
                </p>
              </div>
            </div>
            <div className="group flex flex-col items-center">
              <div className="text-white hover:text-[#dcb06a]">Sales</div>
              <div
                className={`duration-300 w-0 group-hover:w-full rounded-full border-b-[1px] border-b-[#dcb06a]`}
              ></div>
            </div>
            <div className="group flex flex-col items-center">
              <div className="text-white hover:text-[#dcb06a]">Contact</div>
              <div
                className={`duration-300 w-0 group-hover:w-full rounded-full border-b-[1px] border-b-[#dcb06a]`}
              ></div>
            </div>
          </div>
        </div>
        <div className="col-span-2 justify-center flex gap-8 items-center">
          <div onClick={openSearchModal}>
            <Search className="text-white" />
          </div>
          <div>
            <Link href={"/order"}>
              <UserProfile />
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <Link href={"/wishlist"}>
              <div className="relative py-2">
                <div className="-top-[1px] absolute left-3">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-pink-500 p-2 text-sm text-white">
                    0
                  </p>
                </div>
                <Heart className="text-white" />
              </div>
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <Link href={"/cart"}>
              <div className="relative py-2">
                <div className="-top-[1px] absolute left-3">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-pink-500 p-2 text-sm text-white">
                    {user?.cartItems.length > 0 ? user?.cartItems.length : 0}
                  </p>
                </div>
                <ShoppingCart className="text-white" />
              </div>
            </Link>
          </div>
        </div>
      </div> */}

      {/* Mobile */}
      <div className="block lg:hidden ">
        <nav className="fixed top-0 z-50 bg-white w-full text-black  p-4 border-b">
          <div className={cn("items-center justify-between lg:hidden flex")}>
            <div className="grid grid-cols-12 w-full items-center">
              <div className="col-span-3">
                {!sideBarIsOpen && <AlignJustify onClick={toggleSideBar} />}
                {sideBarIsOpen && <X onClick={toggleSideBar} />}
              </div>
              <div className="col-span-6 flex justify-center">
                <Link href="/" className="flex items-center">
                  <div className="text-xl font-bold uppercase">SAARI WALI</div>
                </Link>
              </div>
              <div className="col-span-3 flex gap-4 items-center justify-end">
                <div onClick={openSearchModal}>
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <Link href={"/order"}>
                    <UserProfile />
                  </Link>
                </div>
                <div className="flex justify-center items-center">
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
            "fixed w-64 mt-14 h-screen duration-700 bg-white  z-10 md:flex overflow-auto",
            sideBarIsOpen ? "w-64" : "w-0"
          )}
        >
          <div className="flex flex-col min-h-screen h-full w-full min-w-fit p-8 text-black">
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
                              className={`duration-300 w-0 group-hover/category:w-full rounded-full border-b-2 border-b-black`}
                            ></div>
                          </Link>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-lg font-medium pb-2">
                        <div>
                          <Accordion type="single" collapsible>
                            {cate.Type.map((type, index) => (
                              <div key={index} className="ml-4">
                                <AccordionItem
                                  value={`item-${index + 1}`}
                                  className="border-0"
                                >
                                  <AccordionTrigger className="text-xl font-medium py-2">
                                    <div className="group/type w-fit">
                                      <Link
                                        href={`/products?categoryId=${cate.id}`}
                                      >
                                        <div>{type.name}</div>
                                        <div
                                          className={`duration-300 w-0 group-hover/type:w-full rounded-full border-b-2 border-b-black`}
                                        ></div>
                                      </Link>
                                    </div>
                                  </AccordionTrigger>
                                  {/* <AccordionContent className="text-lg font-medium pb-2">
                                    <div className="ml-4">
                                      {type.Fabric.map((fabr, index) => (
                                        <div key={index} className="py-2 group">
                                          <Link
                                            href={`/products?categoryId=${cate.id}`}
                                          >
                                            <div>{fabr.name}</div>
                                            <div
                                              className={`duration-300 w-0 group-hover:w-full rounded-full border-b-2 border-b-black`}
                                            ></div>
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                                  </AccordionContent> */}
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
      {/* </div> */}
    </>
  );
}
