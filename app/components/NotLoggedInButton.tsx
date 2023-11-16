"use client";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";

const NotLoggedInButton = () => {
  return (
    <Link href="/">
      <button
        className={`bg-deep-blue mt-2 py-2 px-4 rounded-lg drop-shadow-lg`}
        onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
      >
        Zaloguję się
      </button>
    </Link>
  );
};

export default NotLoggedInButton;
