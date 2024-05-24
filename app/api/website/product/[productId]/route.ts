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
    });
    revalidatePath("/", "layout");
    return NextResponse.json(product);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
