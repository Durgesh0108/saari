import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/Provider/theme-provider";
import { ToastProvider } from "@/Provider/toast-provider";
import { ModalProvider } from "@/Provider/modal-provider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Probiz5",
  description: "Created By Durgesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="assets/css/swiper-bundle.min.css" />
          <link rel="stylesheet" href="assets/css/style.css" />
          <link rel="stylesheet" href="dist/output-scss.css" />
          <link rel="stylesheet" href="dist/output-tailwind.css" />
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Script src="assets/js/phosphor-icons.js" />
      <Script src="assets/js/swiper-bundle.min.js" />
      <Script src="assets/js/main.js" />
      <Script
        crossOrigin="anonymous"
        src="https://unpkg.com/universal-cookie@7/umd/universalCookie.min.js"
      />
    </>
  );
}
