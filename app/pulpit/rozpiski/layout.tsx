interface PojazdlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Wimax: Rozpiski",
  description: "Dodaj lub usuń rozpiskę",
};

export default async function Pracownicy({ children }: PojazdlayoutProps) {
  return <>{children}</>;
}
