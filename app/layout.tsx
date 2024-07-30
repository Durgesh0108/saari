import type { Metadata } from "next";
import { Playfair } from "next/font/google";
import { Hind } from "next/font/google";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/Provider/theme-provider";
import { ToastProvider } from "@/Provider/toast-provider";
import { ModalProvider } from "@/Provider/modal-provider";
import Script from "next/script";
import { cn } from "@/lib/utils";

const playfair = Playfair({ subsets: ["latin"] });
const nunito = Nunito_Sans({ subsets: ["latin"] });
// const inter = Hind({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saari Waali",
  description: "Best Saari Brand",
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
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
          />
        </head>
        {/* <body className={`${playfair.className} no-scrollbar`}> */}
        <body className={`no-scrollbar`}>
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
      <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" />
      <Script
        crossOrigin="anonymous"
        src="https://unpkg.com/universal-cookie@7/umd/universalCookie.min.js"
      />
    </>
  );
}
