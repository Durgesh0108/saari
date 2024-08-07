// @ts-nocheck

"use client";

import Image from "next/image";
import React from "react";
import { cookieHandler } from "@/lib/cookieHandler";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import toast from "react-hot-toast";

export default function OrdersListPage({ orders }) {
  const userId = cookieHandler.get("userId");
  const token = cookieHandler.get("token");
  const router = useRouter();

  if (!userId) {
    toast.error("Please Login To Continue");
    router.push("/Login");
    return;
  }

  let userOrders = orders.filter((order) => order.userId === userId);

  if (!userOrders || userOrders.length === 0) {
    return (
      <div className="container mx-auto w-full h-full flex flex-col justify-center items-center text-center p-6">
        <div className="mb-4">
          <Image
            src="https://res.cloudinary.com/dttieobbt/image/upload/v1717074733/product-not-found_ptexdu.jpg" // Ensure you have an appropriate image here
            alt="No Orders"
            width={150}
            height={150}
          />
        </div>
        <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
        <p className="text-gray-600 mb-4">
          It looks like you haven&apos;t placed any orders yet. Explore our products
          and place your first order!
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() =>
            router.push("/products?typeId=665034bd34dc6b05106ac93e")
          }
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="order-block mb-10">
        <div className="content-main flex flex-col gap-y-8">
          <div className="w-full">
            <div className="list-products w-full sm:mt-7 mt-5">
              <div className="w-full">
                {/* <div className="heading bg-surface bora-4 pt-4 pb-4">
                  <div className="flex flex-wrap">
                    <div className="w-1/4">
                      <div className="text-button text-center">Products</div>
                    </div>
                    <div className="w-1/6">
                      <div className="text-button text-center">Price</div>
                    </div>
                    <div className="w-1/6">
                      <div className="text-button text-center">Quantity</div>
                    </div>
                    <div className="w-1/6">
                      <div className="text-button text-center">Total</div>
                    </div>
                    <div className="w-1/4">
                      <div className="text-button text-center">Delivery</div>
                    </div>
                  </div>
                </div> */}
                <div>
                  {userOrders.map((order, index) => (
                    <Card key={index} className="mb-4 p-4">
                      <div className="list-products-main w-full">
                        {order.orderProducts.map((product, productIndex) => (
                          <div
                            key={productIndex}
                            className="item flex flex-wrap  mt-4 pb-4 w-full"
                          >
                            <div className="w-full md:w-1/4 flex items-center gap-6 mb-4 md:mb-0">
                              <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
                                <Image
                                  src={product.product.images[0]?.url}
                                  alt="img"
                                  width={1000}
                                  height={1}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>
                              <div>
                                {/* <div className="text-lg md:text-xl"> */}
                                <div className="text-md">
                                  {product.product.name}
                                </div>
                              </div>
                            </div>
                            <div className="w-1/3 md:w-1/6 flex items-center justify-center mb-4 md:mb-0">
                              <div className="text-md text-center">
                                &#8377;{product.product.price}
                              </div>
                            </div>
                            <div className="w-1/3 md:w-1/6 flex items-center justify-center mb-4 md:mb-0">
                              <div className="text-md text-center">
                                {product.quantity}
                              </div>
                            </div>
                            <div className="w-1/3 md:w-1/6 flex items-center justify-center mb-4 md:mb-0">
                              <div className="text-md text-center">
                                &#8377;
                                {(
                                  product.product.price * product.quantity
                                ).toFixed(2)}
                              </div>
                            </div>
                            <div className="w-full md:w-1/4 flex items-center justify-center">
                              <div className="text-md text-center">
                                Estimated Delivery Within 7 to 15 Days
                              </div>
                            </div>
                          </div>
                        ))}
                        {!order.orderProducts ||
                          (order.orderProducts.length === 0 && (
                            <p>Failed To Fetch Order</p>
                          ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
