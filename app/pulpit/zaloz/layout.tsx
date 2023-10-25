interface ZalozlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Wimax: Załóż firmę",
  description: "Pulpit Załóżenia firmą",
};

export default async function Zaloz({ children }: ZalozlayoutProps) {
  return <>{children}</>;
}
