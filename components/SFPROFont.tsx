import React from "react";

import "@/public/css/helvetica.css";

export default function SFPROFont({ children, ...props }) {
  return (
    <div
      className="sf-pro-font"
      //   style={{
      //     fontFamily: `"SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"`,
      //   }}
      {...props}
    >
      {children}
    </div>
  );
}
