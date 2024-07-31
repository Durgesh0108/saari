// "use client";

// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { cookieHandler } from "@/lib/cookieHandler";

// const formSchema = z.object({
//   billing_address_1: z.string().min(2, "It is required"),
//   billing_address_2: z.string().min(2, "It is required"),
//   billing_city: z.string().min(2, "It is required"),
//   billing_pincode: z.string().min(2, "It is required"),
//   billing_state: z.string().min(2, "It is required"),
//   billing_country: z.string().min(2, "It is required"),
// });

// type CheckOutFormValues = z.infer<typeof formSchema>;

// export default function CheckOutForm() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const [cartProducts, setCartProducts] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [subtotal, setSubtotal] = useState(0);
//   const [shipping, setShipping] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [paymentError, setPaymentError] = useState("");

//   const userId = cookieHandler.get("userId");

//   useEffect(() => {
//     const fetchCartProducts = async () => {
//       const productRes = await fetch(`/api/cart/${userId}`);
//       const products = await productRes.json();
//       setCartProducts(products);

//       // Initialize quantities

//       const initialQuantities = {};
//       products.forEach((product) => {
//         initialQuantities[product.id] = product.quantity; // Use the quantity from the cart
//       });
//       setQuantities(initialQuantities);

//       // Calculate totals based on initial quantities
//       calculateTotals(products, initialQuantities);

//       // const initialQuantities = {};
//       // products.forEach((product) => {
//       //   initialQuantities[product.id] = 1; // Default quantity is 1
//       // });
//       // setQuantities(initialQuantities);
//       // calculateTotals(products, initialQuantities);
//     };
//     fetchCartProducts();
//   }, [userId]);

//   const calculateTotals = (products, quantities) => {
//     const subtotal = products.reduce((acc, product) => {
//       return acc + product.price * (quantities[product.id] || 1);
//     }, 0);

//     setSubtotal(subtotal);
//     setTotal(subtotal + shipping - discount);
//   };

//   const form = useForm<CheckOutFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       billing_address_1: "",
//       billing_address_2: "",
//       billing_city: "",
//       billing_pincode: "",
//       billing_state: "",
//       billing_country: "",
//     },
//   });

//   const handleCheckout = async (amount: number) => {
//     try {
//       const order = await axios.post("/api/razorpay/checkout", {
//         amount,
//       });

//       const options = {
//         key: "rzp_test_YZpzzVOx04hiuJ",
//         name: "Probiz5",
//         currency: order.data.currency, // Fix typo here
//         amount: order.data.amount,
//         order_id: order.data.id,
//         description: "Understanding RazorPay Integration",
//         image:
//           "https://res.cloudinary.com/dttieobbt/image/upload/v1714651240/Probiz5_fevicon_01_dwtfxa.png",
//         // "https://res.cloudinary.com/dttieobbt/image/upload/v1711453976/flf6aizdhi9m8asgtjmg.png",

//         //   @ts-ignore
//         handler: async function (response) {
//           // if (response.length==0) return <Loading/>;

//           const data = await fetch("/api/razorpay/paymentVerification", {
//             method: "POST",
//             // headers: {
//             //   // Authorization: 'YOUR_AUTH_HERE'
//             // },
//             body: JSON.stringify({
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
//               userId: userId,
//             }),
//           });

//           const res = await data.json();

//           if (res.data) {
//             toast.success("Thank You");
//             setCartProducts([]);
//             // await handleSubmit(form.getValues(), extra);
//           } else {
//             toast.error("Payment Failed");
//           }
//         },
//         // prefill: {
//         //   name: "Durgesh Prajapati",
//         //   email: "prajapatidurgesh1518@gmail.com",
//         //   contact: "9653320535",
//         // },
//       };

//       // const paymentObject = new razorpayInstance(options); // Fix here
//       // @ts-ignore
//       const paymentObject = window.Razorpay(options); // Fix here
//       paymentObject.open();

//       paymentObject.on("payment.failed", function (response) {
//         toast.error(
//           "Payment failed. Please try again. Contact support for help"
//         );
//       });
//     } catch (error) {
//       // Handle any errors that occur during the payment process
//       console.error("Payment error:", error);
//       // Show an error message to the user
//       toast.error("An error occurred during payment. Please try again later.");
//     }
//   };

//   const handleSubmit = async (values: CheckOutFormValues) => {
//     console.log(form.getValues());

//     try {
//       //   setLoading(true);

//       const response = await axios.post(`/api/website/product`, values);
//       toast.success("Product Added Successfully");
//       router.push(`/admin/website/product/${response.data.id}`);
//     } catch (error: any) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };
//   return (
//     <div>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(handleSubmit)}
//           className="space-y-4 w-full"
//         >
//           <div className="md:grid gap-8">
//             <FormField
//               control={form.control}
//               name="billing_address_1"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Billing Address 1</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={loading}
//                       placeholder="Billing Address 1"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="md:grid gap-8">
//             <FormField
//               control={form.control}
//               name="billing_address_2"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Billing Address 2</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={loading}
//                       placeholder="Billing Address 2"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="md:grid gap-8">
//             <FormField
//               control={form.control}
//               name="billing_city"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>City</FormLabel>
//                   <FormControl>
//                     <Input disabled={loading} placeholder="City" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="md:grid gap-8">
//             <FormField
//               control={form.control}
//               name="billing_pincode"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Pincode</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={loading}
//                       placeholder="Pincode"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="md:grid gap-8">
//             <FormField
//               control={form.control}
//               name="billing_state"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>State</FormLabel>
//                   <FormControl>
//                     <Input disabled={loading} placeholder="State" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="md:grid gap-8">
//             <FormField
//               control={form.control}
//               name="billing_country"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Country</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={loading}
//                       placeholder="Country"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="xl:w-1/3 xl:pl-12 w-full mt-7">
//             <div className="checkout-block bg-surface p-6 rounded-2xl">
//               <div className="heading">Order Summary</div>
//               <div className="list-price">
//                 <div className="item flex justify-between mt-5">
//                   <div className="name">Subtotal</div>
//                   <div className="value">&#8377;{subtotal.toFixed(2)}</div>
//                 </div>
//                 {/* <div className="item flex justify-between mt-3">
//                     <div className="name">Shipping</div>
//                     <select
//                       onChange={handleShippingChange}
//                       className="value"
//                       defaultValue={shipping}
//                     >
//                       <option value="0">Free</option>
//                       <option value="5">Standard: &#8377;5.00</option>
//                       <option value="10">Express: &#8377;10.00</option>
//                     </select>
//                   </div>
//                   <div className="item flex justify-between mt-3">
//                     <div className="name">Discount</div>
//                     <div className="value">-&#8377;{discount.toFixed(2)}</div>
//                   </div> */}
//               </div>
//               <div className="item flex justify-between mt-3">
//                 <div className="name">Total</div>
//                 <div className="value">&#8377;{total.toFixed(2)}</div>
//               </div>
//               <Button
//                 onClick={() => handleCheckout(total)}
//                 className=" w-full mt-5"
//               >
//                 Checkout
//               </Button>
//               {paymentError && (
//                 <div className="text-red-500 mt-3">{paymentError}</div>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <div className="flex gap-2">
//               <Button
//                 disabled={loading}
//                 className="ml-auto"
//                 type="submit"
//                 variant={"success"}
//               >
//                 Pay Now
//               </Button>
//             </div>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }

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

const formSchema = z.object({
  billing_address_1: z.string().min(2, "It is required"),
  billing_address_2: z.string().min(2, "It is required"),
  billing_city: z.string().min(2, "It is required"),
  billing_pincode: z.string().min(2, "It is required"),
  billing_state: z.string().min(2, "It is required"),
  billing_country: z.string().min(2, "It is required"),
});

type CheckOutFormValues = z.infer<typeof formSchema>;

export default function CheckOutForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [cartProducts, setCartProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentError, setPaymentError] = useState("");

  const userId = cookieHandler.get("userId");

  useEffect(() => {
    const fetchCartProducts = async () => {
      const productRes = await fetch(`/api/cart/${userId}`);
      const products = await productRes.json();
      setCartProducts(products);

      const initialQuantities = {};
      products.forEach((product) => {
        initialQuantities[product.id] = product.quantity;
      });
      setQuantities(initialQuantities);

      calculateTotals(products, initialQuantities);
    };
    fetchCartProducts();
  }, [userId]);

  const calculateTotals = (products, quantities) => {
    const subtotal = products.reduce((acc, product) => {
      return acc + product.price * (quantities[product.id] || 1);
    }, 0);

    setSubtotal(subtotal);
    setTotal(subtotal + shipping - discount);
  };

  const form = useForm<CheckOutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billing_address_1: "",
      billing_address_2: "",
      billing_city: "",
      billing_pincode: "",
      billing_state: "",
      billing_country: "",
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
              userId: userId,
            }),
          });

          const res = await data.json();

          if (res.data) {
            toast.success("Thank You");
            setCartProducts([]);
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

  const handleSubmit = async (values: CheckOutFormValues) => {

        console.log({values, userName: user})
    // try {
    // //   const response = await axios.post(`/api/website/product`, values);
    // //   toast.success("Product Added Successfully");
    // //   router.push(`/admin/website/product/${response.data.id}`);
    // } catch (error: any) {
    //   console.log(error);
    //   toast.error("Something went wrong");
    // }
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
              name="billing_address_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Address 1</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billing Address 1"
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
                onClick={() => handleCheckout(total)}
                className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Checkout
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
