// @ts-nocheck

"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Eye, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { cookieHandler } from "@/lib/cookieHandler";
import axios from "axios";
import toast from "react-hot-toast";

import { Open_Sans } from "next/font/google";
const sans = Open_Sans({ subsets: ["latin"] });

export default function ProductCard({ product }) {
  const router = useRouter();
  const userId = cookieHandler.get("userId");
  const [hovered, setHovered] = useState(false);

  const addToCart = async (id) => {
    // Prevents event propagation

    try {
      if (!userId) {
        router.push("/Login");
      } else {
        const response = await axios.post(`/api/cart/${userId}`, {
          productId: id,
          quantity: 1,
        });
        toast.success("Added To Cart");
      }
    } catch (error) {
      toast.error("Error Adding To Cart");
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div
      className="bg-white rounded-xl md:rounded-none shadow-lg overflow-hidden group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="rounded-tl-2xl md:rounded-tl-[100px] rounded-br-2xl relative h-48 md:h-72">
        <Image
          src={product.images[0].url}
          alt={product.name}
          // layout="fill"
          fill
          // objectFit="cover"
          style={{ objectFit: "cover" }}
          className="transition duration-300 rounded-xl md:rounded-none md:rounded-br-2xl rounded-tl-2xl md:rounded-tl-[100px] rounded-br-2xl transform"
        />
        {/* Black background overlay */}
        <div
          className={`absolute inset-0 rounded-tl-2xl md:rounded-tl-[100px]  md:rounded-br-2xl rounded-br-2xl bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ${
            hovered ? "opacity-100" : ""
          }`}
        ></div>
        {/* Overlay icons */}
        <div
          className={`absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 ${
            hovered ? "opacity-100" : ""
          }`}
        >
          <div className="flex space-x-4 items-center">
            <button className="border-2 rounded-full p-2 group/view flex items-center gap-4">
              <Eye className="h-4 w-4 cursor-pointer hover:text-gray-800 transition duration-300" />
              <span className="hidden group-hover/view:block transition-all duration-700">
                View Details
              </span>
            </button>
            <button className="border-2 rounded-full p-2 group/button flex items-center gap-4">
              <ShoppingCart
                className="h-4 w-4 cursor-pointer hover:text-gray-800 transition duration-300"
                onClick={(event) => {
                  event.stopPropagation;
                  addToCart(product.id);
                }}
              />
              <span className="hidden group-hover/button:block transition-all duration-700">
                Add To Cart
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 capitalize line-clamp-3">
          {product.name}
        </h3>
        <p className={`text-gray-600 `}>&#8377; {product.price}</p>
      </div>
    </div>
  );
}
