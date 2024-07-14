interface PojazdlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "TopTrans: Rozpiski",
  description: "Dodaj lub usuń rozpiskę",
};

export default async function Pracownicy({ children }: PojazdlayoutProps) {
  return <>{children}</>;
}
