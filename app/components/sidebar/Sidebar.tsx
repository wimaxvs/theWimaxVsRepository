"use client";
import React, { ReactElement, useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { IconType } from "react-icons";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineTemplate,
} from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname();
  
  useEffect(() => { console.log(pathname) }, [])


  const [menuIcons, setMenuIcons] = useState<
    {
      onClick: () => void;
      label: string;
      icon: ReactElement<IconType>;
    }[]
  >([
    {
      onClick: () => router.push(`${pathname}/create`),
      label: "Create",
      icon: <AiOutlinePlus size={26} color={"white"} />,
    },
    {
      onClick: () => {
        return;
      },
      label: "My CVs",
      icon: <HiOutlineDocumentDuplicate size={26} color={"white"} />,
    },
    {
      onClick: () => {
        return;
      },
      label: "Templates",
      icon: <HiOutlineTemplate size={26} color={"white"} />,
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
          <MenuItem
            key={index}
            onClick={item.onClick}
            label={item.label}
            icon={item.icon}
          />
        );
      })}
    </aside>
  );
};

export default Sidebar;
