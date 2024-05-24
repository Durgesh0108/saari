import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { date } from "zod";

export async function POST(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const body = await req.json();

    const description = await prismadb.description.create({
      data: {
        productId: params.productId,
        ...body,
      },
    });

    console.log(description);
    return NextResponse.json(description);
    // return NextResponse.json(body)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const descriptions = await prismadb.description.findMany({});
    return NextResponse.json(descriptions);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
