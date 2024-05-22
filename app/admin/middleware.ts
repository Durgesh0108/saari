// middleware/authMiddleware.ts
"use client";

import { cookieHandler } from "@/lib/cookieHandler";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuthMiddleware = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if token exists in localStorage
    const role = cookieHandler.get("role");

    // If role doesn't exist, redirect to login page
    if (role !== "admin" && !pathname.includes("/register")) {
      router.push("/admin/authentication/login");
    }
  }, [pathname, router]);
};

export default useAuthMiddleware;
