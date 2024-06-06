// @ts-nocheck
// lib/razorpay.ts
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: "rzp_test_YZpzzVOx04hiuJ",
  key_secret: "9dTy3hRmBr3UlI2q7vsPZ01S",
});

export default razorpay;

export const createRazorpayOrder = async (amount) => {
  try {
    const options = {
      amount: amount * 100, // Amount should be in paisa
      currency: "INR",
    };
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    throw new Error("Error creating Razorpay order: " + error.message);
  }
};

export const confirmRazorpayPayment = async (paymentData) => {
  try {
    const { orderId, paymentId, signature, amount } = paymentData;

    // Verify the payment signature
    const generatedSignature = crypto
      .createHmac("sha256", "9dTy3hRmBr3UlI2q7vsPZ01S")
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      throw new Error("Invalid payment signature");
    }

    // Capture payment
    const payment = await razorpay.payments.capture(paymentId, amount * 100); // Amount should be in paisa
    return payment;
  } catch (error) {
    throw new Error("Error confirming Razorpay payment: " + error.message);
  }
};
