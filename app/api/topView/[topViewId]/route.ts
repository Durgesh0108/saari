import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { topViewId: string } }
) {
  try {
    const topView = await prismadb.topView.findUnique({
      where: {
        id: params.topViewId,
      },
    });

    return NextResponse.json(topView);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { topViewId: string } }
) {
  try {
    const topView = await prismadb.topView.delete({
      where: {
        id: params.topViewId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(topView);
  } catch (error) {
    console.log("[Product_topView]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { topViewId: string } }
) {
  try {
    const body = await req.json();

    const topView = await prismadb.topView.update({
      where: {
        id: params.topViewId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(topView);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
