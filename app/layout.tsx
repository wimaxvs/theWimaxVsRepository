import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Metadata } from "next";
import AppleIcon from "../public/images/logoCutB.png";
import Favicon from "./favicon.ico";
import Loading from "./loading";
import ToasterProvider from "./providers/ToasterProvider";

export const metadata: Metadata = {
  title: "Wimax",
  description: "Euro Truck Simulator 2 Company Management Portal",
  icons: { icon: ["/favicon.ico"], apple: ["/logoCutB.png"] },
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
