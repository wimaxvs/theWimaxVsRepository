"use client";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TheMessageForm = () => {
  const [entiretyOfMessage, setTheMessageChunk] = useState<{
    name: string;
    email: string;
    message: string;
  }>({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    // Update the 'name' property of the message chunk
    setTheMessageChunk((prevMessageChunk: typeof entiretyOfMessage) => {
      return { ...prevMessageChunk, [name]: value };
    });
  };

  let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(entiretyOfMessage);

    let data = JSON.stringify(entiretyOfMessage);

    axios
      .post("/api/contact", data)
      .then((res: AxiosResponse<{ message: string }>) => {
        console.log(res.data)
        toast.success(
          <>
            <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
              {`${res.data.message}`}
            </div>
          </>
        )
        return setTheMessageChunk(chunk => {return {...chunk, name: "", email: "", message: "" }})
      })
    .catch((error: any) => {
        toast.error(`Error: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="mx-auto max-w-[608px] bg-[#f2f2f7] rounded-md px-8 max-[991px]:ml-0 max-[991px]:mr-0 pt-[2em] pb-8">
        <div className="text-center">
          <h3 className="font-bold text-2xl md:text-3xl">
            <i className="text-velvet-blue">The message form</i>📌
          </h3>
          <div className="mx-auto mt-4 max-w-[480px] mb-5 md:mb-6 lg:mb-8">
            <div className="text-[#636262] text-sm sm:text-sm">
              Once you type in your name, e-mail address and message, hit send
              and expect a response soon!
            </div>
          </div>
          <div className="mx-auto w-full max-w-[400px]">
            <div className="mx-auto max-w-[400px] text-left mb-4">
              <form name="wf-form-password" onSubmit={handleSubmit}>
                <div className="relative">
                  <label htmlFor="name-2" className="mb-1 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="m-0 mb-4 block w-full border border-solid border-black align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-4"
                    maxLength={256}
                    name="name"
                    placeholder="John Doe"
                    value={entiretyOfMessage?.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="relative mb-2">
                  <label htmlFor="email" className="mb-1 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="m-0 mb-4 block w-full border border-solid border-black align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-4"
                    maxLength={256}
                    name="email"
                    placeholder="example@domain.com"
                    value={entiretyOfMessage?.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="relative mb-5 md:mb-6 lg:mb-8">
                  <label htmlFor="message" className="mb-1 font-medium">
                    Message
                  </label>
                  <textarea
                    value={entiretyOfMessage?.message}
                    onChange={handleInputChange}
                    placeholder="Hi, I'd like to say..."
                    maxLength={5000}
                    name="message"
                    className="m-0 block h-auto min-h-[128px] w-full overflow-auto border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm mb-2.5 px-3 py-2 rounded-md pl-4"
                  ></textarea>
                </div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="m-0 inline-block w-full cursor-pointer disabled:cursor-not-allowed items-center bg-velvet-blue rounded-md px-6 py-3 text-center font-semibold text-white"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TheMessageForm;
