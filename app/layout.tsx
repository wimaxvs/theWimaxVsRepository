import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Metadata } from "next";
import Loading from "./loading";
import ToasterProvider from "./providers/ToasterProvider";

export const metadata: Metadata = {
  title: "Wimax",
  description: "Euro Truck Simulator 2 Company Management Portal",
  icons: { icon: ["/images/favicon.ico"], apple: ["/images/LogoCutB.webp"] },
};

const font = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <head>
        <link rel="icon" href="favicon.ico" />
      </head> */}
      <body className={`${font.className} overflow-y-auto h-full`}>
        <ToasterProvider />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
