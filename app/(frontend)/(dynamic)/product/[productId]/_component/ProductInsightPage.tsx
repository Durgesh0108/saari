// @ts-nocheck

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { Heart, ShoppingCart, Truck, MapPin, Box } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { cookieHandler } from "@/lib/cookieHandler";
import toast from "react-hot-toast";
import axios from "axios";
import { cn } from "@/lib/utils";
import DescriptionTab from "./Description";
import ProductListing from "@/components/ui/ProductListing";
import ProductCard from "@/components/ui/ProductCard";

export default function ProductInsightPage({
  product,
  Colorproduct,
  Categoryproduct,
  Occassionproduct,
}) {
  const router = useRouter();
  const userId = cookieHandler.get("userId");
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const handleViewMoreColorProduct = () => {
  //   router.push(`/color/${product.colorId}`);
  // };

  // const handleViewMoreCategoryProduct = () => {
  //   router.push(`/category/${product.categoryId}`);
  // };

  // const handleViewMoreOccassionProduct = () => {
  //   router.push(`/occassion/${product.occassionId}`);
  // };

  const addToCart = async (id) => {
    try {
      if (!userId) {
        router.push("/Login");
      } else {
        const response = await axios.post(`/api/cart/${userId}`, {
          productId: id,
          quantity: 1,
        });
        console.log(response);
        toast.success("Added To Cart");
      }
    } catch (error) {
      toast.error("Error Adding To Cart");
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Product Images */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl border-[1px] border-pink-100 mb-8">
        <div className="p-4 md:p-6">
          <Tab.Group>
            <div className="flex flex-col md:flex-row">
              <Tab.List className="flex md:flex-col gap-4 md:gap-2 overflow-x-auto no-scrollbar md:overflow-y-auto md:h-full md:w-1/4">
                {product?.images?.map((image, index) => (
                  <Tab
                    key={index}
                    className={`relative w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden ${
                      index === currentImageIndex
                        ? "border-2 border-blue-500"
                        : ""
                    }cursor-pointer transition-transform transform hover:scale-105`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image.url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 100px) 100vw, 100px"
                    />
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="flex-1 h-full relative">
                {product?.images?.map((image, index) => (
                  <Tab.Panel
                    key={index}
                    className="h-full w-full flex items-center justify-center bg-gray-100 p-4"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image.url}
                        width={1000}
                        height={1000}
                        alt={product.name}
                        className="object-cover w-full h-full rounded-lg shadow-lg"
                        sizes="100vw"
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-8 p-4">
          <div>
            <h1 className="text-2xl font-medium text-gray-400 mb-2">
              {product.name}
            </h1>
            <h1 className="text-3xl font-semibold">&#8377; {product.price}</h1>
            <p className="text-lg font-medium text-gray-400">
              Inclusive of all taxes
            </p>
          </div>

          <div className="">
            <h1 className="text-2xl font-semibold mb-4">Home Delivery</h1>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Truck className="w-6 h-6 text-gray-400" />
                <span>Usually Dispatches within 1 to 2 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-gray-400" />
                <span>Enter pincode for delivery date</span>
              </div>
              <div className="flex items-center gap-2">
                <Box className="w-6 h-6 text-gray-400" />
                <span>Easy 7 day return</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button className="flex items-center gap-2 py-2 px-4 bg-white border-2 border-gray-300 rounded-lg">
              <Heart className="w-6 h-6 text-red-500" />
              <span>Add To Wishlist</span>
            </button>
            <button
              onClick={() => addToCart(product.id)}
              className="flex items-center gap-2 py-2 px-4 bg-pink-500 text-white font-bold rounded-lg"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Add To Cart</span>
            </button>
          </div>
        </div>
        {/* Product Details */}
        {/* <div className="flex flex-col gap-8 p-4">
          <div>
            <div>
              <h1 className="text-2xl font-medium text-black mb-2">
                Description
              </h1>
              <p>
                Handloom pista green pure kanjeevaram silk saree has golden
                butti upper side and butti with checks on the lower side with
                rama green-red border. Intricate rama green pallu and running
                plain rama green blouse piece with border.
              </p>
              <p>
                This beautiful kanjeevaram saree can be a pride possession for
                you. Kanjeevaram has a special traditional and cultural
                significance.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xl">
                <span className="text-xl font-medium text-black ">
                  Saree Color:
                </span>
                <span>Pista Green</span>
              </div>
              <div className="text-xl">
                <span className="text-xl font-medium text-black ">Fabric:</span>
                <span>Pure Silk</span>
              </div>
              <div className="text-xl">
                <span className="text-xl font-medium text-black ">
                  Wash Care:
                </span>
                <span>Dry clean only</span>
              </div>
              <div className="text-xl">
                <span className="text-xl font-medium text-black ">
                  Occasion:
                </span>
                <span>Traditional Wear/ Special Wear</span>
              </div>
              <div className="text-xl">
                <span className="text-xl font-medium text-black ">Note:</span>
                <span>
                  Product color may slightly vary due to photographic lighting
                  sources or your monitor settings
                </span>
              </div>
            </div>

            <div>
              <h1>Saree measurements</h1>
              <div className="flex flex-col gap-4">
                <div className="text-xl">
                  <span className="text-xl font-medium text-black ">
                    Length:
                  </span>
                  <span>5.24 meter</span>
                </div>
                <div className="text-xl">
                  <span className="text-xl font-medium text-black ">
                    Height:
                  </span>
                  <span>47 inches</span>
                </div>
                <div className="text-xl">
                  <span className="text-xl font-medium text-black ">
                    Blouse piece:
                  </span>
                  <span>85 centimeters</span>
                </div>
              </div>
            </div>

            <div>
              <h1>Instructions</h1>
              <p>
                We strive to capture photographs that are as authentic as
                possible, no filters or other special effects are used. However,
                colours may differ depending on the screen resolution used to
                access the product.
              </p>
            </div>
            <div>
              <h1>Shipping & Returns</h1>
              <ul>
                <li>
                  Kindly note that within India we share the bill and tracking
                  information 24hrs after the goods are shipped, and after about
                  72 hrs if its shipped Internationally.
                </li>
                <li>
                  Within India, you would receive the shipment within a week
                  after dispatched, 10 to 15 days outside India.
                </li>
                <li>
                  Please do not accept the courier if the package is torn or not
                  in good condition.
                </li>
                <li>
                  You may relax knowing that your product has passed all the
                  quality check procedures. Please be aware that we do not
                  accept returns and exchanges.
                </li>
              </ul>
            </div>
            <div>
              <h1>Care Instructions</h1>
              <p>We would suggest dry clean only.</p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Product Details Grid */}
      <div className="bg-white rounded-xl border-[1px] border-pink-100 mb-8  no-scrollbar overflow-auto px-4 py-12 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Product Description</h1>
        </div>
        <DescriptionTab product={product} />
      </div>

      {/* Similar Product Section */}
      <div className="bg-white rounded-xl border-[1px] border-pink-100 mb-8 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">
            Explore More From {product?.color?.name}
          </h1>
          <Link
            href={`/products?colorId=${product.colorId}`}
            className="py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
          >
            View More
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Colorproduct.slice(0, 4).map((product, index) => (
            <Link key={index} href={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border-[1px] border-pink-100 mb-8 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">
            Explore More From {product?.category?.name}
          </h1>
          <Link
            href={`/products?categoryId=${product.categoryId}`}
            className="py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
          >
            View More
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Categoryproduct.slice(0, 4).map((product, index) => (
            <Link key={index} href={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border-[1px] border-pink-100 mb-8 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">
            Explore More From {product?.occassion?.name}
          </h1>
          <Link
            href={`/products?occassionId=${product.occassionId}`}
            className="py-2 px-4 bg-pink-500 text-white font-bold rounded-full"
          >
            View More
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Occassionproduct.slice(0, 4).map((product, index) => (
            <Link key={index} href={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
