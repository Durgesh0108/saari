import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { sliderId: string } }
) {
  try {
    const sliders = await prismadb.sliders.findUnique({
      where: {
        id: params.sliderId,
      },
    });
    return NextResponse.json(sliders);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sliderId: string } }
) {
  try {
    const sliders = await prismadb.sliders.delete({
      where: {
        id: params.sliderId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(sliders);
  } catch (error) {
    console.log("[sliders_sliders]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { sliderId: string } }
) {
  try {
    const body = await req.json();

    const sliders = await prismadb.sliders.update({
      where: {
        id: params.sliderId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(sliders);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
