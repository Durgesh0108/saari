"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleUserRound, LogOut } from "lucide-react";
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
    console.log("logged out");
    cookieHandler.remove("token");
    cookieHandler.remove("user");
    cookieHandler.remove("userId");
    cookieHandler.remove("role");
    toast.success("Logged Out");
    router.push("/login");
  };

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger>
          <CircleUserRound />
        </PopoverTrigger>
        <PopoverContent>
          {token ? (
            <>
              <div className="flex flex-col m-auto">
                <Button className="flex gap-4" onClick={onLogout}>
                  <span>Logout</span>
                  <LogOut />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4 w-fit">
                <Link href={`/login`}>Login</Link>
                <Link href={`/register`}>Register</Link>
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
