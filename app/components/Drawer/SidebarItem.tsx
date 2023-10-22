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
      const rootYerl = "/pulpit";
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

  return <div>SidebarItem</div>;
};

export default SidebarItem;
