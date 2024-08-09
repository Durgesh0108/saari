// @ts-nocheck

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cookieHandler } from "@/lib/cookieHandler";
import prismadb from "@/lib/prisma";

const formSchema = z.object({
  billing_address: z.string().min(2, "Address is required"),
  billing_address_2: z.string().min(2, "Address 2 is required").optional(),
  billing_city: z.string().min(2, "City is required"),
  billing_pincode: z.string().min(2, "Pincode is required"),
  billing_state: z.string().min(2, "State is required"),
  billing_country: z.string().min(2, "Country is required"),

  billing_customer_name: z.string().min(2, "Name is Required"),
  billing_last_name: z.string().min(2, "Last Name is Required"),
  billing_email: z.string().email().min(2, "Email is Required"),
  billing_phone: z
    .string()
    .min(10, "Phone Number Should be Atleast 10 Numbers")
    .max(10, "Phone Number Should be Only 10 Numbers"),
});

type CheckOutFormValues = z.infer<typeof formSchema>;

export default function CheckOutForm({ users }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  const [cartProducts, setCartProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [shipRocket, setshipRocket] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentError, setPaymentError] = useState("");

  const userId = cookieHandler.get("userId");

  useEffect(() => {
    if (!userId) {
      cookieHandler.remove("userId");
      cookieHandler.remove("token");
      cookieHandler.remove("role");
      cookieHandler.remove("user");
      toast.error("Please Login To Continue");
      router.push("/Login");
      return;
    }

    const currentUser = users.find((user) => user.id === userId);
    if (!currentUser) {
      toast.error("Invalid User");
      router.push("/Login");
      return;
    }
    setUser(currentUser);
  }, [users, userId, router]);

  useEffect(() => {
    if (user && user.cartItems) {
      const cartProducts = user.cartItems.map((cartItem) => ({
        ...cartItem.product,
        quantity: cartItem.quantity,
      }));
      setCartProducts(cartProducts);

      const initialQuantities = {};
      cartProducts.forEach((product) => {
        initialQuantities[product.id] = product.quantity;
      });
      setQuantities(initialQuantities);

      calculateTotals(cartProducts, initialQuantities);

      const shiprocketValues = calculateShiprocket(cartProducts);
      setshipRocket({
        length: shiprocketValues.totalLength,
        width: shiprocketValues.totalWidth,
        height: shiprocketValues.totalHeight,
        weight: shiprocketValues.totalWeight,
      });
    }
  }, [user]);

  const calculateTotals = (products, quantities) => {
    const subtotal = products.reduce((acc, product) => {
      return acc + product.price * (quantities[product.id] || 1);
    }, 0);

    setSubtotal(subtotal);
    // setTotal(subtotal + shipping - discount);
    setTotal(subtotal);
  };

  const calculateShiprocket = (products) => {
    const totalLength = products.reduce((acc, product) => {
      return acc + (product.shiplength || 0) * (product.quantity || 1);
    }, 0);

    const totalWidth = products.reduce((acc, product) => {
      return acc + (product.shipwidth || 0) * (product.quantity || 1);
    }, 0);

    const totalHeight = products.reduce((acc, product) => {
      return acc + (product.shipheight || 0) * (product.quantity || 1);
    }, 0);

    const totalWeight = products.reduce((acc, product) => {
      return acc + (product.shipweight || 0) * (product.quantity || 1);
    }, 0);

    return {
      totalLength,
      totalWidth,
      totalHeight,
      totalWeight,
    };
  };

  const form = useForm<CheckOutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billing_address: "",
      billing_address_2: "",
      billing_city: "",
      billing_pincode: "",
      billing_state: "",
      billing_country: "",
      billing_customer_name: user?.name || "",
      billing_last_name: user?.lastName || "",
      billing_email: user?.email || "",
      billing_phone: user?.phone || "",
    },
  });

  const handleCheckout = async (amount: number) => {
    try {
      const order = await axios.post("/api/razorpay/checkout", {
        amount,
      });

      const options = {
        key: "rzp_test_YZpzzVOx04hiuJ",
        name: "Probiz5",
        currency: order.data.currency,
        amount: order.data.amount,
        order_id: order.data.id,
        description: "Understanding RazorPay Integration",
        image:
          "https://res.cloudinary.com/dttieobbt/image/upload/v1714651240/Probiz5_fevicon_01_dwtfxa.png",

        handler: async function (response) {
          const data = await fetch("/api/razorpay/paymentVerification", {
            method: "POST",
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              userId: user.id,
            }),
          });

          const res = await data.json();

          if (res.data) {
            await handleSubmit(form.getValues(), {
              order_id: res.order.id,
              order_date: res.order.createdAt,
              shipping_is_billing: true,
              payment_method: "Prepaid",
              sub_total: total,
              length: shipping.length,
              breadth: shipping.width,
              height: shipping.height,
              weight: shipping.weight,
            });
          } else {
            toast.error("Payment Failed");
          }
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        toast.error(
          "Payment failed. Please try again. Contact support for help"
        );
      });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred during payment. Please try again later.");
    }
  };

  const handleSubmit = async (values: CheckOutFormValues, extra) => {
    const data = {
      ...values,
      ...extra,
      order_items: cartProducts.map((item, index) => ({
        name: item.name,
        sku: item?.sku || `Kaushanee-${index}`,
        units: item.quantity,
        selling_price: item.price,
        discount: 0, // Add other fields as needed
        tax: "",
        hsn: "",
      })),
    };

    const raw = JSON.stringify({
      order_id: data.order_id,
      order_date: data.order_date,
      billing_customer_name: data.billing_customer_name,
      billing_last_name: data.billing_last_name,
      billing_address: data.billing_address,
      billing_address_2: data.billing_address_2,
      billing_city: data.billing_city,
      billing_pincode: data.billing_pincode,
      billing_state: data.billing_state,
      billing_country: data.billing_country,
      billing_email: data.billing_email,
      billing_phone: data.billing_phone,
      shipping_is_billing: true,
      order_items: data.order_items,
      payment_method: data.payment_method,
      sub_total: data.sub_total,
      length: shipRocket.length,
      breadth: shipRocket.width,
      height: shipRocket.height,
      weight: shipRocket.weight,
    });

    console.log("ShipRocket Dimensions:", shipRocket);
    console.log("Payload Data:", raw);

    const login = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: "prajapati@gmail.com",
        password: "Durgesh@1518",
      }
    );

    const token = login.data.token;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        toast.error(`Error: ${errorData.message || "Something went wrong"}`);
        return;
      }

      const result = await response.json();

      await axios.patch(`/api/order/${data.order_id}`, {
        shipRocketOrderId: result.order_id,
      });

      toast.success("Thank You For Purchasing");
      setCartProducts([]);

      const orderInvoice = {
        userId: user.id,
        name: values.billing_customer_name,
        last_name: values.billing_last_name,
        phone: values.billing_phone,
        email: values.billing_email,
        order_id: result.order_id,
        amount: extra.sub_total,
        billing_address: `${values.billing_address}\n${values.billing_address_2}\n${values.billing_city},${values.billing_state}\n${values.billing_country},${values.billing_pincode}`,
        items: cartProducts.map((item, index) => ({
          name: item.name,
          units: item.quantity,
          rate: item.price,
          discount: 0, // Add other fields as needed
          subtotal: item.quantity * item.price,
        })),
      };

      await fetch("/api/generateInvoice/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: orderInvoice.userId,
          billing_address: orderInvoice.billing_address,
          order_id: orderInvoice.order_id,
          amount: orderInvoice.amount,
          items: orderInvoice.items,
          discount: 0,
          name: orderInvoice.name,
          last_name: orderInvoice.last_name,
          phone: orderInvoice.phone,
          email: orderInvoice.email,
        }),
      });
      router.push("/");
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 w-full"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="billing_customer_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Customer Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billing_last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Customer Last Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billing_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone No.</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billing_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Id</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Customer Email Id"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billing_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billing Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billing_address_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Address 2</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billing Address 2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billing_city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billing_pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Pincode"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billing_state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billing_country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full mt-7">
            <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
              <div className="text-xl font-semibold">Order Summary</div>
              <div className="mt-5 space-y-3">
                <div className="flex justify-between">
                  <div className="text-gray-600">Subtotal</div>
                  <div className="font-medium">
                    &#8377;{subtotal.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-600">Shipping</div>
                  <div className="font-medium">
                    &#8377;{shipping.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-600">Discount</div>
                  <div className="font-medium">
                    -&#8377;{discount.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-lg font-semibold">Total</div>
                  <div className="text-lg font-semibold">
                    &#8377;{total.toFixed(2)}
                  </div>
                </div>
              </div>
              <Button
                disabled={!total}
                onClick={() => handleCheckout(total)}
                className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Pay
              </Button>
              {paymentError && (
                <div className="text-red-500 mt-3">{paymentError}</div>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
