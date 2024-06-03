// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { userId: string } }
// ) {
//   try {
//     const body = await req.json();
//     const { productId } = body;

//     console.log(productId);
//     const user = await prisma.user.update({
//       where: { id: params.userId },
//       data: {
//         cart: {
//           push: productId,
//         },
//       },
//     });
//     return NextResponse.json(user.cart);
//   } catch (error) {
//     console.log("[CART_PATCH]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

// export async function GET(
//   req: Request,
//   { params }: { params: { userId: string } }
// ) {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: params.userId },
//       select: { cart: true },
//     });

//     if (!user) {
//       return new NextResponse("User not found", { status: 404 });
//     }

//     const products = await prisma.product.findMany({
//       where: {
//         id: { in: user.cart },
//       },
//       include: {
//         images: true,
//         description: true,
//         category: true,
//         occassion: true,
//         pattern: true,
//         type: true,
//         color: true,
//       },
//     });
//     return NextResponse.json(products);
//   } catch (error) {
//     console.log("[CART_GET]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

// export async function DELETE(
//   req: Request,
//   { params }: { params: { userId: string; productId: string } }
// ) {
//   try {
//     // Check if user exists
//     const existingUser = await prisma.user.findUnique({
//       where: { id: params.userId },
//     });

//     if (!existingUser) {
//       return new NextResponse("User not found", { status: 404 });
//     }

//     console.log(params.userId, params.productId);
//     console.log(existingUser.cart);
//     let newCart = existingUser.cart.filter((id) => id !== params.productId);
//     console.log(newCart);

//     // Remove productId from the user's cart
//     const user = await prisma.user.update({
//       where: { id: params.userId },
//       data: {
//         cart: {
//           set: existingUser.cart.filter((id) => id !== params.productId),
//         },
//       },
//     });

//     return NextResponse.json(user.cart);
//   } catch (error) {
//     console.log("[CART_DELETE]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();

    const { productId, quantity } = body;
    const cartItem = await prismadb.cartItem.create({
      data: {
        userId: params.userId,
        productId,
        quantity,
      },
    });
    return NextResponse.json(cartItem);
  } catch (error) {
    console.log("[CART_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await prismadb.user.findUnique({
      where: { id: params.userId as string },
      select: { cartItems: true },
    });

    if (!user) {
      return new NextResponse("User not found");
    }

    const cartItemIds = user.cartItems.map((item) => item.productId);

    const products = await prismadb.product.findMany({
      where: {
        id: { in: cartItemIds },
      },
      include: {
        images: true,
        description: true,
        category: true,
        occassion: true,
        pattern: true,
        type: true,
        color: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("[CART_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
