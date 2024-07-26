import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const images = body.images;

    const attire = await prismadb.attire.create({
      data: {
        dressStyleId: body.dressStyleId,
        topViewId: body.topViewId,
      },
      include: {
        images: true,
      },
    });

    const imageObjects = images.map((image: any) => ({
      url: image,
      attireId: attire.id,
    }));

    // Create the images using Prisma's createMany function
    await prismadb.attireImage.createMany({
      data: imageObjects,
    });
    revalidatePath("/", "layout");
    return NextResponse.json(attire);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
