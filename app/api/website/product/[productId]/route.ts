import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        category: true,
        color: true,
        description: true,
        images: true,
        occassion: true,
        pattern: true,
        type: true,
        blouseColor: true,
        fabric: true,
        palluColor: true,
        SubType: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(product);
  } catch (error) {
    console.log("[Product_product]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const body = await req.json();

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        ...body,
      },
      include: {
        category: true,
        color: true,
        description: true,
        images: {
          orderBy: {
            position: "asc",
          },
        },
        occassion: true,
        pattern: true,
        type: true,
        fabric: true,
        blouseColor: true,
        palluColor: true,
        SubType: true,
        blousePattern: true,
        border: true,
        borderColor: true,
        buttiType: true,
        palluMotif: true,
        sareeMotif: true,
        weave: true,
        weaveType: true,
        zari: true,
        zariColor: true,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(product);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
