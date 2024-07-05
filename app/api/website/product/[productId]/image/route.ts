// import prismadb from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { NextResponse } from "next/server";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { productId: string } }
// ) {
//   try {
//     const body = await req.json();
//     const images = body.images;

//     console.log({ body });

//     if (images.length > 0 || images.length === 0) {
//       await prismadb.image.deleteMany({
//         where: {
//           productId: params.productId,
//         },
//       });
//       // Map the image URLs to objects that match the Image model
//       const imageObjects = images.map((image: any) => ({
//         url: image.url,
//         productId: params.productId,
//       }));

//       // Create the images using Prisma's createMany function
//       await prismadb.image.createMany({
//         data: imageObjects,
//       });
//     }

//     return NextResponse.json(body);
//   } catch (error) {
//     console.log("PRODUCT_PATCH", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }



import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// API Route handler
export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const body = await req.json();
    const { images } = body;

    // Validate that images is an array
    if (!Array.isArray(images)) {
      return NextResponse.json({ error: "Invalid images format" }, { status: 400 });
    }

    // Log for debugging
    console.log("Received body:", body);

    // Delete existing images related to the product
    await prismadb.image.deleteMany({
      where: {
        productId: params.productId,
      },
    });

    // Map the image URLs to objects for Prisma
    const imageObjects = images.map((image) => ({
      url: image.url, // Assuming each image object has a `url` field
      productId: params.productId,
    }));

    // Create new images in the database
    if (imageObjects.length > 0) {
      await prismadb.image.createMany({
        data: imageObjects,
      });
    }

    // Revalidate cache for the product path
    revalidatePath(`/products/${params.productId}`);

    // Respond with the updated images
    return NextResponse.json({ images: imageObjects });
  } catch (error) {
    console.error("PRODUCT_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
