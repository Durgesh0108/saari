import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const requiredFields = ["name", "categoryId"];

    for (const field of requiredFields) {
      if (!body[field]) {
        return new NextResponse(`${field} is required`, { status: 400 });
      }
    }

    const palluMotif = await prismadb.palluMotif.create({
      data: {
        ...body,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(palluMotif);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const palluMotif = await prismadb.palluMotif.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(palluMotif);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
