const useIA = () => {
  const uploadFile = async (theFile: File) => {
    const formData = new FormData();
    formData.append("file", theFile);
    formData.append("upload_preset", "ml_default");
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, {
        method: "POST",
        body: formData,
      });
      const imageData = await res.json();
      return imageData.secure_url;
    } catch (error) {
      return { error };
    }
  };

  return { uploadFile };
};

export default useIA;
