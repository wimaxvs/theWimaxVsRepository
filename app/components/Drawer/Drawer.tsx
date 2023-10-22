import React from "react";
import { AiOutlineAlignLeft, AiOutlineMenu } from "react-icons/ai";
import Sidebar from "./Sidebar";

interface DrawerProps {
  children: React.ReactNode;
  navbar: React.ReactElement;
}
const Drawer: React.FC<DrawerProps> = ({ children, navbar }) => {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content h-screen bg-white">
          {navbar}
          <div className={`mt-[81px] pt-[5px] bg-gray-300`}>
            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button rounded-full relative top-4 left-4"
            >
              <AiOutlineAlignLeft />
            </label>
            {children}
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default Drawer;
