import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string; productId: string } }
) {
  try {
    const user = await prismadb.user.findUnique({
      where: { id: params.userId as string },
      select: { cartItems: true },
    });

    if (!user) {
      return new NextResponse("User not found");
    }

    const existingCartItem = user.cartItems.find(
      (item) => item.productId === params.productId
    );

    if (!existingCartItem) {
      return new NextResponse("Item not found in the cart");
    }

    const cart = await prismadb.cartItem.delete({
      where: { id: existingCartItem.id },
    });

    return NextResponse.json(user.cartItems);
  } catch (error) {
    console.log("[CART_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { userId: string; productId: string } }
) {
  try {
    const { quantity } = await req.json();
    const user = await prismadb.user.findUnique({
      where: { id: params.userId as string },
      select: { cartItems: true },
    });

    if (!user) {
      return new NextResponse("User not found");
    }
    // Find the cart item for the user and product
    const cartItem = await prismadb.cartItem.findFirst({
      where: {
        userId: params.userId,
        productId: params.productId,
      },
    });

    if (!cartItem) {
      return new NextResponse("Cart item not found");
    }

    // Update the quantity of the cart item
    const updatedCartItem = await prismadb.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: parseInt(quantity) },
    });

    return NextResponse.json(user.cartItems);
  } catch (error) {
    console.log("[CART_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
