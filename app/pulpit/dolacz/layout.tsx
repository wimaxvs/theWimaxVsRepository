import Loading from "@/app/loading";
import { Suspense } from "react";

interface DolaczlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Wimax: Dołącz",
  description: "Dołącz do istniejącej firmy",
};

export default async function Dolacz({ children }: DolaczlayoutProps) {
  return (
    <>
      {children}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
