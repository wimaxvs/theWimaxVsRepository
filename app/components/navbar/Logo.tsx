'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'


const Logo = () => {
    const router = useRouter()


  return (
    <Link href="/">
      <Image
        onClick={() => router.push("/")}
        alt="logo"
        className="sm:block md:block cursor-pointer max-h-6 max-w-[133px]"
        height={64}
        width={275}
        src="/images/Logo.png"
      />
    </Link>
  );
}

export default Logo