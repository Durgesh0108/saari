import React from "react";

export default function Header({ children }: { children: React.ReactNode }) {
  return <div className={`text-2xl `}>{children}</div>;
}
