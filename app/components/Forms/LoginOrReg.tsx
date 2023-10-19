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
      <span
        className={`mt-4 md:mt-6 lg:mt-8 w-full flex flex-col md:flex-row justify-center items-center gap-2`}
      >
        <p className="text-[#636262] text-sm sm:text-sm">
          {isLoggin ? "Nie masz jeszcze konta?" : "Masz juz konto?"}
        </p>
        <p
          onClick={handleClick}
          className="font-bold text-[#0b0b1f] cursor-pointer hover:text-blue-800"
        >
          {isLoggin ? "Zarejestruj Się" : "Zaloguj się"}
        </p>
      </span>
    </>
  );
}

export default LoginOrReg