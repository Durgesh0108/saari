// // pages/api/razorpay/success.js
// import prismadb from "@/lib/prisma";
// import { confirmRazorpayPayment } from "@/lib/razorpay";

// import { NextResponse } from "next/server";

// export async function POST(req, res) {
//   try {
//     const { orderId, paymentId, signature, amount, userId } = await req.json();
//     const paymentData = {
//       orderId,
//       paymentId,
//       signature,
//       amount,
//     };

//     // Verify the payment
//     const isPaymentValid = await confirmRazorpayPayment(paymentData);
//     if (!isPaymentValid) {
//       return NextResponse.json({ error: "Payment verification failed" });
//     }

//     // Get cart items
//     const cartItems = await prismadb.cartItem.findMany({
//       where: { userId },
//       include: { product: true },
//     });

//     // Create order
//     const newOrder = await prismadb.order.create({
//       data: {
//         subtotal: cartItems.reduce(
//           (acc, item) => acc + item.product.price * item.quantity,
//           0
//         ),
//         shipping: 0, // You can add shipping logic here
//         discount: 0, // You can add discount logic here
//         total: amount,
//         orderProducts: {
//           create: cartItems.map((item) => ({
//             userId,
//             productId: item.productId,
//             quantity: item.quantity,
//           })),
//         },
//       },
//     });

//     // Clear cart
//     await prismadb.cartItem.deleteMany({
//       where: { userId },
//     });

//     return NextResponse.json({ success: true, order: newOrder });
//   } catch (error) {
//     console.error("Error confirming payment:", error);
//     return NextResponse.json({ error: "Internal Server Error" });
//   }
// }


// pages/api/razorpay/success.js
import prismadb from "@/lib/prisma";
import { confirmRazorpayPayment } from "@/lib/razorpay";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { orderId, paymentId, signature, amount, userId } = await req.json();
    console.log("Received payment data:", { orderId, paymentId, signature, amount, userId });

    const paymentData = {
      orderId,
      paymentId,
      signature,
      amount,
    };

    // Verify the payment
    const isPaymentValid = await confirmRazorpayPayment(paymentData);
    if (!isPaymentValid) {
      console.log("Payment verification failed");
      return NextResponse.json({ error: "Payment verification failed" });
    }
    console.log("Payment verified successfully");

    // Get cart items
    const cartItems = await prismadb.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    if (cartItems.length === 0) {
      console.log("No cart items found for the user");
      return NextResponse.json({ error: "No cart items found" });
    }
    console.log("Cart items found:", cartItems);

    // Create order
    const newOrder = await prismadb.order.create({
      data: {
        subtotal: cartItems.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        ),
        shipping: 0, // You can add shipping logic here
        discount: 0, // You can add discount logic here
        total: amount,
        orderProducts: {
          create: cartItems.map((item) => ({
            userId,
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    });
    console.log("Order created:", newOrder);

    // Clear cart
    await prismadb.cartItem.deleteMany({
      where: { userId },
    });
    console.log("Cart cleared for user:", userId);

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Error confirming payment:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
