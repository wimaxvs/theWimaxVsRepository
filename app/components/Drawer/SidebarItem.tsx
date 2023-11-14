"use client";

import usePracNav from "@/app/hooks/usePracNav";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface SidebarItemProps {
  label: string;
  isPulpit?: boolean;
  yerl?: string;
  color?: string;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  yerl,
  isPulpit,
  color,
}) => {
  const { setTheLocation } = usePracNav();
  const pathname = usePathname();
  const router = useRouter();

  const toggleYerl = useCallback(() => {
    switch (yerl) {
      case "pojazd":
        setTheLocation("Podgląd pojazdu");
        break;
      case "pracownicy":
        setTheLocation("Zatrudnij");
        break;
      default:
        break;
    }

    const pulpit = "/pulpit";
    const notOnPulpit = pathname?.indexOf(`${yerl}`) !== -1;
    const onPulpit = pathname === pulpit;
    if (yerl === "pulpit" && onPulpit) {
      return;
    } else if (
      !onPulpit &&
      pathname &&
      pathname.length > pulpit.length &&
      yerl === "pulpit"
    ) {
      router.push(`${pathname?.slice(0, pulpit.length)}`);
    } else if (!notOnPulpit && onPulpit) {
      router.push(`${pathname}/${yerl}`);
    } else if (
      pathname &&
      yerl &&
      pathname.indexOf(`${yerl}`) === pathname.length - yerl.length
    ) {
      router.push(`${pathname?.slice(0, -yerl!.length)}`);
    } else {
      router.push(`${pulpit}/${yerl}`);
    }
    return;
  }, [router, pathname, yerl]);

  return (
    <button
      onClick={toggleYerl}
      className={`w-full flex flex-row justify-start ${
        isPulpit && "mb-8 font-bold"
      } ${color && `text-[${color}]`}`}
    >
      {label}
    </button>
  );
};

export default SidebarItem;
