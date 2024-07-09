import Link from "next/link";
import React from "react";

export default function LinkComponent({ link, children }) {
  return <Link href={link}>{children}</Link>;
}
