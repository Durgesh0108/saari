import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const occassion = await prismadb.occassion.create({
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(occassion);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const occassion = await prismadb.occassion.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(occassion);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
