"use client";
const usePlaceholderImage = () => {
  const placeholderImg =
    "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg";
  const EmailIcon =
    "https://res.cloudinary.com/dfdq1i3u6/image/upload/v1689873801/edgmkkmiowul40eifz2m.png";
  const PhoneIcon =
    "https://res.cloudinary.com/dfdq1i3u6/image/upload/v1689874315/iy0f9fsvs4ycvqpwxftd.png";
  const LocationIcon =
    "https://res.cloudinary.com/dfdq1i3u6/image/upload/v1689874242/qh2ichjtqruusia2jr31.png";

  return {
    imgSrc: placeholderImg,
    PhoneIcon,
    EmailIcon,
    LocationIcon
  };
};

export default usePlaceholderImage;
