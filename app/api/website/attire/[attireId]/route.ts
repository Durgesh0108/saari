import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { attireId: string } }
) {
  try {
    const attire = await prismadb.attire.delete({
      where: {
        id: params.attireId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(attire);
  } catch (error) {
    console.log("[attire_attire]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { attireId: string } }
) {
  try {
    const body = await req.json();

    const attire = await prismadb.attire.update({
      where: {
        id: params.attireId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(attire);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
