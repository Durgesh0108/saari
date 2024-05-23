import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { patternId: string } }
) {
  try {
    const pattern = await prismadb.pattern.findUnique({
      where: {
        id: params.patternId,
      },
    });
    return NextResponse.json(pattern);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { patternId: string } }
) {
  try {
    const pattern = await prismadb.pattern.delete({
      where: {
        id: params.patternId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(pattern);
  } catch (error) {
    console.log("[Product_pattern]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { patternId: string } }
) {
  try {
    const body = await req.json();

    const pattern = await prismadb.pattern.update({
      where: {
        id: params.patternId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(pattern);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
