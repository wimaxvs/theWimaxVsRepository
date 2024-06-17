import Loading from "@/app/loading";
import { Suspense } from "react";

interface ZalozlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Wimax: Najlepsi kierowcy",
  description: "To kierowcy podnoszący najwyżej flagę Wimax.",
};

export default async function Zaloz({ children }: ZalozlayoutProps) {
  return (
    <>
      {children}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
