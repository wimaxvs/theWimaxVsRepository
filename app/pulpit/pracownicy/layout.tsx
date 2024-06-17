import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { notFound } from "next/navigation";
import Loading from "@/app/loading";
import { Suspense } from "react";

interface PracownicylayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Wimax: Pracownicy",
  description: "Zarządzaj swoimi zasobami ludzkimi",
};

export default async function Pracownicy({ children }: PracownicylayoutProps) {
  let currentDriver = await getCurrentDriver();

  if (!currentDriver || currentDriver?.role !== "ZARZAD") {
    return notFound();
  }

  return (
    <>
      {children}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
