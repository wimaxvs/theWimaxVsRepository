import Loading from "@/app/loading";
import { Suspense } from "react";

interface ZalozlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Wimax: Dogłębne statystyki",
  description: "Przeglądaj statystyki kierowcy w zadanym miesiącu.",
};

export default async function Zaloz({ children }: ZalozlayoutProps) {
  return (
    <>
      {children}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
