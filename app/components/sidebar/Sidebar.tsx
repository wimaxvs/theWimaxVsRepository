"use client";
import React, { ReactElement, useState } from "react";
import MenuItem from "./MenuItem";
import { IconType } from "react-icons";
import { HiOutlineDocumentDuplicate, HiOutlineTemplate } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { usePathname } from "next/navigation";

const Sidebar = () => {

  const pathname = usePathname()

  const [menuIcons, setMenuIcons] = useState<
    {
      label: string;
      icon: ReactElement<IconType>;
      yerl: string;
    }[]
  >([
    {
      label: "Create",
      icon: <AiOutlinePlus size={26} color={"white"} />,
      yerl: `/create`,
    },
    {
      label: "My CVs",
      icon: <HiOutlineDocumentDuplicate size={26} color={"white"} />,
      yerl: `/mycvs`,
    },
    {
      label: "Templates",
      icon: <HiOutlineTemplate size={26} color={"white"} />,
      yerl: `/templates`,
    },
  ]);
  return (
    <aside
      className={
        "theSidebar z-20 fixed w-screen md:w-24 bg-gradient-to-bl from-navy-blue to-blue-purple md:h-full h-20 mt-0 flex flex-row md:flex-col justify-evenly md:justify-start md:gap-10 items-center md:pt-8 drop-shadow-lg overflow-hidden"
      }
    >
      {menuIcons.map((item, index) => {
        return (
          <MenuItem key={index} label={item.label} icon={item.icon} yerl={item.yerl} selected={pathname?.includes(item.yerl)} />
        );
      })}
    </aside>
  );
};

export default Sidebar;
