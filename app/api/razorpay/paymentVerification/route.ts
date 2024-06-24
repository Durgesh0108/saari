import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import prismadb from "@/lib/prisma";

export async function POST(req: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } =
    await req.json();
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;


  if (!isAuthentic) {
    return NextResponse.json(
      {
        message: "Failure",
        data: isAuthentic,
      },
      {
        status: 200,
      }
    );
  }

  try {
    // Fetch the cart items for the user
    const cartItems = await prismadb.cartItem.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      return NextResponse.json(
        {
          message: "No items in the cart",
        },
        {
          status: 400,
        }
      );
    }

    // Calculate the total, subtotal, shipping, and discount (assuming 0 for now)
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const shipping = 0;
    const discount = 0;
    const total = subtotal + shipping - discount;

    // data: {
    //     subtotal: subtotal,
    //     shipping: shipping,
    //     discount: discount,
    //     total: total,
    //     orderProducts: {
    //       create: cartItems.map((item) => ({
    //         productId: item.productId,
    //         quantity: item.quantity,
    //         userId: userId,
    //       })),
    //     },
    //   },
    // Create the order
    // const order = await prismadb.order.create({
    //   data:{
    //     subtotal: subtotal,
    //     shipping: shipping,
    //     discount: discount,
    //     total: total,
    //     orderProducts: {
    //       create: cartItems.map((item) => ({
    //         userId: userId,
    //         productId: item.productId,
    //         quantity: item.quantity,
    //       })),
    //     },
    //   }
    // });

    const order = await prismadb.order.create({
      data: {
        subtotal: subtotal,
        shipping: shipping,
        discount: discount,
        total: total,
        orderProducts: {
          create: cartItems.map((item) => ({
            userId: userId,
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
        userId: userId,
      },
    });

    // Clear the cart
    await prismadb.cartItem.deleteMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(
      {
        message: "success",
        data: isAuthentic,
        order: order,
        cartItems: cartItems,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
