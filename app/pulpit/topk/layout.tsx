interface ZalozlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "TopTrans: Najlepsi kierowcy",
  description: "To kierowcy podnoszący najwyżej flagę TopTrans.",
};

export default async function Zaloz({ children }: ZalozlayoutProps) {
  return <>{children}</>;
}
