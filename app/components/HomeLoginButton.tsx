"use client"

import React from 'react'
import useLoginModal from "@/app/hooks/modalHooks/useLoginModal";


const HomeLoginButton = () => {

    const { onOpen } = useLoginModal()
  return (
    <>
      <button onClick={()=> onOpen()} className="inline-block flex-none cursor-pointer bg-[#f7d046] font-semibold capitalize text-black transition hover:[box-shadow:rgb(0,_0,_0)_0px_0px] py-3 rounded-lg md:rounded-2xl text-base md:text-base px-6 md:px-6">
        Let's Go!
      </button>
    </>
  );
}

export default HomeLoginButton