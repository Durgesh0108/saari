import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { subTypeId: string } }
) {
  try {
    const subType = await prismadb.subType.findUnique({
      where: {
        id: params.subTypeId,
      },
    });
    return NextResponse.json(subType);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { subTypeId: string } }
) {
  try {
    const subType = await prismadb.subType.delete({
      where: {
        id: params.subTypeId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(subType);
  } catch (error) {
    console.log("[Product_subType]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { subTypeId: string } }
) {
  try {
    const body = await req.json();

    const subType = await prismadb.subType.update({
      where: {
        id: params.subTypeId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(subType);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
