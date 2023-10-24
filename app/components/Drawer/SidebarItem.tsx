"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { ReactElement, useCallback } from "react";
import { IconType } from "react-icons";
import Link from "next/link";

interface SidebarItemProps {
  label: string;
  icon?: ReactElement<IconType>;
  yerl?: string;
  selected?: boolean;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon,
  yerl,
  selected,
}) => {
    const pathname = usePathname();
    const router = useRouter();

    const toggleYerl = useCallback(() => {
      const pulpit = "/pulpit";
      const notOnPulpit = pathname?.indexOf(`${yerl}`) !== -1;
      const onPulpit = pathname === pulpit;
      // if (yerl === "/create") {
      //   router.push(`${pathname?.slice(0, pulpit!.length)}`);
      // } else 
      if (!notOnPulpit && onPulpit) {
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

  return <button onClick={toggleYerl} className={`w-full flex flex-row justify-start`}>{label}</button>;
};

export default SidebarItem;
