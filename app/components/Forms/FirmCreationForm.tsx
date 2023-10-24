"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { MdDeleteOutline } from "react-icons/md";
import { BiMessageSquareAdd } from "react-icons/bi";
import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";

import toast from "react-hot-toast";

const FirmCreationForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firmDetails: {
        firmName: "",
        firmTag: "",
        aboutFirm: "",
        firmSocials: [{ link: "" }],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `firmDetails[firmSocials]`, // unique name for your Field Array
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    console.log(data);
    const extractedData = { ...data.firmDetails };
    let links = extractedData.firmSocials.map(
      (link: { link: string }) => link.link
    );
    let firmId = uuidv4().toString();
    firmId = firmId.split("-").join("");

    let toDb = { ...extractedData, firmSocials: links, firmId };
    console.log(toDb);

    let deets = JSON.stringify(toDb);

    axios
      .post("/api/firms", deets)
      .then((res: AxiosResponse<any>) => {
        console.log(res.data);
        toast.success(
          <>
            <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
              {`${res.data.message}`}
            </div>
          </>
        );
        return reset();
      })
      .catch((error: any) => {
        toast.error(`Error: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addLink = () => {
    append({ description: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`w-full`}>
      <div
        className={`w-full flex flex-col gap-2 items-start mt-4 p-4 rounded-md bg-white`}
      >
        <div className={`w-full max-h-[350px] overflow-y-scroll p-2`}>
          <div className="relative w-full">
            <Image
              height={20}
              width={20}
              alt="Icon of letters denoting need to input name"
              src="/images/firmName.png"
              className="absolute left-[5%] top-[26%] inline-block"
            />
            <input
              type="text"
              className="mb-2 md:mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14"
              placeholder="Nazwa firmy"
              {...register("firmDetails.firmName", {
                required: true,
                maxLength: 256,
              })}
            />
          </div>
          <div className="relative w-full">
            <Image
              height={20}
              width={20}
              alt="Icon of letters denoting need to input name"
              src="/images/firmTag.png"
              className="absolute left-[5%] top-[26%] inline-block"
            />
            <input
              type="text"
              className="mb-2 md:mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14"
              placeholder="Firmowa etykieta"
              {...register("firmDetails.firmTag", {
                required: true,
                maxLength: 256,
              })}
            />
          </div>
          <div className="relative w-full">
            <textarea
              rows={4}
              className="py-3 px-4 mb-2 md:mb-4 block w-full border border-solid border-black bg-white rounded-md text-sm text-[#333333] focus:border-blue-500 focus:ring-blue-500 sm:p-4"
              placeholder="o firmie..."
              {...register("firmDetails.aboutFirm", {
                required: true,
                maxLength: 256,
              })}
            />
          </div>
          <div className={`w-full flex flex-col gap-2 items-center `}>
            {fields.map((space, index) => (
              <div
                key={space.id}
                className={`flex flex-row items-center gap-3 w-full`}
              >
                <div className="relative grow">
                  <Image
                    height={20}
                    width={20}
                    alt="Icon of letters denoting need to input name"
                    src="/images/firmSocials.png"
                    className="absolute left-[5%] top-[26%] inline-block"
                  />
                  <input
                    type="text"
                    className="mb-2 md:mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14"
                    placeholder="Media społecznościowe"
                    {...register(`firmDetails.firmSocials[${index}].link`, {
                      required: true,
                      maxLength: 256,
                    })}
                  />
                </div>
                <button
                  className={`mb-2 md:mb-4 `}
                  onClick={() => remove(index)}
                >
                  <MdDeleteOutline size={30} color="#333" />
                </button>
              </div>
            ))}
            <div className={`flex flex-row gap-1 w-full items-center`}>
              <button onClick={addLink}>
                <BiMessageSquareAdd size={30} color="black" />
              </button>
              <p>{`👈naciśnij, aby dodać linki do mediów społecznościowych`}</p>
            </div>
          </div>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className={"p-3 bg-deep-blue text-white font-semibold rounded-md"}
        >
          Prześlij
        </button>
      </div>
    </form>
  );
};

export default FirmCreationForm;
