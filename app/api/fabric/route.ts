import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fabric = await prismadb.fabric.create({
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(fabric);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const fabric = await prismadb.fabric.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(fabric);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
