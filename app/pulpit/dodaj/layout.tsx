import Loading from "@/app/loading";
import { Suspense } from "react";

interface PojazdlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Wimax:Nowy",
  description: " Utwórz nowy profil pracownika",
};

export default async function Pracownicy({ children }: PojazdlayoutProps) {
  return (
    <>
      {children}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
