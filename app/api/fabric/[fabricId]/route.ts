import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { fabricId: string } }
) {
  try {
    const fabric = await prismadb.fabric.findUnique({
      where: {
        id: params.fabricId,
      },
    });
    return NextResponse.json(fabric);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { fabricId: string } }
) {
  try {
    const fabric = await prismadb.fabric.delete({
      where: {
        id: params.fabricId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(fabric);
  } catch (error) {
    console.log("[Product_fabric]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { fabricId: string } }
) {
  try {
    const body = await req.json();

    const fabric = await prismadb.fabric.update({
      where: {
        id: params.fabricId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(fabric);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
