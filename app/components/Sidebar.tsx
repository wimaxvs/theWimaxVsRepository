import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

interface SideBarProps {
  children: React.ReactNode;
  navbar: React.ReactElement;
}
const Sidebar: React.FC<SideBarProps> = ({ children, navbar }) => {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {navbar}
          <label
            htmlFor="my-drawer"
            className="btn btn-primary drawer-button rounded-full"
          >
            <AiOutlineMenu />
          </label>
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 pt-24 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
