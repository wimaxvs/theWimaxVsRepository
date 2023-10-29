interface ZalozlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Wimax: Edytuj profil",
  description: "Tutaj dokonaj wszystkich zmian w swoim profilu osobistym",
};

export default async function Zaloz({ children }: ZalozlayoutProps) {
  return <>{children}</>;
}
