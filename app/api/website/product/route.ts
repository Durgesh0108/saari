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

    // console.log(images, body);

    const product = await prismadb.product.create({
      data: {
        name: body.name,
        qty: body.qty,
        price: body.price,
        shortDescription: body.shortDescription,
        categoryId: body.categoryId,
        occassionId: body.occassionId,
        fabricId: body.fabricId,
        typeId: body.typeId,
        patternId: body.patternId,
        colorId: body.colorId,
        blouseColorId: body.blouseColorId,
        palluColorId: body.palluColorId,
        subTypeId: body.subTypeId,
        borderColorId: body.borderColorId,
        zariColorId: body.zariColorId,
        weaveId: body.weaveId,
        weaveTypeId: body.weaveTypeId,
        borderId: body.borderId,
        palluMotifId: body.palluMotifId,
        zariId: body.zariId,
        sareeMotifId: body.sareeMotifId,
        buttiTypeId: body.buttiTypeId,
        blousePatternId: body.blousePatternId,

        // images: {
        //   createMany: {
        //     data: [...images.map((image: { url: string }) => image)],
        //   },
        // },
      },
      include: {
        images: true,
      },
    });

    const imageObjects = images.map((image: any) => ({
      url: image,
      productId: product.id,
    }));

    // Create the images using Prisma's createMany function
    await prismadb.image.createMany({
      data: imageObjects,
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
        category: {
          include: {
            Pattern: true,
            Product: true,
            Type: true,
          },
        },
        color: true,
        description: true,
        images: true,
        occassion: true,
        pattern: true,
        type: true,
        blouseColor: true,
        palluColor: true,
        fabric: true,
        SubType: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
