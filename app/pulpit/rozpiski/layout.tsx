interface PojazdlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "POLMAX: Rozpiski",
  description: "Dodaj lub usuń rozpiskę",
};

export default async function Pracownicy({ children }: PojazdlayoutProps) {
  return <>{children}</>;
}
