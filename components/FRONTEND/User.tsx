"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Boxes,
  CircleUserRound,
  Folders,
  LogOut,
  Package,
  User,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cookieHandler } from "@/lib/cookieHandler";

export default function UserProfile() {
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
    router.push("/Login");
  };

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger>
          {/* <div className="border-[1px] border-[#a6a8a8] rounded-full p-[3px]"> */}
          <User className="w-4 h-4 lg:w-6 lg:h-6 lg:text-white" />
          {/* </div> */}
          {/* <User color="#a6a8a8" className="w-4 h-4"/> */}
        </PopoverTrigger>
        <PopoverContent className="border-none">
          {token ? (
            <>
              <div className="flex flex-col gap-4 m-auto">
                <Link href={"/order"} className="w-full">
                  <Button className="flex gap-4 w-full">
                    {/* <Folders /> */}
                    {/* <Boxes /> */}
                    <Package />
                    <span>Orders</span>
                  </Button>
                </Link>
                <Button className="flex gap-4" onClick={onLogout}>
                  <span>Logout</span>
                  <LogOut />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4 w-fit">
                <Link href={`/Login`}>Login</Link>
                <Link href={`/Register`}>Register</Link>
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
