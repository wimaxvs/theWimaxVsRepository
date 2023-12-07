import React from "react";
import { AiOutlineAlignLeft } from "react-icons/ai";
import Sidebar from "./Sidebar";

interface DrawerProps {
  children: React.ReactNode;
  navbar: React.ReactElement;
  role?: string
  firmName?: string | null
}
const Drawer: React.FC<DrawerProps> = ({ children, navbar, role, firmName }) => {
  return (
    <>
      {navbar}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content h-screen bg-white overflow-y-scroll lg:overflow-y-hidden">
          <div className={`mt-[83px] bg-gray-300 min-h-full`}>
            <label
              htmlFor="my-drawer"
              className="h-[48px] w-[48px] btn btn-primary bg-base-200 hover:bg-deep-blue drawer-button rounded-full absolute top-[80%] right-8 z-50 lg:hidden"
            >
              <AiOutlineAlignLeft />
            </label>
            {children}
          </div>
        </div>
        <Sidebar role={role} firmName={firmName} />
      </div>
    </>
  );
};

export default Drawer;
