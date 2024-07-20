import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { palluMotifId: string } }
) {
  try {
    const palluMotif = await prismadb.palluMotif.findUnique({
      where: {
        id: params.palluMotifId,
      },
    });
    return NextResponse.json(palluMotif);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { palluMotifId: string } }
) {
  try {
    const palluMotif = await prismadb.palluMotif.delete({
      where: {
        id: params.palluMotifId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(palluMotif);
  } catch (error) {
    console.log("[Product_palluMotif]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { palluMotifId: string } }
) {
  try {
    const body = await req.json();

    const palluMotif = await prismadb.palluMotif.update({
      where: {
        id: params.palluMotifId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(palluMotif);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
