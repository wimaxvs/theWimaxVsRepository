import React from 'react'
import Image from 'next/image';

const LoginForm = () => {
  return (
    <form name="wf-form-password" method="get">
      <div className="relative">
        <Image
          height={20}
          width={20}
          alt=""
          src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9455fae6cf89_EnvelopeSimple.svg"
          className="absolute left-[5%] top-[26%] inline-block"
        />
        <input
          type="email"
          className="mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14"
          maxLength={256}
          name="name-3"
          placeholder="Email Address"
          required
        />
      </div>
      <div className="relative mb-4 md:mb-6 lg:mb-8">
        <Image
          height={20}
          width={20}
          alt=""
          src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a946794e6cf8a_Lock-2.svg"
          className="absolute left-[5%] top-[26%] inline-block"
        />
        <input
          type="password"
          className="mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14"
          maxLength={256}
          name="password-4"
          placeholder="Password (min 8 characters)"
          required
        />
      </div>
      <input
        type="submit"
        value="Zaloguje sie"
        className="inline-block w-full cursor-pointer items-center bg-black px-6 py-3 text-center font-semibold text-white"
      />
    </form>
  );
}

export default LoginForm