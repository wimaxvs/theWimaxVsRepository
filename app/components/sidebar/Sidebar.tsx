"use client";
import React, { ReactElement, useState } from "react";
import MenuItem from "./MenuItem";
import { IconType } from "react-icons";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineTemplate,
} from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";

const Sidebar = () => {
  const [menuIcons, setMenuIcons] = useState<
    {
      onClick: () => void;
      label: string;
      icon: ReactElement<IconType>;
    }[]
  >([
    {
      onClick: () => {
        return;
      },
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
    <div
      className={
        "w-screen md:w-24 bg-deep-blue md:h-screen h-20 mt-20 fixed flex flex-row md:flex-col justify-evenly md:justify-start md:gap-10 items-center md:pt-8 drop-shadow-lg"
      }
    >
          {menuIcons.map((item, index) => {
          return <MenuItem key={index} onClick={item.onClick} label={item.label} icon={item.icon} />
      })}
    </div>
  );
};

export default Sidebar;
