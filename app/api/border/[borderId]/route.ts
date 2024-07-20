import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { borderId: string } }
) {
  try {
    const border = await prismadb.border.findUnique({
      where: {
        id: params.borderId,
      },
    });
    return NextResponse.json(border);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { borderId: string } }
) {
  try {
    const border = await prismadb.border.delete({
      where: {
        id: params.borderId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(border);
  } catch (error) {
    console.log("[Product_border]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { borderId: string } }
) {
  try {
    const body = await req.json();

    const border = await prismadb.border.update({
      where: {
        id: params.borderId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(border);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
