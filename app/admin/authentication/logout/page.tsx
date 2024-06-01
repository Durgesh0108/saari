"use client";

import { Button } from "@/components/ui/button";
import { cookieHandler } from "@/lib/cookieHandler";
import React from "react";

export default function LogoutPage() {
  const onLogout = () => {
    console.log("logged out");
    cookieHandler.remove("token");
  };
  return (
    <div>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
}
