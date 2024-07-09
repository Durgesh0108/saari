import prismadb from "@/lib/prisma";
import React from "react";
import Navbar from "./navbar";
import { cookieHandler } from "@/lib/cookieHandler";
import cookie from "cookie"; // Import cookie for server-side parsing
import { headers } from "next/headers"; // To access headers in Next.js 13 or later

export default async function Header() {
  let token, userId;

  if (typeof window === "undefined") {
    // Server-side: Extract cookies from the request headers
    const headersList = headers();
    const cookies = cookie.parse(headersList.get("cookie") || ""); // Manually parse cookies
    token = cookies.token;
    userId = cookies.userId;
  } else {
    // Client-side: Use universal-cookie
    token = cookieHandler.get("token");
    userId = cookieHandler.get("userId");
  }

  // Fetch user data based on userId
  const user = userId
    ? await prismadb.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          cartItems: true,
        },
      })
    : null;

  const cart = userId
    ? await prismadb.cartItem.findMany({
        where: {
          userId: userId,
        },
      })
    : null;

  const products = await prismadb.product.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      category: {
        include: {
          Pattern: true,
          Product: true,
          Type: {
            include: {
              SubType: true,
            },
          },
        },
      },
      color: true,
      description: true,
      images: true,
      occassion: true,
      pattern: true,
      type: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      name: {
        not: "Gift Card",
      },
    },
    include: {
      Pattern: true,
      Fabric: {
        include: {
          Type: {
            include: {
              SubType: true,
            },
          },
        },
      },
      Type: {
        include: {
          SubType: true,
        },
      },
    },

    // take: 3,
  });

  // const user = await prismadb.user.findUnique({
  //   where: {
  //     id: userId,
  //   },
  //   include: {
  //     cartItems: true,
  //   },
  // });

  return (
    <>
      <div className="fixed top-0 z-50 w-full bg-white">
        <Navbar
          products={products}
          categories={categories}
          user={user}
          cart={cart}
        />
      </div>
    </>
  );
}
