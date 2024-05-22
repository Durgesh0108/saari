import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CommonPaymentButton = ({ amount, onSuccess, onError }) => {
  const handlePayment = async () => {
    try {
      const order = await axios.post("/api/checkout", {
        amount,
      });

      const options = {
        // Configure your payment options here
      };

      // @ts-ignore
      const paymentObject = window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        onError && onError();
        toast.error("Payment failed. Please try again.");
      });

      paymentObject.on("payment.success", function (response) {
        onSuccess && onSuccess();
        toast.success("Payment successful.");
      });
    } catch (error) {
      onError && onError();
      toast.error("An error occurred during payment. Please try again later.");
    }
  };

  return (
    <button onClick={handlePayment}>
      Pay Rs. {amount}
    </button>
  );
};

export default CommonPaymentButton;
