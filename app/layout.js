"use client";

import localFont from "next/font/local";
import "../public/globals.css";
import AsideMenu from "@/components/AsideMenu";
import { usePathname } from "next/navigation";

const geistMontserrat = localFont({
  src: "../public/fonts/Montserrat-Regular.ttf",
  variable: "--font-montserrat",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="es">
      <body
        className={`${geistMontserrat.variable} antialiased ${
          pathname !== "/" ? "flex" : ""
        }`}
      >
        {pathname !== "/" && <AsideMenu />}

        {children}
      </body>
    </html>
  );
}
