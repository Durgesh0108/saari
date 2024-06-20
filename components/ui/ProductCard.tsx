// import Image from "next/image";
// import React from "react";

// export default function ProductCard({ product }) {
//   return (
//     <div className=" z-50  group">
//       <div className="rounded-tl-2xl md:rounded-tl-[100px] rounded-br-2xl h-48 md:h-72 relative -top-5">
//         <Image
//           src={product.images[0].url}
//           alt={product.name}
//           height={1}
//           width={1000}
//           className="w-full h-full overflow-hidden  duration-700 object-cover rounded-tl-2xl md:rounded-tl-[100px] rounded-br-2xl"
//         />
//       </div>
//       <div className=" duration-700 text-lg">
//         {product.name}
//       </div>
//     </div>
//   );
// }
// @ts-nocheck

import Image from "next/image";
import React, { useState } from "react";
import { Eye, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { cookieHandler } from "@/lib/cookieHandler";
import axios from "axios";
import toast from "react-hot-toast";

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
          layout="fill"
          objectFit="cover"
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
              <Eye className="h-8 w-8 cursor-pointer hover:text-gray-800 transition duration-300" />
              <span className="hidden group-hover/view:block transition-all duration-700">
                View Details
              </span>
            </button>
            <button className="border-2 rounded-full p-2 group/button flex items-center gap-4">
              <ShoppingCart
                className="h-8 w-8 cursor-pointer hover:text-gray-800 transition duration-300"
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
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600">&#8377; {product.price}</p>
      </div>
    </div>
  );
}
