import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const requiredFields = ["name", "imageUrl", "min", "max"];

    for (const field of requiredFields) {
      if (!body[field]) {
        return new NextResponse(`${field} is required`, { status: 400 });
      }
    }

    const bestPrice = await prismadb.bestPrice.create({
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(bestPrice);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const bestPrice = await prismadb.bestPrice.findMany({
      orderBy: {
        name: "desc",
        // name: "asc",
      },
    });
    return NextResponse.json(bestPrice);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
