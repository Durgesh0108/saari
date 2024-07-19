import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { weaveTypeId: string } }
) {
  try {
    const weaveSubType = await prismadb.weaveSubType.findUnique({
      where: {
        id: params.weaveTypeId,
      },
    });

    return NextResponse.json(weaveSubType);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { weaveTypeId: string } }
) {
  try {
    const weaveSubType = await prismadb.weaveSubType.delete({
      where: {
        id: params.weaveTypeId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(weaveSubType);
  } catch (error) {
    console.log("[Product_weave]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { weaveTypeId: string } }
) {
  try {
    const body = await req.json();

    const weaveSubType = await prismadb.weaveSubType.update({
      where: {
        id: params.weaveTypeId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(weaveSubType);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
