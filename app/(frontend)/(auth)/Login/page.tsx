// "use client";

// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { cookieHandler } from "@/lib/cookieHandler";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters long"),
// });

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const router = useRouter();
//   const form = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const data = {
//       email,
//       password,
//     };

//     try {
//       const response = await axios.post(`/api/auth/login`, data);
//       const user = response.data.user;

//       // if (user.role === "admin") {
//       //   toast.error("You are Admin");
//       // } else
//       if (response.data.token) {
//         cookieHandler.set("token", response.data.token);
//         cookieHandler.set("user", user.name);
//         cookieHandler.set("userId", user.id);
//         cookieHandler.set("role", user.role);
//         router.push("/");
//         toast.success("Logged In Successfully");
//       } else {
//         toast.error(response.data);
//       }
//       //   window.location.reload();
//     } catch (error) {
//       toast.error("Error");
//       console.log("error", error);
//     }
//   };
//   return (
//     <div>
//       <div className="breadcrumb-block style-shared">
//         <div className="breadcrumb-main bg-linear overflow-hidden">
//           <div className="container lg:pt-[35px] pb-10 relative">
//             <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
//               <div className="text-content">
//                 <div className="heading2 text-center">Login</div>
//                 <div className="link flex items-center justify-center gap-1 caption1 mt-3">
//                   <Link href="/">Homepage</Link>
//                   <i className="ph ph-caret-right text-sm text-secondary2" />
//                   <div className="text-secondary2 capitalize">Login</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="login-block md:py-20 py-10">
//         <div className="container">
//           <div className="content-main flex gap-y-8 max-md:flex-col">
//             <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
//               <div className="heading4">Login</div>
//               <Form {...form}>
//                 <form
//                   onSubmit={form.handleSubmit(handleSubmit)}
//                   className="space-y-6"
//                 >
//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email address</FormLabel>
//                         <FormControl>
//                           <Input
//                             id="email"
//                             type="email"
//                             placeholder="name@company.com"
//                             autoComplete="email"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="password"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Password</FormLabel>
//                         <FormControl>
//                           <Input
//                             id="password"
//                             type="password"
//                             placeholder="*********"
//                             autoComplete="current-password"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <Button
//                     type="submit"
//                     variant="success"
//                     className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
//                   >
//                     Sign in
//                   </Button>
//                   <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                     Create an account?{" "}
//                     <Link
//                       href="/Register"
//                       className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                     >
//                       <Button className="" variant="outline">
//                         Register here
//                       </Button>
//                     </Link>
//                   </p>
//                 </form>
//               </Form>
//             </div>
//             <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
//               <div className="text-content">
//                 <div className="heading4">New Customer</div>
//                 <div className="mt-2 text-secondary text-black">
//                   Be part of our growing family of new customers! Join us today
//                   and unlock a world of exclusive benefits, offers, and
//                   personalized experiences.
//                 </div>
//                 <div className="block-button md:mt-7 mt-4">
//                   <Link href="/Register" className="button-main">
//                     Register
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { cookieHandler } from "@/lib/cookieHandler";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Login = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post(`/api/auth/login`, data);
      const user = response.data.user;

      if (response.data.token) {
        cookieHandler.set("token", response.data.token);
        cookieHandler.set("user", user.name);
        cookieHandler.set("userId", user.id);
        cookieHandler.set("role", user.role);
        router.push("/");
        toast.success("Logged In Successfully");
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error("Error logging in. Please try again.");
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="breadcrumb-block style-shared">
        <div className="breadcrumb-main bg-linear overflow-hidden">
          <div className="container lg:pt-[35px] pb-10 relative">
            <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
              <div className="text-content">
                <div className="heading2 text-center">Login</div>
                <div className="link flex items-center justify-center gap-1 caption1 mt-3">
                  <Link href="/">Homepage</Link>
                  <i className="ph ph-caret-right text-sm text-secondary2" />
                  <div className="text-secondary2 capitalize">Login</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="login-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Login</div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            placeholder="*********"
                            autoComplete="current-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    variant="success"
                    className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    Sign in
                  </Button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Create an account?{" "}
                    <Link
                      href="/Register"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Register here
                    </Link>
                  </p>
                </form>
              </Form>
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading4">New Customer</div>
                <div className="mt-2 text-black">
                  Be part of our growing family of new customers! Join us today
                  and unlock a world of exclusive benefits, offers, and
                  personalized experiences.
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href="/Register" className="button-main">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
