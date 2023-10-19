import { SafeUser } from "@/app/types";

import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Navkeys from "./Navkeys";
import ClientOnly from "../ClientOnly";

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
            <ClientOnly>
              <UserMenu currentUser={currentUser} />
            </ClientOnly>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
