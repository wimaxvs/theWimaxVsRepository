interface PojazdlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "TopTrans: Rozliczenie",
  description: "Rozlicz wykonywany trasy",
};

export default async function Pracownicy({ children }: PojazdlayoutProps) {
  return <>{children}</>;
}
