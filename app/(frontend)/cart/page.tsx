// // @ts-nocheck

// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// // import "@/public/dist/output-tailwind.css";

// import image from "@/public/assets/images/product/fashion/2-1.png";
// import { cookieHandler } from "@/lib/cookieHandler";

// export default function CartPage() {
//   const [cartProducts, setcartProducts] = useState([]);

//   const userId = cookieHandler.get("userId");

//   useEffect(() => {
//     const fetchcartProducts = async () => {
//       const productRes = await fetch(`/api/cart/${userId}`);
//       const product = await productRes.json();
//       setcartProducts(product);
//     };

//     fetchcartProducts();
//   }, []);

//   console.log({ cartProducts });
//   return (
//     <div>
//       <div className="cart-block mb-10">
//         <div className="container">
//           <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
//             <div className="xl:w-2/3 xl:pr-3 w-full">
//               <div className="list-product w-full sm:mt-7 mt-5">
//                 <div className="w-full">
//                   <div className="heading bg-surface bora-4 pt-4 pb-4">
//                     <div className="flex">
//                       <div className="w-1/2">
//                         <div className="text-button text-center">Products</div>
//                       </div>
//                       <div className="w-1/12">
//                         <div className="text-button text-center">Price</div>
//                       </div>
//                       <div className="w-1/6">
//                         <div className="text-button text-center">Quantity</div>
//                       </div>
//                       <div className="w-1/6">
//                         <div className="text-button text-center">
//                           Total Price
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="list-product-main w-full mt-3">
//                     {cartProducts.map((product, index) => (
//                       <div
//                         key={index}
//                         className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full"
//                       >
//                         <div className="w-1/2">
//                           <div className="flex items-center gap-6">
//                             <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
//                               <Image
//                                 src={product?.images[0]?.url}
//                                 alt="img"
//                                 width={1000}
//                                 height={1}
//                                 className="w-full h-full object-cover rounded-lg"
//                               />
//                             </div>
//                             <div>
//                               <div className="text-title">{product?.name}</div>
//                               <div className="list-select mt-3" />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="w-1/12 price flex items-center justify-center">
//                           <div className="text-title text-center">
//                             {product.price}
//                           </div>
//                         </div>
//                         <div className="w-1/6 flex items-center justify-center">
//                           <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
//                             <i className="ph-bold ph-minus cursor-pointer text-base max-md:text-sm" />
//                             <div className="text-button quantity">1</div>
//                             <i className="ph-bold ph-plus cursor-pointer text-base max-md:text-sm" />
//                           </div>
//                         </div>
//                         <div className="w-1/6 flex total-price items-center justify-center">
//                           <div className="text-title text-center">$28.00</div>
//                         </div>
//                         <div className="w-1/12 flex items-center justify-center">
//                           <i className="remove-btn ph ph-x-circle text-xl max-md:text-base text-red cursor-pointer hover:text-black duration-300" />
//                         </div>
//                       </div>
//                     ))}
//                     {/* <div
//                       data-item={2}
//                       className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full"
//                     >
//                       <div className="w-1/2">
//                         <div className="flex items-center gap-6">
//                           <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
//                             <Image
//                               src={image}
//                               alt="img"
//                               className="w-full h-full object-cover rounded-lg"
//                             />
//                           </div>
//                           <div>
//                             <div className="text-title">
//                               Raglan Sleeve T-shirt
//                             </div>
//                             <div className="list-select mt-3" />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="w-1/12 price flex items-center justify-center">
//                         <div className="text-title text-center">$28.00</div>
//                       </div>
//                       <div className="w-1/6 flex items-center justify-center">
//                         <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
//                           <i className="ph-bold ph-minus cursor-pointer text-base max-md:text-sm" />
//                           <div className="text-button quantity">1</div>
//                           <i className="ph-bold ph-plus cursor-pointer text-base max-md:text-sm" />
//                         </div>
//                       </div>
//                       <div className="w-1/6 flex total-price items-center justify-center">
//                         <div className="text-title text-center">$28.00</div>
//                       </div>
//                       <div className="w-1/12 flex items-center justify-center">
//                         <i className="remove-btn ph ph-x-circle text-xl max-md:text-base text-red cursor-pointer hover:text-black duration-300" />
//                       </div>
//                     </div> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="xl:w-1/3 xl:pl-12 w-full mt-7">
//               <div className="checkout-block bg-surface p-6 rounded-2xl">
//                 <div className="heading5">Order Summary</div>
//                 <div className="total-block py-5 flex justify-between border-b border-line">
//                   <div className="text-title">Subtotal</div>
//                   <div className="text-title">
//                     $<span className="total-product">136</span>
//                     <span>.00</span>
//                   </div>
//                 </div>
//                 <div className="discount-block py-5 flex justify-between border-b border-line">
//                   <div className="text-title">Discounts</div>
//                   <div className="text-title">
//                     {" "}
//                     <span>-$</span>
//                     <span className="discount">0</span>
//                     <span>.00</span>
//                   </div>
//                 </div>
//                 <div className="ship-block py-5 flex justify-between border-b border-line">
//                   <div className="text-title">Shipping</div>
//                   <div className="choose-type flex gap-12">
//                     <div className="left">
//                       <div className="type">
//                         <input id="shipping" type="radio" name="ship" />
//                         <label className="pl-1" htmlFor="shipping">
//                           Free Shipping:
//                         </label>
//                       </div>
//                       <div className="type mt-1">
//                         <input
//                           id="local"
//                           type="radio"
//                           name="ship"
//                           defaultValue="{30}"
//                         />
//                         <label
//                           className="text-on-surface-variant1 pl-1"
//                           htmlFor="local"
//                         >
//                           Local:
//                         </label>
//                       </div>
//                       <div className="type mt-1">
//                         <input
//                           id="flat"
//                           type="radio"
//                           name="ship"
//                           defaultValue="{40}"
//                         />
//                         <label
//                           className="text-on-surface-variant1 pl-1"
//                           htmlFor="flat"
//                         >
//                           Flat Rate:
//                         </label>
//                       </div>
//                     </div>
//                     <div className="right">
//                       <div className="ship">$0.00</div>
//                       <div className="local text-on-surface-variant1 mt-1">
//                         $30.00
//                       </div>
//                       <div className="flat text-on-surface-variant1 mt-1">
//                         $40.00
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="total-cart-block pt-4 pb-4 flex justify-between">
//                   <div className="heading5">Total</div>
//                   <div className="">
//                     <span className="heading5">$</span>
//                     <span className="total-cart heading5">116</span>
//                     <span className="heading5">.00</span>
//                   </div>
//                 </div>
//                 <div className="block-button flex flex-col items-center gap-y-4 mt-5">
//                   <a
//                     href="checkout.html"
//                     className="checkout-btn button-main text-center w-full"
//                   >
//                     Process To Checkout
//                   </a>
//                   <a
//                     className="text-button hover-underline"
//                     href="/shop-breadcrumb1.html"
//                   >
//                     Continue shopping
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// *****************************************************

// // @ts-nocheck

// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// // import "@/public/dist/output-tailwind.css";

// import { cookieHandler } from "@/lib/cookieHandler";

// export default function CartPage() {
//   const [cartProducts, setCartProducts] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [subtotal, setSubtotal] = useState(0);
//   const [shipping, setShipping] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [total, setTotal] = useState(0);

//   const userId = cookieHandler.get("userId");

//   useEffect(() => {
//     const fetchCartProducts = async () => {
//       const productRes = await fetch(`/api/cart/${userId}`);
//       const products = await productRes.json();
//       setCartProducts(products);

//       // Initialize quantities
//       const initialQuantities = {};
//       products.forEach((product) => {
//         initialQuantities[product.id] = 1; // Default quantity is 1
//       });
//       setQuantities(initialQuantities);
//       calculateTotals(products, initialQuantities);
//     };

//     fetchCartProducts();
//   }, []);

//   const calculateTotals = (products, quantities) => {
//     const subtotal = products.reduce((acc, product) => {
//       return acc + product.price * (quantities[product.id] || 1);
//     }, 0);

//     setSubtotal(subtotal);
//     setTotal(subtotal + shipping - discount);
//   };

//   const handleQuantityChange = async (productId, amount) => {
//     const newQuantity = Math.max(1, (quantities[productId] || 1) + amount);

//     try {
//       const response = await fetch(`/api/cart/${userId}/product/${productId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ quantity: newQuantity }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update quantity in the cart");
//       }

//       setQuantities((prevQuantities) => ({
//         ...prevQuantities,
//         [productId]: newQuantity,
//       }));

//       // Calculate totals
//       calculateTotals(cartProducts, {
//         ...quantities,
//         [productId]: newQuantity,
//       });
//     } catch (error) {
//       console.error("Error updating quantity in the cart:", error);
//     }
//   };

//   const handleShippingChange = (event) => {
//     const value = parseInt(event.target.value, 10);
//     setShipping(value);
//     setTotal(subtotal + value - discount);
//   };

//   const handleRemoveProduct = async (productId) => {
//     try {
//       const response = await fetch(`/api/cart/${userId}/product/${productId}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to remove product from cart");
//       }

//       const newCartProducts = cartProducts.filter(
//         (product) => product.id !== productId
//       );
//       setCartProducts(newCartProducts);

//       const newQuantities = { ...quantities };
//       delete newQuantities[productId];
//       setQuantities(newQuantities);

//       calculateTotals(newCartProducts, newQuantities);
//     } catch (error) {
//       console.error("Error removing product from cart:", error);
//     }
//   };

//   const handleCheckout = async () => {
//     try {
//       const response = await fetch('/api/razorpay/order', {
//         method: 'POST',
//         body: JSON.stringify({ amount: calculateTotalAmount(cartProducts) }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();

//       const options = {
//         key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay API key
//         amount: data.amount,
//         currency: 'INR',
//         name: 'Your Company Name',
//         description: 'Payment for your order',
//         order_id: data.id,
//         handler: function (response) {
//           // Send confirmation to backend upon successful payment
//           fetch('/api/razorpay/success', {
//             method: 'POST',
//             body: JSON.stringify({
//               orderId: response.razorpay_order_id,
//               paymentId: response.razorpay_payment_id,
//               signature: response.razorpay_signature,
//               amount: data.amount,
//             }),
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }).then(() => {
//             // Redirect to a thank you page or show a success message
//             router.push('/thank-you');
//           });
//         },
//         prefill: {
//           email: 'user@example.com',
//           contact: '9999999999',
//         },
//         notes: {
//           address: 'Razorpay Corporate Office',
//         },
//       };
//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error('Error during checkout:', error);
//       setPaymentError('Error during checkout. Please try again later.');
//     }
//   };

//   const [orderId, setOrderId] = useState("");

//   useEffect(() => {
//     const initiatePayment = async () => {
//       try {
//         const response = await fetch("/api/razorpay/order", {
//           method: "POST",
//           body: JSON.stringify({
//             amount: totalAmount, // Calculate total amount to be paid
//           }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const data = await response.json();
//         const options = {
//           key: "rzp_test_YZpzzVOx04hiuJ", // Replace with your Razorpay API key
//           amount: data.amount,
//           currency: "INR",
//           name: "Your Company Name",
//           description: "Payment for your order",
//           order_id: data.id,
//           handler: function (response) {
//             // Handle successful payment
//             // Send payment confirmation to backend
//             confirmPayment(response);
//           },
//           prefill: {
//             email: "user@example.com", // Pre-fill user's email
//             contact: "9999999999", // Pre-fill user's contact number
//           },
//           notes: {
//             address: "Razorpay Corporate Office",
//           },
//         };
//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//       } catch (error) {
//         console.error("Error initiating payment:", error);
//       }
//     };

//     initiatePayment();
//   }, []);

//   const confirmPayment = async (response) => {
//     try {
//       const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//         response;
//       const paymentData = {
//         orderId: razorpay_order_id,
//         paymentId: razorpay_payment_id,
//         signature: razorpay_signature,
//         amount: totalAmount, // Total amount paid
//       };
//       const response = await fetch("/api/razorpay/success", {
//         method: "POST",
//         body: JSON.stringify(paymentData),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       // Redirect to thank you page or handle success
//     } catch (error) {
//       console.error("Error confirming payment:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="cart-block mb-10">
//         <div className="container">
//           <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
//             <div className="xl:w-2/3 xl:pr-3 w-full">
//               <div className="list-product w-full sm:mt-7 mt-5">
//                 <div className="w-full">
//                   <div className="heading bg-surface bora-4 pt-4 pb-4">
//                     <div className="flex">
//                       <div className="w-1/2">
//                         <div className="text-button text-center">Products</div>
//                       </div>
//                       <div className="w-1/12">
//                         <div className="text-button text-center">Price</div>
//                       </div>
//                       <div className="w-1/6">
//                         <div className="text-button text-center">Quantity</div>
//                       </div>
//                       <div className="w-1/6">
//                         <div className="text-button text-center">
//                           Total Price
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="list-product-main w-full mt-3">
//                     {cartProducts.map((product, index) => (
//                       <div
//                         key={index}
//                         className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full"
//                       >
//                         <div className="w-1/2">
//                           <div className="flex items-center gap-6">
//                             <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
//                               <Image
//                                 src={product?.images[0]?.url}
//                                 alt="img"
//                                 width={1000}
//                                 height={1}
//                                 className="w-full h-full object-cover rounded-lg"
//                               />
//                             </div>
//                             <div>
//                               <div className="text-title">{product?.name}</div>
//                               <div className="list-select mt-3" />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="w-1/12 price flex items-center justify-center">
//                           <div className="text-title text-center">
//                             ${product.price}
//                           </div>
//                         </div>
//                         <div className="w-1/6 flex items-center justify-center">
//                           <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
//                             <i
//                               className="ph-bold ph-minus cursor-pointer text-base max-md:text-sm"
//                               onClick={() =>
//                                 handleQuantityChange(product.id, -1)
//                               }
//                             />
//                             <div className="text-button quantity">
//                               {quantities[product.id]}
//                             </div>
//                             <i
//                               className="ph-bold ph-plus cursor-pointer text-base max-md:text-sm"
//                               onClick={() =>
//                                 handleQuantityChange(product.id, 1)
//                               }
//                             />
//                           </div>
//                         </div>
//                         <div className="w-1/6 flex total-price items-center justify-center">
//                           <div className="text-title text-center">
//                             $
//                             {(product.price * quantities[product.id]).toFixed(
//                               2
//                             )}
//                           </div>
//                         </div>
//                         <div className="w-1/12 flex items-center justify-center">
//                           <i
//                             onClick={() => handleRemoveProduct(product.id)}
//                             className="remove-btn ph ph-x-circle text-xl max-md:text-base text-red cursor-pointer hover:text-black duration-300"
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="xl:w-1/3 xl:pl-12 w-full mt-7">
//               <div className="checkout-block bg-surface p-6 rounded-2xl">
//                 <div className="heading5">Order Summary</div>
//                 <div className="total-block py-5 flex justify-between border-b border-line">
//                   <div className="text-title">Subtotal</div>
//                   <div className="text-title">${subtotal.toFixed(2)}</div>
//                 </div>
//                 <div className="discount-block py-5 flex justify-between border-b border-line">
//                   <div className="text-title">Discounts</div>
//                   <div className="text-title">-${discount.toFixed(2)}</div>
//                 </div>
//                 <div className="ship-block py-5 flex justify-between border-b border-line">
//                   <div className="text-title">Shipping</div>
//                   <div className="choose-type flex gap-12">
//                     <div className="left">
//                       <div className="type">
//                         <input
//                           id="shipping"
//                           type="radio"
//                           name="ship"
//                           value={0}
//                           checked={shipping === 0}
//                           onChange={handleShippingChange}
//                         />
//                         <label className="pl-1" htmlFor="shipping">
//                           Free Shipping:
//                         </label>
//                       </div>
//                       <div className="type mt-1">
//                         <input
//                           id="local"
//                           type="radio"
//                           name="ship"
//                           value={30}
//                           checked={shipping === 30}
//                           onChange={handleShippingChange}
//                         />
//                         <label
//                           className="text-on-surface-variant1 pl-1"
//                           htmlFor="local"
//                         >
//                           Local:
//                         </label>
//                       </div>
//                       <div className="type mt-1">
//                         <input
//                           id="flat"
//                           type="radio"
//                           name="ship"
//                           value={40}
//                           checked={shipping === 40}
//                           onChange={handleShippingChange}
//                         />
//                         <label
//                           className="text-on-surface-variant1 pl-1"
//                           htmlFor="flat"
//                         >
//                           Flat Rate:
//                         </label>
//                       </div>
//                     </div>
//                     <div className="right">
//                       <div className="ship">$0.00</div>
//                       <div className="local text-on-surface-variant1 mt-1">
//                         $30.00
//                       </div>
//                       <div className="flat text-on-surface-variant1 mt-1">
//                         $40.00
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="total-cart-block pt-4 pb-4 flex justify-between">
//                   <div className="heading5">Total</div>
//                   <div className="">
//                     <span className="heading5">$</span>
//                     <span className="total-cart heading5">
//                       {total.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="block-button flex flex-col items-center gap-y-4 mt-5">
//                   <button
//                     href="checkout.html"
//                     className="checkout-btn button-main text-center w-full"
//                   >
//                     Process To Checkout
//                   </button>
//                   <a
//                     className="text-button hover-underline"
//                     href="/shop-breadcrumb1.html"
//                   >
//                     Continue shopping
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ******************************************************

// @ts-nocheck

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
// import "@/public/dist/output-tailwind.css";
import { cookieHandler } from "@/lib/cookieHandler";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

export default function CartPage() {
  const [cartProducts, setCartProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentError, setPaymentError] = useState("");

  const userId = cookieHandler.get("userId");
  const router = useRouter();

  useEffect(() => {
    const fetchCartProducts = async () => {
      const productRes = await fetch(`/api/cart/${userId}`);
      const products = await productRes.json();
      setCartProducts(products);

      // Initialize quantities
      const initialQuantities = {};
      products.forEach((product) => {
        initialQuantities[product.id] = 1; // Default quantity is 1
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

  const handleQuantityChange = async (productId, amount) => {
    const newQuantity = Math.max(1, (quantities[productId] || 1) + amount);

    try {
      const response = await fetch(`/api/cart/${userId}/product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity in the cart");
      }

      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: newQuantity,
      }));

      // Calculate totals
      calculateTotals(cartProducts, {
        ...quantities,
        [productId]: newQuantity,
      });
    } catch (error) {
      console.error("Error updating quantity in the cart:", error);
    }
  };

  const handleShippingChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setShipping(value);
    setTotal(subtotal + value - discount);
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch(`/api/cart/${userId}/product/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove product from cart");
      }

      const newCartProducts = cartProducts.filter(
        (product) => product.id !== productId
      );
      setCartProducts(newCartProducts);

      const newQuantities = { ...quantities };
      delete newQuantities[productId];
      setQuantities(newQuantities);

      calculateTotals(newCartProducts, newQuantities);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleCheckout = async (amount: number) => {
    try {
      console.log(amount);
      const order = await axios.post("/api/razorpay/checkout", {
        amount,
      });

      console.log(order);

      const options = {
        key: "rzp_test_YZpzzVOx04hiuJ",
        name: "Probiz5",
        currency: order.data.currency, // Fix typo here
        amount: order.data.amount,
        order_id: order.data.id,
        description: "Understanding RazorPay Integration",
        image:
          "https://res.cloudinary.com/dttieobbt/image/upload/v1714651240/Probiz5_fevicon_01_dwtfxa.png",
        // "https://res.cloudinary.com/dttieobbt/image/upload/v1711453976/flf6aizdhi9m8asgtjmg.png",

        //   @ts-ignore
        handler: async function (response) {
          // if (response.length==0) return <Loading/>;
          console.log({ response });

          const data = await fetch("/api/razorpay/paymentVerification", {
            method: "POST",
            // headers: {
            //   // Authorization: 'YOUR_AUTH_HERE'
            // },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              userId: userId,
            }),
          });

          const res = await data.json();

          console.log(res);

          if (res.data) {
            toast.success("Thank You");
            setCartProducts([]);
            // await handleSubmit(form.getValues(), extra);
          } else {
            toast.error("Payment Failed");
          }
          // console.log("response verify==", res);
          // Validate payment at server - using webhooks is a better idea.
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
        },
        // prefill: {
        //   name: "Durgesh Prajapati",
        //   email: "prajapatidurgesh1518@gmail.com",
        //   contact: "9653320535",
        // },
      };

      // const paymentObject = new razorpayInstance(options); // Fix here
      // @ts-ignore
      const paymentObject = window.Razorpay(options); // Fix here
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        toast.error(
          "Payment failed. Please try again. Contact support for help"
        );
      });
    } catch (error) {
      // Handle any errors that occur during the payment process
      console.error("Payment error:", error);
      // Show an error message to the user
      toast.error("An error occurred during payment. Please try again later.");
    }
  };

  // const handleSubmit = async (extra) => {
  //   try {
  //     setLoading(true);
  //     const data = {
  //       ...values,
  //       userId,
  //       ...extra,
  //     };
  //     await axios.post(`/api/advertisement`, data);
  //     location.reload();
  //     toast.success("Advertisement Added Successfully");
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error("Something went wrong.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
      <div className="cart-block mb-10">
        <div className="container">
          <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
            <div className="xl:w-2/3 xl:pr-3 w-full">
              <div className="list-product w-full sm:mt-7 mt-5">
                <div className="w-full">
                  <div className="heading bg-surface bora-4 pt-4 pb-4">
                    <div className="flex">
                      <div className="w-1/2">
                        <div className="text-button text-center">Products</div>
                      </div>
                      <div className="w-1/12">
                        <div className="text-button text-center">Price</div>
                      </div>
                      <div className="w-1/6">
                        <div className="text-button text-center">Quantity</div>
                      </div>
                      <div className="w-1/6">
                        <div className="text-button text-center">
                          Total Price
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list-product-main w-full mt-3">
                    {cartProducts.map((product, index) => (
                      <div
                        key={index}
                        className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full"
                      >
                        <div className="w-1/2">
                          <div className="flex items-center gap-6">
                            <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
                              <Image
                                src={product?.images[0]?.url}
                                alt="img"
                                width={1000}
                                height={1}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                            <div>
                              <div className="text-title">{product?.name}</div>
                              <div className="list-select mt-3" />
                            </div>
                          </div>
                        </div>
                        <div className="w-1/12 price flex items-center justify-center">
                          <div className="text-title text-center">
                            ${product.price}
                          </div>
                        </div>
                        <div className="w-1/6 flex items-center justify-center">
                          <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
                            <i
                              className="ph-bold ph-minus cursor-pointer text-base max-md:text-sm"
                              onClick={() =>
                                handleQuantityChange(product.id, -1)
                              }
                            />
                            <div className="text-button quantity">
                              {quantities[product.id]}
                            </div>
                            <i
                              className="ph-bold ph-plus cursor-pointer text-base max-md:text-sm"
                              onClick={() =>
                                handleQuantityChange(product.id, 1)
                              }
                            />
                          </div>
                        </div>
                        <div className="w-1/6 flex total-price items-center justify-center">
                          <div className="text-title text-center">
                            $
                            {(product.price * quantities[product.id]).toFixed(
                              2
                            )}
                          </div>
                        </div>
                        <div className="w-1/12 flex items-center justify-center">
                          <i
                            onClick={() => handleRemoveProduct(product.id)}
                            className="remove-btn ph ph-x-circle text-xl max-md:text-base text-red cursor-pointer hover:text-black duration-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:w-1/3 xl:pl-12 w-full mt-7">
              <div className="checkout-block bg-surface p-6 rounded-2xl">
                <div className="heading">Order Summary</div>
                <div className="list-price">
                  <div className="item flex justify-between mt-5">
                    <div className="name">Subtotal</div>
                    <div className="value">${subtotal.toFixed(2)}</div>
                  </div>
                  {/* <div className="item flex justify-between mt-3">
                    <div className="name">Shipping</div>
                    <select
                      onChange={handleShippingChange}
                      className="value"
                      defaultValue={shipping}
                    >
                      <option value="0">Free</option>
                      <option value="5">Standard: $5.00</option>
                      <option value="10">Express: $10.00</option>
                    </select>
                  </div>
                  <div className="item flex justify-between mt-3">
                    <div className="name">Discount</div>
                    <div className="value">-${discount.toFixed(2)}</div>
                  </div> */}
                </div>
                <div className="item flex justify-between mt-3">
                  <div className="name">Total</div>
                  <div className="value">${total.toFixed(2)}</div>
                </div>
                <Button
                  onClick={() => handleCheckout(total)}
                  className=" w-full mt-5"
                >
                  Checkout
                </Button>
                {paymentError && (
                  <div className="text-red-500 mt-3">{paymentError}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// const handleCheckout = async () => {
//   try {
//     const response = await fetch("/api/razorpay/order", {
//       method: "POST",
//       body: JSON.stringify({ amount: total }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await response.json();

//     const options = {
//       key: "rzp_test_YZpzzVOx04hiuJ", // Replace with your Razorpay API key
//       amount: data.amount,
//       currency: "INR",
//       name: "Saari Waali",
//       description: "Payment for your order",
//       order_id: data.id,
//       handler: function (response) {
//         // Send confirmation to backend upon successful payment
//         fetch("/api/razorpay/success", {
//           method: "POST",
//           body: JSON.stringify({
//             userId: userId,
//             orderId: response.razorpay_order_id,
//             paymentId: response.razorpay_payment_id,
//             signature: response.razorpay_signature,
//             amount: data.amount * 100,
//           }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }).then(() => {
//           // Redirect to a thank you page or show a success message
//           router.push("/thank-you");
//         });
//       },
//       prefill: {
//         email: "user@example.com",
//         contact: "9999999999",
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//       },
//     };
//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   } catch (error) {
//     console.error("Error during checkout:", error);
//     setPaymentError("Error during checkout. Please try again later.");
//   }
// };
