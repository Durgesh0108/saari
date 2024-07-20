import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { buttiTypeId: string } }
) {
  try {
    const buttiType = await prismadb.buttiType.findUnique({
      where: {
        id: params.buttiTypeId,
      },
    });
    return NextResponse.json(buttiType);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { buttiTypeId: string } }
) {
  try {
    const buttiType = await prismadb.buttiType.delete({
      where: {
        id: params.buttiTypeId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(buttiType);
  } catch (error) {
    console.log("[Product_buttiType]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { buttiTypeId: string } }
) {
  try {
    const body = await req.json();

    const buttiType = await prismadb.buttiType.update({
      where: {
        id: params.buttiTypeId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(buttiType);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
