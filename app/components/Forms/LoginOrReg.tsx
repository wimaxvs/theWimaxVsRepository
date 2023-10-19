"use client"
import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegForm from './RegForm'

const LoginOrReg = () => {
    const [isLoggin, setIsLogging] = useState<boolean>(true);

    let handleClick = () => {
        return setIsLogging(value => !value)
    }

  return (
    <>
      {isLoggin && <LoginForm />}
      {!isLoggin && <RegForm />}
      <p className="text-[#636262] text-sm sm:text-sm mt-4 md:mt-6 lg:mt-8 w-full flex flex-row justify-center gap-2">
        {isLoggin ? "Nie masz jeszcze konto?":"Masz juz konto?"}
        <p onClick={handleClick} className="font-bold text-[#0b0b1f] cursor-pointer hover:text-blue-800">
          {isLoggin ? "Utwórz Jej" : "Zaloguj się"}
        </p>
      </p>
    </>
  );
}

export default LoginOrReg