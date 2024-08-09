import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/Card";
import prismadb from "@/lib/prisma";
import Image from "next/image";
import React from "react";

export default async function OrderIdPage({ params }) {
  const order = await prismadb.order.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      orderProducts: {
        include: {
          product: {
            include: {
              images: {
                orderBy: {
                  position: "asc",
                },
              },
            },
          },
        },
      },
      user: true,
    },
  });

  return (
    <>
      <Card className="mb-4 p-4 space-y-4">
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <div className="grid grid-cols-1 gap-4">
            <div>Order Id: {order.id}</div>
            <div>Ship Rocket Id: {order.shipRocketOrderId}</div>
          </div>
          <div>
            {order.shipRocketOrderId ? (
              <Button variant="ghost" disabled>
                Pushed to ShipRocket
              </Button>
            ) : (
              <Button variant="success">Push to ShipRocket</Button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>Customer Id: {order.user.id}</div>
          <div>Customer Name: {order.user.name}</div>
          <div>Customer Phone: {order.user.phoneNumber}</div>
          <div>Customer Emial: {order.user.email}</div>
        </div>
      </Card>
      <Card className="mb-4 p-4">
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
                  <div className="text-md">{product.product.name}</div>
                </div>
              </div>
              <div className="w-1/3 md:w-1/6 flex items-center justify-center mb-4 md:mb-0">
                <div className="text-md text-center">
                  &#8377;{product.product.price}
                </div>
              </div>
              <div className="w-1/3 md:w-1/6 flex items-center justify-center mb-4 md:mb-0">
                <div className="text-md text-center">{product.quantity}</div>
              </div>
              <div className="w-1/3 md:w-1/6 flex items-center justify-center mb-4 md:mb-0">
                <div className="text-md text-center">
                  &#8377;
                  {(product.product.price * product.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
          {!order.orderProducts ||
            (order.orderProducts.length === 0 && <p>Failed To Fetch Order</p>)}
        </div>
      </Card>
    </>
  );
}
