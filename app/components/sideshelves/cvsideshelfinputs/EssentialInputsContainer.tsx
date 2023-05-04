"use client";
import Input from "./Input";
import ImageAddition from "@/app/components/sideshelves/cvsideshelfinputs/ImageAddition";
import useCvEssentials from "@/app/hooks/useCvEssentials";

import React, { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../../Button";

const EssentialInputsContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const essentials = useCvEssentials();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstname: essentials.hm.firstname,
      lastname: essentials.hm.lastname,
      email: essentials.hm.email,
      image: essentials.hm.image,
      telephone: essentials.hm.telephone,
      dob: essentials.hm.dob,
      location: essentials.hm.location,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    data = {
      ...data,
      dob: new Date(data.dob),
    };

    essentials.setEssentials({ ...data });
  };

  return (
    <>
      <ImageAddition
        setValue={setValue}
        identity={"image"}
        register={register}
      />

      <div
        className={`CvSideShelf md:w-[270px] bg-white mt-2 flex flex-row md:flex-col items-center justify-around md:justify-normal rounded-xl drop-shadow-md w-[270px]`}
      >
        <div className="flex flex-col flex items-center">
          <p className="inputsThemselves mt-2 text-blue-purple/50 font-bold text-base">
            Who are you?
          </p>
          <div className="SpaceForInputs gap-2 mt-2 mb-8 relative flex flex-col items-center">
            <Input
              id="firstName"
              label="First Name"
              register={register}
              errors={errors}
            />
            <Input
              id="lastName"
              label="Last Name"
              register={register}
              errors={errors}
            />
            <Input
              id="email"
              label="eMail"
              register={register}
              errors={errors}
            />
            <Input
              id="telephone"
              label="Telephone"
              register={register}
              errors={errors}
              type={"phone"}
            />
            <Input
              id="dob"
              label="Date Of Birth"
              register={register}
              errors={errors}
              type={"date"}
            />
            <Input
              id="location"
              label="Location"
              register={register}
              errors={errors}
            />
            <Button
              label={"Save and Continue"}
              disabled={false}
              onClick={handleSubmit(onSubmit)}
              sx={`mt-2 w-5/6`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EssentialInputsContainer;
