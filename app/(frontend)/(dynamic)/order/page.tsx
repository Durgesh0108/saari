import React from "react";
import OrdersListPage from "./_component/OrderList";
import prismadb from "@/lib/prisma";

export default async function OrdersPage() {
  const orders = await prismadb.order.findMany({
    include: {
      user: true,
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
    },
  });
  return (
    <div>
      <OrdersListPage orders={orders} />
    </div>
  );
}
