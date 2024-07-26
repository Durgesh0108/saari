import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const type = await prismadb.type.create({
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(type);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const Type = await prismadb.type.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(Type);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
