interface PojazdlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "POLMAX:Nowy",
  description: " Utwórz nowy profil pracownika",
};

export default async function Pracownicy({ children }: PojazdlayoutProps) {
  return <>{children}</>;
}
