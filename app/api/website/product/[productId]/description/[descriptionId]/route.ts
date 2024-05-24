import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { descriptionId: string } }
) {
  try {
    const description = await prismadb.description.findUnique({
      where: {
        id: params.descriptionId,
      },
    });
    return NextResponse.json(description);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { descriptionId: string } }
) {
  try {
    const description = await prismadb.description.delete({
      where: {
        id: params.descriptionId,
      },
    });

    return NextResponse.json(description);
  } catch (error) {
    console.log("[description_description]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { descriptionId: string } }
) {
  try {
    const body = await req.json();

    const description = await prismadb.description.update({
      where: {
        id: params.descriptionId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(description);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
