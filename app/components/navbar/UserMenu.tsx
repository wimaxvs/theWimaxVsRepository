"use client";

import { SafeUser } from "@/app/types";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";


interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const menuActions = (los: string) => {
    switch (los) {
      case "login":
        loginModal.onOpen();
        toggleOpen();
        break;
      case "signup":
        registerModal.onOpen();
        toggleOpen();
        break;
    
      default:
        break;
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="p-4 md:px-1 md:px-2 flex flex-row items-center gap-3 cursor-pointer hover:scale-125 hover:drop-shadow-mdtm transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
        </div>
        {currentUser && (
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[25vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="Logout"
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
