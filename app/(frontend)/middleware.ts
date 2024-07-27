// // @ts-nocheck

// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { cookieHandler } from "@/lib/cookieHandler";
// import jwt from "jsonwebtoken";
// import GetUser from "@/actions/users/getUser";
// // import { GetUser } from "@/actions/users/getAllUser";

// export const useFrontAuthMiddleware = async () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   useEffect(() => {
//     const token = cookieHandler.get("token");
//     const decoded = jwt.decode(token);
//     if (!decoded && !pathname.includes("Register")) {
//       router.push("/Login");
//     }

//     if (decoded) {
//       const { userId } = decoded;
//       const fetchUser = async () => {
//         const user = await GetUser(userId);
//         if (user) {
//           cookieHandler.set("userId", user.id);
//           cookieHandler.set("user", user.name);
//           cookieHandler.set("role", user.role);
//           if (pathname.startsWith("/admin")) {
//             // If the path starts with '/admin', check user role
//             if (user.role !== "admin") {
//               // Redirect to admin login if user is not admin
//               router.push("/admin/authentication/login");
//             }
//           }
//         }
//       };
//       fetchUser();
//     }
//   }, [pathname, router]);
// };

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { cookieHandler } from "@/lib/cookieHandler";
import jwt from "jsonwebtoken";
import prismadb from "@/lib/prisma";

const GetUser = async (userId) => {
  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

export const useFrontAuthMiddleware = async () => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const token = cookieHandler.get("token");
    const decoded = jwt.decode(token);
    if (!decoded && !pathname.includes("register")) {
      // router.push("/login");
      return;
    }

    if (decoded) {
      const { userId } = decoded;
      const fetchUser = async () => {
        const user = await GetUser(userId);
        if (user) {
          cookieHandler.set("userId", user.id);
          cookieHandler.set("user", user.name);
          cookieHandler.set("role", user.role);
          if (pathname.startsWith("/admin")) {
            // If the path starts with '/admin', check user role
            if (user.role !== "admin") {
              // Redirect to admin login if user is not admin
              router.push("/admin/authentication/login");
            }
          }
        }
      };
      fetchUser();
    }
  }, [pathname, router]);
};
