import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { FaBorderStyle } from "react-icons/fa";

export async function DELETE(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const order = await prismadb.order.delete({
      where: {
        id: params.orderId,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("[Product_product]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const body = await req.json();

    const order = await prismadb.order.update({
      where: {
        id: params.orderId,
      },
      data:{
        ...body
      }
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("[Product_product]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}