import getCurrentDriver from "@/app/actions/getCurrentDriver";
import { notFound } from "next/navigation";

interface PracownicylayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "POLMAX: Pracownicy",
  description: "Zarządzaj swoimi zasobami ludzkimi",
};


export default async function Pracownicy({ children }: PracownicylayoutProps) {
  let currentDriver = await getCurrentDriver();

  if (!currentDriver || currentDriver?.role !== "ZARZAD") {
    return notFound();
  }

  return <>{children}</>;
}
