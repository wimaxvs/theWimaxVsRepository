import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import ClientOnly from "../ClientOnly";
import { Driver } from "@prisma/client";

interface NavbarProps {
  currentDriver?: any;
}

const Navbar: React.FC<NavbarProps> = ({ currentDriver }) => {
  return (
    <div className="fixed w-screen max-w-screen bg-white z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between sm:justify-between gap-3 md:gap-0">
            <Logo />
            <ClientOnly>
              <UserMenu currentDriver={currentDriver} />
            </ClientOnly>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
