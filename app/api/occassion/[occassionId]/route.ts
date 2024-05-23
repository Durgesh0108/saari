import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { occassionId: string } }
) {
  try {
    const occassion = await prismadb.occassion.findUnique({
      where: {
        id: params.occassionId,
      },
    });
    return NextResponse.json(occassion);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { occassionId: string } }
) {
  try {
    const occassion = await prismadb.occassion.delete({
      where: {
        id: params.occassionId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(occassion);
  } catch (error) {
    console.log("[Product_occassion]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { occassionId: string } }
) {
  try {
    const body = await req.json();

    const occassion = await prismadb.occassion.update({
      where: {
        id: params.occassionId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(occassion);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
