import React from "react";
import { AiOutlineAlignLeft } from "react-icons/ai";
import Sidebar from "./Sidebar";
import { SafeDriver } from "@/app/types";

interface DrawerProps {
  children: React.ReactNode;
  navbar: React.ReactElement;
  currentDriver: Partial<SafeDriver>
}
const Drawer: React.FC<DrawerProps> = ({ children, navbar, currentDriver }) => {
  return (
    <>
      {navbar}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content h-screen bg-white overflow-y-scroll lg:overflow-y-hidden">
          <div className={`mt-[83px] bg-gray-300 min-h-full`}>
            <label
              htmlFor="my-drawer"
              className="h-[48px] w-[48px] btn btn-primary bg-base-200 hover:bg-deep-blue drawer-button rounded-full absolute top-[80%] md:top-[134px] right-8 md:left-8 z-50 md:hidden"
            >
              <AiOutlineAlignLeft />
            </label>
            {children}
          </div>
        </div>
        <Sidebar currentDriver={currentDriver}/>
      </div>
    </>
  );
};

export default Drawer;
