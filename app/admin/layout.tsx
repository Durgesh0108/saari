// "use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidebar";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Probiz5",
};

interface layoutProps {
  children: React.ReactNode;
}

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  // const [token, setToken] = useState<string | null>();

  // useEffect(() => {
  //   const token = localStorage.getItem("token" || null);
  //   setToken(token);
  // }, []);

  // const role = localStorage.getItem("role");

  let admin = true;
  // if (role !== "admin") {
  //   admin = false;
  //   router.push("/admin/authentication/login");
  // }

  return (
    // <Provider store={store}>
    <div className="flex">
      <div className="bg-[#222b40]  overflow-auto h-screen">
        <Sidebar />
      </div>
      <div
        className={cn(
          "py-16 px-8 md:px-16 w-full md:mt-0  ml-0 mt-14 bg-[#ebe7de] dark:bg-gray-900 dark:text-white overflow-auto h-screen",
          admin && "md:ml-64"
        )}
      >
        {children}
      </div>
    </div>
    // </Provider>
  );
}
