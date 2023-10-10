import { SafeUser } from "@/app/types";

import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Navkeys from "./Navkeys";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between sm:justify-between gap-3 md:gap-0">
            <Logo />
            <div className="hidden md:block w-1/3 md:ml-auto">
              <Navkeys currentUser={currentUser} />
            </div>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
