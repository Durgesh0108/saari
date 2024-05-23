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
        description: body.description,
        price: body.price,
        categoryId: body.categoryId,
        typeId: body.typeId,
        colorId: body.colorId,
        patternId: body.patternId,
        occassionId: body.occassionId,
        qty: body.quantity,
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
    });
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
