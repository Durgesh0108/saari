import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { sareeMotifId: string } }
) {
  try {
    const sareeMotif = await prismadb.sareeMotif.findUnique({
      where: {
        id: params.sareeMotifId,
      },
    });
    return NextResponse.json(sareeMotif);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sareeMotifId: string } }
) {
  try {
    const sareeMotif = await prismadb.sareeMotif.delete({
      where: {
        id: params.sareeMotifId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(sareeMotif);
  } catch (error) {
    console.log("[Product_sareeMotif]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { sareeMotifId: string } }
) {
  try {
    const body = await req.json();

    const sareeMotif = await prismadb.sareeMotif.update({
      where: {
        id: params.sareeMotifId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(sareeMotif);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
