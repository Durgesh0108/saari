import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { best_priceId: string } }
) {
  try {
    const bestPrice = await prismadb.bestPrice.findUnique({
      where: {
        id: params.best_priceId,
      },
    });

    return NextResponse.json(bestPrice);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { best_priceId: string } }
) {
  try {
    const bestPrice = await prismadb.bestPrice.delete({
      where: {
        id: params.best_priceId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(bestPrice);
  } catch (error) {
    console.log("[Product_bestPrice]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { best_priceId: string } }
) {
  try {
    const body = await req.json();

    const bestPrice = await prismadb.bestPrice.update({
      where: {
        id: params.best_priceId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(bestPrice);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
