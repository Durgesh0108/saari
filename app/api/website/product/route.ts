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

    const product = await prismadb.product.create({
      data: {
        name: body.name,
        qty: body.qty,
        price: body.price,
        shortDescription: body.shortDescription,
        categoryId: body.categoryId,
        occassionId: body.occassionId,
        typeId: body.typeId,
        patternId: body.patternId,
        colorId: body.colorId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const product = await prismadb.product.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        category: true,
        color: true,
        description: true,
        images: true,
        occassion: true,
        pattern: true,
        type: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
