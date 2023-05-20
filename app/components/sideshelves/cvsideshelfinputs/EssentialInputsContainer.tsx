"use client";
import Input from "@/app/components/Inputs/Input";
import ImageAddition from "@/app/components/sideshelves/cvsideshelfinputs/ImageAddition";
import useCvSubSegments from "@/app/hooks/useCvSubSegments";
import React, { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../../Button";

interface IIALprops {
  id: string;
  label: string;
}

const EssentialInputsContainer = () => {
  const cvSubSegments = useCvSubSegments();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputIdsAndLabels, setInputIdsAndLabels] = useState<IIALprops[][]>([
    [
      {
        id: "firstname",
        label: "First Name",
      },
      {
        id: "lastname",
        label: "Last Name",
      },
    ],
    [
      {
        id: "email",
        label: "eMail",
      },
      {
        id: "telephone",
        label: "Telephone",
      },
    ],
    [
      {
        id: "dob",
        label: "Date Of Birth",
      },
      {
        id: "location",
        label: "Location",
      },
    ],
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstname: cvSubSegments.theCurrentUser?.firstname,
      lastname: cvSubSegments.theCurrentUser?.lastname,
      email: cvSubSegments.theCurrentUser?.email,
      telephone: cvSubSegments.theCurrentUser?.telephone,
      dob: cvSubSegments.theCurrentUser?.dob,
      location: cvSubSegments.theCurrentUser?.location,
      image: undefined,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(typeof(data.image[0]));
    console.log(data.image[0])

    data = {
      ...data,
      dob: new Date(data.dob),
      image: data.image[0],
    };
    cvSubSegments.setEssentials({ ...data });

    setIsLoading(false);
  };

  return (
    <>
      <ImageAddition id={"image"} register={register} />

      <div
        className={`CvSideShelf bg-light-purple/20 mt-2 flex flex-row md:flex-col items-center justify-around md:justify-normal rounded-xl drop-shadow-md`}
      >
        <div className="flex flex-col flex items-center">
          <p className="inputsThemselves mt-2 text-deep-blue/40 font-bold text-base">
            Who are you?
          </p>
          <div className="SpaceForInputs gap-2 mt-2 mb-8 relative flex flex-col items-center">
            {inputIdsAndLabels.map((theDiv, index) => {
              return (
                <React.Fragment key={index}>
                  <div
                    className={`${theDiv
                      .map((obj, i) => `${obj.id} ${i}`)
                      .join(
                        "-"
                      )} flex flex-row gap-4 items-center justify-start drop-shadow-none w-full`}
                  >
                    {theDiv.map((space, index) => {
                      return (
                        <React.Fragment key={index}>
                          <div
                            className={`${
                              space.id === "telephone"
                                ? "w-5/12"
                                : space.id === "dob"
                                ? "w-5/12"
                                : "w-full"
                            }`}
                          >
                            <Input
                              key={index}
                              isSubSegment
                              isBioData
                              id={space.id}
                              label={space.label}
                              register={register}
                              errors={errors}
                              type={space.id === "dob" ? "date" : ""}
                              required
                            />
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </React.Fragment>
              );
            })}
            <Button
              lightColored
              specifiedColor={"bg-velvet-blue/40"}
              label={"Save Changes"}
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
              sx={"mt-2"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EssentialInputsContainer;
