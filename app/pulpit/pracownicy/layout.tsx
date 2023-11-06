import Link from "next/link";
import { Inter } from "next/font/google";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { notFound } from "next/navigation";

interface PracownicylayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Wimax: Pulpit",
  description: "Pulpit systemu zarządzania firmą",
};

const font = Inter({
  subsets: ["latin"],
});

export default async function Pracownicy({ children }: PracownicylayoutProps) {
  let currentDriver = await getCurrentDriver();

  if (!currentDriver || currentDriver?.role !== "ZARZAD") {
    return notFound();
  }

  return <>{children}</>;
}
