import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const order = await prismadb.order.deleteMany({});
    return NextResponse.json(order);
  } catch (error) {
    console.log("[Product_product]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
