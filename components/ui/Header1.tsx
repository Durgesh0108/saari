import React from "react";

import { Nunito_Sans } from "next/font/google";
const nunito = Nunito_Sans({ subsets: ["latin"] });

export default function Header1({ children }) {
  return (
    <div
      className={`font-medium text-[#afafaf] text-lg md:text-2xl uppercase ${nunito.className}`}
    >
      {children}
    </div>
  );
}
