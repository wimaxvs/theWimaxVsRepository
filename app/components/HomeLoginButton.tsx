"use client"

import React from 'react'
import useLoginModal from "@/app/hooks/modalHooks/useLoginModal";
import useRegisterModal from "@/app/hooks/modalHooks/useRegisterModal";

interface HomeLoginButtonProps{
  label: string,
  bgColor: string,
  register?:boolean
}

const HomeLoginButton: React.FC<HomeLoginButtonProps> = ({label, bgColor, register}) => {

    const { onOpen } = useLoginModal()
    const { onOpen: onOpenReg } = useRegisterModal()
  return (
    <>
      <button
        onClick={register ? ()=> onOpenReg() : () => onOpen()}
        className={`inline-block flex-none cursor-pointer bg-[${bgColor}] font-semibold capitalize text-black transition hover:[box-shadow:rgb(0,_0,_0)_0px_0px] py-3 rounded-lg md:rounded-2xl text-base md:text-base px-6 md:px-6`}>
        {label}
      </button>
    </>
  );
}

export default HomeLoginButton