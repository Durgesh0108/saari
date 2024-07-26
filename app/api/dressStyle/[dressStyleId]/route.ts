import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { dressStyleId: string } }
) {
  try {
    const dressStyle = await prismadb.dressStyle.findUnique({
      where: {
        id: params.dressStyleId,
      },
    });

    return NextResponse.json(dressStyle);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { dressStyleId: string } }
) {
  try {
    const dressStyle = await prismadb.dressStyle.delete({
      where: {
        id: params.dressStyleId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(dressStyle);
  } catch (error) {
    console.log("[Product_dressStyle]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { dressStyleId: string } }
) {
  try {
    const body = await req.json();

    const dressStyle = await prismadb.dressStyle.update({
      where: {
        id: params.dressStyleId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(dressStyle);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
