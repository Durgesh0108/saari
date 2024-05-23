import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const color = await prismadb.color.delete({
      where: {
        id: params.colorId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(color);
  } catch (error) {
    console.log("[Product_color]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const body = await req.json();

    const color = await prismadb.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(color);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
