"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactElement, useCallback } from "react";
import { IconType } from "react-icons";

interface MenuItemProps {
  label: string;
  icon: ReactElement<IconType>;
  yerl?: string;
  selected?: boolean;
}
const MenuItem: React.FC<MenuItemProps> = ({ label, icon, yerl, selected }) => {
  const pathname = usePathname();
  const router = useRouter();

  const toggleYerl = useCallback(() => {
    const rootYerl = "/dash";
    const yerlPresent = pathname?.indexOf(`${yerl}`) !== -1;
    const isAtDash = pathname === rootYerl;
    if (yerl === "/create") {
      router.push(`${pathname?.slice(0, rootYerl!.length)}`);
    } else if (!yerlPresent && isAtDash) {
      router.push(`${pathname}/${yerl}`);
    } else if (
      pathname &&
      yerl &&
      pathname.indexOf(`${yerl}`) === pathname.length - yerl.length
    ) {
      router.push(`${pathname?.slice(0, -yerl!.length)}`);
    } else {
      router.push(`${rootYerl}/${yerl}`);
    }
    return;
  }, [router, pathname, yerl]);

  return (
    <button
      onClick={toggleYerl}
      className={`ease-in flex flex-col items-center justify-center md:w-5/6 hover:scale-110 hover:bg-white/20 hover:p-1.5 hover:rounded-md hover:drop-shadow-mdsb transition ${
        selected
          ? "border-b-4 border-b-white-800 md:border-b-0 md:border-l-4 md:border-l-white-800  p-1.5 transition ease-in duration-300 scale-110 hover:border-none"
          : ""
      }`}
    >
      {icon}
      <div className="pt-1 text-xs text-white font-semibold">{label}</div>
    </button>
  );
};

export default MenuItem;
