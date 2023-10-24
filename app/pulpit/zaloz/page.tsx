import React from "react";

const page = () => {
  return (
    <>
      <div
        className={`zalozPage w-full h-full flex flex-row justify-center py-10`}
      >
        <section
          className={`formSection rounded-md bg-gray-900 w-4/5 md:w-2/3 h-[600px] p-3 md:p-0 flex flex-row`}
        >
          <aside
            className={`p-5 md:p-10 h-full flex flex-col grow items-start gap-3 object-cover md:max-w-[50%]`}
          >
            <h2
              className={`text-m md:text-xl lg:text-4xl font-bold text-white`}
            >{`Pomaluj Europę w swoje kolory`}</h2>
            <p
              className={`text-sm md:text-md lg:text-xl font-semibold`}
            >{`Wypełnij ten formularz i prześlij, aby otworzyć firmę`}</p>
          </aside>
          <aside
            className={`h-full  hidden md:flex md:flex-col md:grow md:items-center md:justify-center md:gap-3 max-w-[50%] bg-[url(/images/createFirm.png)] bg-no-repeat rounded-r-md bg-left`}
          ></aside>
        </section>
      </div>
    </>
  );
};

export default page;
