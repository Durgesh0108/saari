"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
// import style from "../public/css/style.module.css";
import Image from "next/image";
import r5logo from "@/public/img/r5logo.png";
import { AlignJustify, Home, HomeIcon, LogOut, User } from "lucide-react";
import { ToggleTheme } from "./toggleTheme";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
// import {useAuthMiddleware} from "@/app/middleware";
import toast from "react-hot-toast";
import { useAuthMiddleware } from "@/app/middleware";
import { cookieHandler } from "@/lib/cookieHandler";

const sideBarList = [
  {
    title: "Master",
    paths: [
      {
        name: "Category",
        location: "/admin/master/Category",
      },
      {
        name: "Occassion",
        location: "/admin/master/occasion",
      },
      {
        name: "Type",
        location: "/admin/master/Type",
      },
      {
        name: "Sub Type",
        location: "/admin/master/subType",
      },
      {
        name: "Pattern",
        location: "/admin/master/Pattern",
      },
      {
        name: "Color",
        location: "/admin/master/Color",
      },
    ],
  },
  {
    title: "Website",
    paths: [
      {
        name: "Products",
        location: "/admin/website/product",
      },
      {
        name: "Sliders",
        location: "/admin/website/sliders",
      },
      {
        name: "Best Price",
        location: "/admin/website/best_price",
      },
      {
        name: "Advertisement",
        location: "/admin/website/advertisements",
      },
    ],
  },
  {
    title: "Database",
    paths: [
      {
        name: "Membership Database",
        location: "/admin/database/member",
      },
      {
        name: "Login Customer Database",
        location: "/admin/database/user",
      },
      {
        name: "Product Sale report",
        location: "/admin/database/product_sales_report",
      },
      // {
      //   name: "Product Customer Database",
      //   location: "/admin/database/product_customer",
      // },
      {
        name: "Service Enquiry Database",
        location: "/admin/database/service_sales_report",
      },
      // {
      //   name: "Service Customer Database",
      //   location: "/admin/database/service_customer",
      // },
      {
        name: "Ads Customer Database",
        location: "/admin/database/ads_user",
      },
    ],
  },
  {
    title: "Settings",
    paths: [
      {
        name: "Products",
        location: "/admin/masters/productCategory",
      },
      {
        name: "Services",
        location: "/admin/masters/services",
      },
      {
        name: "Advertisement",
        location: "/admin/masters/advertisement_master",
      },
    ],
  },
  {
    title: "Auth",
    paths: [
      {
        name: "Login",
        location: "/admin/authentication/login",
      },
      {
        name: "Register",
        location: "/admin/authentication/add_new_admin",
      },
    ],
  },
  {
    title: "Front-End",
    paths: [
      {
        name: "STORE",
        location: "/",
      },
    ],
  },
];

export default function Sidebar() {
  const router = useRouter();

  const token = cookieHandler.get("token");
  const user = cookieHandler.get("user");
  const role = cookieHandler.get("role");
  // console.log(user)

  const onLogout = () => {
    cookieHandler.remove("token");
    cookieHandler.remove("user");
    cookieHandler.remove("userId");
    cookieHandler.remove("role");

    toast.success("Logged Out");
    router.push("/admin/authentication/login");
  };

  // useFrontAuthMiddleware();
  // useAuthMiddleware();
  let admin = true;

  // if (role !== "admin") {
  //   admin = false;
  //   cookieHandler.remove("token");
  //   cookieHandler.remove("user");
  //   cookieHandler.remove("userId");
  //   cookieHandler.remove("role");
  // }

  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const toggleSideBar = () => setSideBarIsOpen((current) => !current);
  console.log({ sideBarIsOpen });
  return (
    <>
      {/* <div className="flex flex-col min-h-screen h-full min-w-fit p-8  text-white">
        <div className="flex gap-4 items-end">
          <Link href={"/dashboard"}>
            <Image src={r5logo} width={40} height={40} alt="R5 Design Hub" />
          </Link>
          <h1 className="mb-2">Admin</h1>
          <ToggleTheme />
        </div>
        <h1 className="font-bold text-[0.75rem] my-4 ">R5 Design Hub</h1>
        <div className="flex flex-col gap-2 h-full pb-16">
          <div>
            {sideBarList.map((item) => (
              <Accordion type="single" collapsible key={item.title}>
                <AccordionItem value="item-1">
                  <AccordionTrigger className=" hover:text-yellow-400 ">
                    {item.title}
                  </AccordionTrigger>
                  {item.paths.map((list) => (
                    <Link href={list.location} k/adminey={list.name} className="">
                      <AccordionContent className=" hover:ml-3 hover:text-yellow-400 hover:bold transition-all ml-2">
                        {list.name}
                      </AccordionContent>
                    </Link>
                  ))}
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </div> */}
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
              <AlignJustify onClick={toggleSideBar} />
              <div className="border-2 border-red-500 rounded-full p-1">
                <User />
              </div>
            </div>
          </div>
        </nav>

        {admin && (
          <div
            className={cn(
              "fixed w-64 h-screen bg-gray-800 dark:border-gray-700 md:mt-0 z-10 md:flex overflow-auto",
              sideBarIsOpen ? "flex mt-14" : "hidden"
            )}
          >
            <div className="flex flex-col min-h-screen h-full w-full min-w-fit p-8  text-white">
              <div className="flex gap-4 items-end">
                <Link href={"/admin"}>
                  <Image
                    src={r5logo}
                    width={40}
                    height={40}
                    alt="R5 Design Hub"
                    loading="lazy"
                  />
                </Link>
                <h1 className="mb-2">Admin</h1>
                {/* <ToggleTheme /> */}
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
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
