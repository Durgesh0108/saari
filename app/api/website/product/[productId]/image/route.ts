import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const body = await req.json();
    const images = body.images;

    if (images.length > 0 || images.length === 0) {
      await prismadb.image.deleteMany({
        where: {
          productId: params.productId,
        },
      });
      // Map the image URLs to objects that match the Image model
      const imageObjects = images.map((image: any) => ({
        url: image.url,
        productId: params.productId,
      }));

      // Create the images using Prisma's createMany function
      await prismadb.image.createMany({
        data: imageObjects,
      });
    }

    return NextResponse.json(body);
  } catch (error) {
    console.log("PRODUCT_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// export async function PATCH(
//   req: Request,
//   { params }: { params: { productId: string } }
// ) {
//   try {
//     const body = await req.json();
//     const images = body.images;

//     console.log({ body, images });

//     // Update the product with the provided data
//     const product = await prismadb.product.update({
//       where: {
//         id: params.productId,
//       },
//       data: {
//         ...body,
//         // Remove the images field from the data object
//         // as it will be handled separately
//         // images: undefined,
//       },
//       include: {
//         images: true, // Ensure images are included in the returned product
//       },
//     });

//     // If there are images to upload, create them for the product
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

//     return NextResponse.json(product);
//   } catch (error) {
//     console.log("PRODUCT_PATCH", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

// export async function PATCH(
//   req: Request,
//   { params }: { params: { productId: string } }
// ) {
//   try {
//     // Validate request body
//     const body = await req.json();
//     if (!body.images || !Array.isArray(body.images)) {
//       throw new Error(
//         "Invalid request body: images array is missing or not an array"
//       );
//     }

//     const images = body.images;

//     // Begin a transaction to ensure atomicity
//     await prismadb.$transaction([
//       // Delete existing images associated with the product
//       prismadb.image.deleteMany({
//         where: {
//           productId: params.productId,
//         },
//       }),

//       // Update the product with the provided data
//       prismadb.product.update({
//         where: {
//           id: params.productId,
//         },
//         data: {
//           ...body,
//         },
//         include: {
//           images: true, // Ensure images are included in the returned product
//         },
//       }),
//       // Create new images for the product
//       prismadb.image.createMany({
//         data: images.map((image: any) => ({
//           url: image.url,
//           productId: params.productId,
//         })),
//       }),
//     ]);

//     return NextResponse.json({ message: "Product updated successfully" });
//   } catch (error) {
//     console.error("Error updating product:", error.message);
//     return new NextResponse("Internal server error", { status: 500 });
//   }
// }
