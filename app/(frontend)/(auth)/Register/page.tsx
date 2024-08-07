// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { cookieHandler } from "@/lib/cookieHandler";

// const Page = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setphone] = useState("");

//   const URL = process.env.API_URL;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const data = {
//       role: "user",
//       email,
//       password,
//       name,
//       phone,
//     };

//     try {
//       const response = await axios.post(`/api/auth/register`, data);

//       const user = response.data.user;
//       if (response.data.token) {
//         cookieHandler.set("token", response.data.token);
//         cookieHandler.set("user", user.name);
//         cookieHandler.set("userId", user.id);
//         cookieHandler.set("role", user.role);
//         router.push("/");
//         toast.success("Registered Successfully");
//       } else {
//         toast.error(response.data);
//       }
//     } catch (error) {
//       console.error("Registration failed", error);
//     }
//   };
//   return (
//     <div>
//       <div className="breadcrumb-block style-shared">
//         <div className="breadcrumb-main bg-linear overflow-hidden">
//           <div className="container lg:pt-[35px] pb-10 relative">
//             <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
//               <div className="text-content">
//                 <div className="heading2 text-center">Register</div>
//                 <div className="link flex items-center justify-center gap-1 caption1 mt-3">
//                   <Link href="/">Homepage</Link>
//                   <i className="ph ph-caret-right text-sm text-secondary2" />
//                   <div className="text-secondary2 capitalize">Register</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="register-block md:py-20 py-10">
//         <div className="container">
//           <div className="content-main flex gap-y-8 max-md:flex-col">
//             <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
//               <div className="heading4">Register</div>
//               <form className="md:mt-7 mt-4" onSubmit={handleSubmit}>
//                 <div className="name ">
//                   <input
//                     className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
//                     id="username"
//                     type="text"
//                     placeholder="Name *"
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//                 <div className="email mt-5">
//                   <input
//                     className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
//                     id="username"
//                     type="email"
//                     placeholder="Email address *"
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="pass mt-5">
//                   <input
//                     className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
//                     id="password"
//                     type="password"
//                     placeholder="Password *"
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <div className="number mt-5">
//                   <input
//                     className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
//                     id="confirmPassword"
//                     type="number"
//                     placeholder="Phone Number *"
//                     onChange={(e) => setphone(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex items-center mt-5">
//                   <div className="block-input">
//                     <input type="checkbox" name="remember" id="remember" />
//                     <i className="ph-fill ph-check-square icon-checkbox text-xl" />
//                   </div>
//                   <label
//                     htmlFor="remember"
//                     className="pl-2 cursor-pointer text-secondary2"
//                   >
//                     I agree to the
//                     <a href="#!" className="text-black hover:underline pl-1">
//                       Terms of User
//                     </a>
//                   </label>
//                 </div>
//                 <div className="block-button md:mt-7 mt-4">
//                   <button className="button-main">Register</button>
//                 </div>
//               </form>
//             </div>
//             <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
//               <div className="text-content">
//                 <div className="heading4">Already have an account?</div>
//                 <div className="mt-2 text-secondary">
//                   Welcome back. Sign in to access your personalized experience,
//                   saved preferences, and more. We thrilled to have you with us
//                   again!
//                 </div>
//                 <div className="block-button md:mt-7 mt-4">
//                   <Link href="/Login" className="button-main">
//                     Login
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

// export default Page;

"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  phone: z.string().min(10, "Phone number must be at least 10 digits long"),
});

const RegisterPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
  });

  const handleSubmit = async (data: any) => {
    try {
      const response = await axios.post(`/api/auth/register`, {
        ...data,
        role: "user",
      });

      const user = response.data.user;
      if (response.data.token) {
        cookieHandler.set("token", response.data.token);
        cookieHandler.set("user", user.name);
        cookieHandler.set("userId", user.id);
        cookieHandler.set("role", user.role);
        router.push("/");
        toast.success("Registered Successfully");
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="breadcrumb-block style-shared">
        <div className="breadcrumb-main bg-linear overflow-hidden">
          <div className="container lg:pt-[35px] pb-10 relative">
            <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
              <div className="text-content">
                <div className="heading2 text-center">Register</div>
                <div className="link flex items-center justify-center gap-1 caption1 mt-3">
                  <Link href="/">Homepage</Link>
                  <i className="ph ph-caret-right text-sm text-secondary2" />
                  <div className="text-secondary2 capitalize">Register</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="register-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Register</div>
              <Form {...form}>
                <form
                  className="md:mt-7 mt-4 space-y-4"
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Name *" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Email address *"
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
                            {...field}
                            type="password"
                            placeholder="Password *"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Phone Number *"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center mt-5">
                    <div className="block-input">
                      <input type="checkbox" name="remember" id="remember" />
                      <i className="ph-fill ph-check-square icon-checkbox text-xl" />
                    </div>
                    <label
                      htmlFor="remember"
                      className="pl-2 cursor-pointer text-secondary2"
                    >
                      I agree to the
                      <a href="#!" className="text-black hover:underline pl-1">
                        Terms of User
                      </a>
                    </label>
                  </div>
                  <div className="block-button md:mt-7 mt-4">
                    <Button type="submit" className="button-main">
                      Register
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading4">Already have an account?</div>
                <div className="mt-2 ">
                  Welcome back. Sign in to access your personalized experience,
                  saved preferences, and more. We thrilled to have you with us
                  again!
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href="/Login" className="button-main">
                    Login
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

export default RegisterPage;
