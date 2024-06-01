import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string; productId: string } }
  ) {
    try {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id: params.userId },
      });
  
      if (!existingUser) {
        return new NextResponse("User not found", { status: 404 });
      }
  
      // Remove productId from the user's cart
      const user = await prisma.user.update({
        where: { id: params.userId },
        data: {
          cart: {
            set: existingUser.cart.filter((id) => id !== params.productId),
          },
        },
      });
  
      return NextResponse.json(user.cart);
    } catch (error) {
      console.log("[CART_DELETE]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  