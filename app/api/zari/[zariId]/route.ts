import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { zariId: string } }
) {
  try {
    const zari = await prismadb.zari.findUnique({
      where: {
        id: params.zariId,
      },
    });
    return NextResponse.json(zari);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { zariId: string } }
) {
  try {
    const zari = await prismadb.zari.delete({
      where: {
        id: params.zariId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(zari);
  } catch (error) {
    console.log("[Product_zari]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { zariId: string } }
) {
  try {
    const body = await req.json();

    const zari = await prismadb.zari.update({
      where: {
        id: params.zariId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(zari);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
