"use client";

import { useAuthMiddleware } from "@/app/middleware";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import r5logo from "@/public/img/r5logo.png";
// import Razorpay from "razorpay";
import Link from "next/link";
import RazorpayButton from "@/components/razorpay/PaymentButton";
import razorpayInstance from "@/lib/razorpay";
import toast from "react-hot-toast";

export default function DashboardPage() {

  return (
    <div className="flex flex-col gap-8">
      DashboardPage
    </div>
  );
}
