import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const patterns = await prismadb.pattern.findMany({
      where: {
        categoryId: params.categoryId,
      },
    });

    return NextResponse.json(patterns);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
