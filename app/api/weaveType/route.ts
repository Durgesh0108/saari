import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const requiredFields = ["name"];

    for (const field of requiredFields) {
      if (!body[field]) {
        return new NextResponse(`${field} is required`, { status: 400 });
      }
    }

    const weaveSubType = await prismadb.weaveSubType.create({
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(weaveSubType);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const weaveSubTypes = await prismadb.weaveSubType.findMany({
      orderBy: {
        name: "desc",
        // name: "asc",
      },
    });
    return NextResponse.json(weaveSubTypes);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
