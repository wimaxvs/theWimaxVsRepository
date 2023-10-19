import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import Loading from "./loading";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import Navbar from "./components/navbar/Navbar";

export const metadata = {
  title: "Wimax",
  description: "Euro Truck Simulator 2 Company Management Portal",
};

const font = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={`${font.className} overflow-y-auto h-full`}>
        <Navbar currentUser={currentUser} />

        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
