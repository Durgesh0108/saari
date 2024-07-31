// @ts-nocheck

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cookieHandler } from "@/lib/cookieHandler";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Card } from "@/components/ui/Card";

export default function OrdersListPage({ orders }) {
  //   const [orders, setOrders] = useState([]);
  const userId = cookieHandler.get("userId");
  const router = useRouter();
  const token = cookieHandler.get("token");
  if (token) {
    const decoded = jwtDecode(token);
  }

  let userOrders = orders.filter((order) => order.userId === userId);

  //   useEffect(() => {
  //     const fetchOrders = async () => {
  //       try {
  //         const orderRes = await fetch(`/api/order/${userId}`);
  //         const orders = await orderRes.json();
  //         setOrders(orders);
  //       } catch (error) {
  //         console.error("Error fetching orders:", error);
  //         toast.error("Failed to load orders. Please try again later.");
  //       }
  //     };

  //     fetchOrders();
  //   }, [userId]);

  return (
    <div>
      <div className="order-block mb-10">
        <div className="container">
          <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
            {/* <div className="xl:w-2/3 xl:pr-3 w-full"> */}
            <div className=" w-full">
              {/* Order Details */}
              {/* <div className="list-order w-full sm:mt-7 mt-5">
                <div className="w-full">
                  <div className="heading bg-surface bora-4 pt-4 pb-4">
                    <div className="flex">
                      <div className="w-1/2">
                        <div className="text-button text-center">Order ID</div>
                      </div>
                      <div className="w-1/4">
                        <div className="text-button text-center">Date</div>
                      </div>
                      <div className="w-1/4">
                        <div className="text-button text-center">Total</div>
                      </div>
                    </div>
                  </div>
                  <div className="list-order-main w-full mt-3">
                    {userOrders.map((order, index) => (
                      <div
                        key={index}
                        className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full"
                      >
                        <div className="w-1/2">
                          <div className="flex items-center gap-6">
                            <div className="order-id">
                              <div className="text-title">{order.id}</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/4 flex items-center justify-center">
                          <div className="date">
                            <div className="text-title text-center">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="w-1/4 flex items-center justify-center">
                          <div className="total">
                            <div className="text-title text-center">
                              &#8377;{order.total.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div> */}
              <div className="list-products w-full sm:mt-7 mt-5">
                <div className="w-full">
                  <div className="heading bg-surface bora-4 pt-4 pb-4">
                    <div className="flex">
                      <div className="w-1/2">
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
                  </div>
                  <div>
                    {userOrders.map((order, index) => (
                      <Card key={index} className="mb-4 p-4">
                        <div key={index} className="list-products-main w-full">
                          {order.orderProducts.map((product, productIndex) => (
                            <div
                              key={productIndex}
                              // className="item flex  mt-5 pb-5 md:mt-7 md:pb-7 border-b border-line w-full"
                              className="item flex  mt-4 pb-4  w-full"
                            >
                              <div className="w-1/2">
                                <div className="flex items-center gap-6">
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
                                    <div className="text-xl">
                                      {product.product.name}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="w-1/6 price flex items-center justify-center">
                                <div className="text-xl text-center">
                                  &#8377;{product.product.price}
                                </div>
                              </div>
                              <div className="w-1/6 flex items-center justify-center">
                                <div className="text-xl text-center">
                                  {product.quantity}
                                </div>
                              </div>
                              <div className="w-1/6 flex total-price items-center justify-center">
                                <div className="text-xl text-center">
                                  &#8377;
                                  {(
                                    product.product.price * product.quantity
                                  ).toFixed(2)}
                                </div>
                              </div>
                              <div className="w-1/4 flex items-center justify-center">
                                <div className="text-xl text-center">
                                  Estimated Delivery on 2nd August 2024
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
    </div>
  );
}
