import Loading from "@/app/loading";
import { Suspense } from "react";

interface PojazdlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Wimax: Naczepy",
  description: "Zobacz naczepy, którymi dysponujesz",
};

export default async function Pracownicy({ children }: PojazdlayoutProps) {
  return (
    <>
      {children}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
