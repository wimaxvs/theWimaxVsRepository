"use client";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import React from "react";
import { BsCameraFill } from "react-icons/bs";

interface ImageAdditionProps {
  identity: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const ImageAddition: React.FC<ImageAdditionProps> = ({
  register,
  identity,
  setValue,
}) => {
  const [avatar, setAvatar] = React.useState<string | Blob>();
  const [imagePreview, setImagePreview] = React.useState("");
  const placeholderPic =
    "https://via.placeholder.com/150/FFFFFF/000000/?text=add+picture";

  function validateImg(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event!.target.files) {
      return;
    } else {
      const file = event!.target.files[0];
      if (file.size >= 3048576) {
        return alert("Max file size is 2.5mb");
      } else {
        setValue(identity, file);
        setAvatar(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  }

  return (
    <div
      className={`ImageAddition z-7 md:w-[270px] bg-white mt-2 flex flex-row md:flex-col items-center justify-around md:justify-normal rounded-xl drop-shadow-md`}
    >
      <div className="flex flex-col px-20">
        <p className=" avatarAdditionPrompt mt-2 text-blue-purple/50 font-bold text-base">
          Add a picture:
        </p>
        <div className="avatarAdditionSpace mt-2 mb-8 relative rounded-full bg-neutral-300 h-[110px] w-[110px] flex flex-col items-center content-center border-2 border-blue-purple/20">
          <img
            src={imagePreview || placeholderPic}
            // width={110}
            // height={110}
            alt="avatar placeholder"
            className="signup-profile-pic object-cover rounded-full h-[109px] w-[109px]"
          />
          <label htmlFor="image" className="absolute top-1 right-0">
            <span>
              <BsCameraFill size={26} style={{ color: "#492a68" }} />
            </span>
          </label>
          <input
            type="file"
            id={identity}
            hidden
            accept="image/png, image/jpeg"
            // {...register(identity)}
            onChange={validateImg}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageAddition;
