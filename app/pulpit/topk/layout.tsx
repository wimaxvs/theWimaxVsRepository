interface ZalozlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "POLMAX: Najlepsi kierowcy",
  description: "To kierowcy podnoszący najwyżej flagę POLMAX.",
};

export default async function Zaloz({ children }: ZalozlayoutProps) {
  return <>{children}</>;
}
