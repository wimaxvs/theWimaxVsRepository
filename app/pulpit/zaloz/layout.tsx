import Link from "next/link";
import { Inter } from "next/font/google";

interface ZalozlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Wimax: Załóż firmę",
  description: "Pulpit Załóżenia firmą",
};

const font = Inter({
  subsets: ["latin"],
});

export default async function Zaloz({ children }: ZalozlayoutProps) {
  return <></>;
}
