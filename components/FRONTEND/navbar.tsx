"use client";

import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { cookieHandler } from "@/lib/cookieHandler";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LocationSearchInput } from "./LocationSearchInput";
import UserProfile from "./User";
import { useFrontAuthMiddleware } from "@/app/(store)/middleware";

export default function Navbar() {
  useFrontAuthMiddleware();
  const pathname = usePathname();
  const user = cookieHandler.get("user");

  const handleFormSubmitSuccess = () => {
    console.log("submitted");
  };

  return (
    <div className="bg-[#f0f0f0] w-full">
      <div className="container py-3 grid grid-cols-2 md:grid-cols-3 items-center">
        <div className="flex justify-between items-center ">
          <div>
            <Link href={"/"}>
              <Image
                src="/img/Probiz5.png"
                width={1000}
                height={90}
                alt="r5"
                loading="lazy"
                className="w-24 h-10 md:w-28"
              />
            </Link>
          </div>
          <div className="md:flex flex-col lg:px-16 md:px-8 gap-2 hidden">
            <span className="lg:text-sm md:text-xs ">+91 9857458963</span>
            <Link href={`/member-register`} passHref>
              <Button className="bg-[#00aecd] w-full" variant="default">
                Join
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex gap-4 ">
          <Suspense>
            <LocationSearchInput onSubmitSuccess={handleFormSubmitSuccess} />
          </Suspense>
        </div>
        <div className="flex items-center justify-end gap-2 md:gap-4">
          {user && <p className="text-xs md:text-lg font-semibold">{user}</p>}
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
