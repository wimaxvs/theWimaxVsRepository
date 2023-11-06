"use client";
import { useState } from "react";
import Image from "next/image";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback: SignInResponse | undefined) => {

      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Zalogowany");
        router.refresh();
        router.push("/pulpit");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <form name="wf-form-password" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <Image
          height={20}
          width={20}
          alt=""
          src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9455fae6cf89_EnvelopeSimple.svg"
          className="absolute left-[5%] top-[26%] inline-block"
        />
        <input
          type="text"
          autoComplete="email"
          className="mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14"
          placeholder="e-mail"
          {...register("email", {
            required: true,
            maxLength: 256,
            pattern: /^\S+@\S+$/i,
          })}
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
          maxLength={256}
          placeholder="Hasło (min. 8 znaków)"
          required
          className="mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14"
          {...register("password", { required: true, maxLength: 256 })}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="inline-block w-full
        cursor-pointer items-center bg-black px-6 py-3 text-center font-semibold
        text-white disabled:cursor-not-allowed"
      >
        {"Zaloguj sie"}
      </button>
    </form>
  );
};

export default LoginForm;
