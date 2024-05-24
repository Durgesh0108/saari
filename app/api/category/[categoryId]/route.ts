import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(category);
  } catch (error) {
    console.log("[Product_category]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const body = await req.json();

    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(category);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
