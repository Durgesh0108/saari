import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { fabricId: string } }
) {
  try {
    const product = await prismadb.type.findMany({
      where: {
        fabricId: params.fabricId,
      },
      include: {
        category: true,
        fabric: true,
        Product: true,
        SubType: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
