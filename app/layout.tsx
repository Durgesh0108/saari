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
          <link rel="stylesheet" href="assets/css/swiper-bundle.min.css" />
          <link rel="stylesheet" href="assets/css/style.css" />
          <link rel="stylesheet" href="dist/output-scss.css" />

          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          ></link> */}

          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
            rel="stylesheet"
          /> */}
          
        </head>
        <body className={`${playfair.className} no-scrollbar`}>
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
