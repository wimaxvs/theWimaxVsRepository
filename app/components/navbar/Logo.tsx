'use client'

import Image from "next/image"
import Link from "next/link"


const Logo = () => {


  return (
    <Link href="/pulpit">
      <Image
        alt="logo"
        className="sm:block md:block cursor-pointer max-h-6 max-w-[133px]"
        height={451}
        width={1600}
        src="/images/Logo.jpg"
      />
    </Link>
  );
}

export default Logo