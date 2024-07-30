import { Rufina } from "next/font/google";
import React from "react";

const rufina = Rufina({ subsets: ["latin"], weight: ["400", "700"] });

export default function RufinaFont({ children, ...props }) {
  return (
    <div className={`${rufina.className}`} {...props}>
      {children}
    </div>
  );
}
