interface DolaczlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "TopTrans: Dołącz",
  description: "Dołącz do istniejącej firmy",
};

export default async function Dolacz({ children }: DolaczlayoutProps) {
  return <>{children}</>;
}
