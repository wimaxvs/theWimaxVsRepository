"use client";
import { FieldValues, UseFormRegister } from "react-hook-form";
import useCurrentDriver from "@/app/hooks/useCurrentDriver";
import React from "react";
import { BsCameraFill } from "react-icons/bs";
import toast from "react-hot-toast";
import Image from "next/image";

interface ImageAdditionProps {
  id: string;
  register: UseFormRegister<FieldValues>;
}

const ImageAddition: React.FC<ImageAdditionProps> = ({ register, id }) => {
  const { currentDriver } = useCurrentDriver();

  let userImg = currentDriver?.image;

  const [imagePreview, setImagePreview] = React.useState(userImg as string);
  const placeholderPic = "/images/placeholder.jpg";

  function validateImg(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event?.target.files) {
      return;
    } else {
      const imgDoc = event?.target.files[0];
      console.log(typeof imgDoc);
      if (imgDoc.size >= 3048576) {
        return toast.error(
          <>
            <div className="p-4 text-bold text-rose-800 flex flex-col items-center bg-rose-100 rounded-lg my-4">
              {`Error: Max file size is 3mb`}
            </div>
          </>
        );
      } else {
        setImagePreview(URL.createObjectURL(imgDoc));
      }
    }
  }

  return (
    <div
      className={`ImageAddition z-7 bg-white mt-2 flex flex-row md:flex-col items-center justify-around md:justify-normal rounded-xl`}
    >
      <div className="flex flex-col px-20">
        <p className=" avatarAdditionPrompt mt-2 text-black font-bold text-base">
          {`Dodaj zdjęcie`}
        </p>
        <div className="avatarAdditionSpace mt-2 mb-8 relative rounded-full bg-neutral-300 h-[110px] w-[110px] flex flex-col items-center content-center border-1 border-black">
          <label htmlFor="image" className="">
            <Image
              height={360}
              width={360}
              src={imagePreview || placeholderPic}
              alt="avatar placeholder"
              className="signup-profile-pic object-cover rounded-full h-[109px] w-[109px]"
            />
            <span className={`absolute right-0 top-1`}>
              <BsCameraFill size={26} style={{ color: "black" }} />
            </span>
          </label>
          <input
            type="file"
            id={id}
            multiple={false}
            hidden
            accept="image/*"
            {...register(id, {
              onChange: (e) => validateImg(e),
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageAddition;
