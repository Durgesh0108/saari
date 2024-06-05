// pages/api/razorpay/order.js
import { createRazorpayOrder } from "@/lib/razorpay";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { amount } = body; // Total amount to be paid

    let newAmount = parseInt(amount);
    const order = await createRazorpayOrder(newAmount);
    return NextResponse.json({ id: order.id, amount: order.amount });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
