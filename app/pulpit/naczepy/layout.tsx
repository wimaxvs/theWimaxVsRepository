interface PojazdlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "TopTrans: Naczepy",
  description: "Zobacz naczepy, którymi dysponujesz",
};

export default async function Pracownicy({ children }: PojazdlayoutProps) {
  return <>{children}</>;
}
