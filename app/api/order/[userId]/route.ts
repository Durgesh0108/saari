import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const orders = await prismadb.order.findMany({
      where: { orderProducts: { some: { userId: params.userId } } },
      include: {
        orderProducts: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
