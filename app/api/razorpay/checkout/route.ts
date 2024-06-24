import prismadb from "@/lib/prisma";
import razorpay from "@/lib/razorpay";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const options = {
      amount: Number(body.amount * 100),
      currency: "INR",
    };

    const data = await razorpay.orders.create(options);


    // const order = await prismadb.advertisementSubscription.create({
    //   data: {
    //     amount: body.amount,
    //   },
    // });



    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
