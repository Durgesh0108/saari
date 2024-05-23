import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { typeId: string } }
) {
  try {
    const type = await prismadb.type.findUnique({
      where: {
        id: params.typeId,
      },
    });
    return NextResponse.json(type);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { typeId: string } }
) {
  try {
    const type = await prismadb.type.delete({
      where: {
        id: params.typeId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(type);
  } catch (error) {
    console.log("[Product_type]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { typeId: string } }
) {
  try {
    const body = await req.json();

    const type = await prismadb.type.update({
      where: {
        id: params.typeId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(type);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
