// middleware/authMiddleware.ts
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { cookieHandler } from "@/lib/cookieHandler";

export const useAuthMiddleware = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if token exists in localStorage
    // const token = localStorage.getItem("token");
    // const role = localStorage.getItem("role");
    const token = cookieHandler.get("token");
    const role = cookieHandler.get("role");


    // If token doesn't exist, redirect to login page

    if (role !== "admin" && !pathname.includes("/register")) {
      router.push("/admin/authentication/login");
    }
  }, [pathname, router]);
};
