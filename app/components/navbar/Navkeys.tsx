import React from "react";
import Link from "next/link";
import { SafeUser } from "@/app/types";

interface NavKeysProps {
  currentUser?: SafeUser | null;
}

const Navkeys: React.FC<NavKeysProps> = ({ currentUser }) => {
  return (
    <div className="md:flex md:flex-row justify-center gap-2">
      {currentUser && (
        <Link
          href="/dash"
          className="px-5 py-2 font-semibold text-[#5b6782] transition hover:text-velvet-blue max-[991px]:block md:px-2 lg:px-4"
        >
          Dashboard
        </Link>
      )}

      <Link
        href="/about"
        className="px-5 py-2 font-semibold text-[#5b6782] transition hover:text-velvet-blue max-[991px]:block md:px-2 lg:px-4"
      >
        About Us
      </Link>
      <Link
        href="/contact"
        className="px-5 py-2 font-semibold text-[#5b6782] transition hover:text-velvet-blue max-[991px]:block md:px-2 lg:px-4"
      >
        Contact
      </Link>
    </div>
  );
};

export default Navkeys;
