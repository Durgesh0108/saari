import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { occassionId: string } }
) {
  try {
    const product = await prismadb.product.findMany({
      where: {
        occassionId: params.occassionId,
      },
      include: {
        category: true,
        color: true,
        description: true,
        images: true,
        occassion: true,
        pattern: true,
        type: true,
      }
    });
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
