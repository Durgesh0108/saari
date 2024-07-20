import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { blousePatternId: string } }
) {
  try {
    const blousePattern = await prismadb.blousePattern.findUnique({
      where: {
        id: params.blousePatternId,
      },
    });
    return NextResponse.json(blousePattern);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { blousePatternId: string } }
) {
  try {
    const blousePattern = await prismadb.blousePattern.delete({
      where: {
        id: params.blousePatternId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(blousePattern);
  } catch (error) {
    console.log("[Product_blousePattern]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { blousePatternId: string } }
) {
  try {
    const body = await req.json();

    const blousePattern = await prismadb.blousePattern.update({
      where: {
        id: params.blousePatternId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(blousePattern);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
