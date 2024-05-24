import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // const requiredFields = ["name", "imageUrl"];

    // for (const field of requiredFields) {
    //   if (!body[field]) {
    //     return new NextResponse(`${field} is required`, { status: 400 });
    //   }
    // }
    const images = body.images;

    const sliders = await prismadb.sliders.create({
      data: {
        imageUrl: body.imageUrl,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(sliders);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const sliders = await prismadb.sliders.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json(sliders);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
