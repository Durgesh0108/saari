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
      <Script
        crossOrigin="anonymous"
        src="https://unpkg.com/universal-cookie@7/umd/universalCookie.min.js"
      />
    </>
  );
}
