import prismadb from "@/lib/prisma";
import AdminOrdersListPage from "./OrderListPage";

const OrderPage = async () => {
  const orders = await prismadb.order.findMany({
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
          user: true,
        },
      },
      user: true,
    },
  });
  return (
    <>
      <AdminOrdersListPage orders={orders} />
    </>
  );
};

export default OrderPage;
