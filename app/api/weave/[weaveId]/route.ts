import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { weaveId: string } }
) {
  try {

    const weave = await prismadb.weave.findUnique({
      where: {
        id: params.weaveId,
      },
    });

    return NextResponse.json(weave);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { weaveId: string } }
) {
  try {
    const weave = await prismadb.weave.delete({
      where: {
        id: params.weaveId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(weave);
  } catch (error) {
    console.log("[Product_weave]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { weaveId: string } }
) {
  try {
    const body = await req.json();

    const weave = await prismadb.weave.update({
      where: {
        id: params.weaveId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(weave);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
