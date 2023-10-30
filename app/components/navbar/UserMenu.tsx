"use client";

import useDriver from "@/app/hooks/useCurrentDriver";
import Avatar from "./Avatar";
import { useCallback, useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import { Driver } from "@prisma/client";

interface UserMenuProps {
  currentDriver?: Driver;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentDriver }) => {

  const {currentDriver:stateCurrentDriver, setCurrentDriver} = useDriver()

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (stateCurrentDriver === undefined) {
      setCurrentDriver(currentDriver)
    }
  }, [currentDriver, setCurrentDriver, stateCurrentDriver])

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const menuActions = (los: string) => {
    switch (los) {
      case "login":
        (()=>{})();
        toggleOpen();
        break;
      case "signup":
        (() => {})();
        toggleOpen();
        break;

      default:
        break;
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {stateCurrentDriver && (
          <div
            className="p-4 md:px-2 flex flex-row items-center gap-3 cursor-pointer hover:scale-100 hover:drop-shadow-mdtm transition"
            onClick={toggleOpen}
          >
            <Avatar src={stateCurrentDriver?.image} />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[25vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {stateCurrentDriver ? (
              <>
                <MenuItem
                  label="Wyloguj"
                  onClick={() =>
                    signOut({ callbackUrl: "http://localhost:3000/" })
                  }
                />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={() => menuActions("login")} />
                <MenuItem
                  label="Sign up"
                  onClick={() => menuActions("signup")}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
