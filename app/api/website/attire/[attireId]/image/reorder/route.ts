// import prismadb from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function PUT(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const { list } = await req.json();

//     for (let item of list) {
//       await prismadb.image.update({
//         where: {
//           id: item.id,
//         },
//         data: {
//           position: item.position,
//         },
//       });
//     }

//     return new NextResponse("Success", { status: 200 });
//   } catch (error) {
//     console.log("[REORDER]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { attireId: string } }
) {
  try {
    const { list } = await req.json();

    for (let item of list) {
      await prismadb.attireImage.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
