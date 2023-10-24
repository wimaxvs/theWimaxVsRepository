import React from "react";
import ClientOnly from "@/app/components/ClientOnly";
import FirmCreationForm from "@/app/components/Forms/FirmCreationForm";

const page = () => {
  return (
    <>
      <div
        className={`zalozPage bg-gray-500 w-full h-[868px] flex flex-row justify-center py-10`}
      >
        <section
          className={`formSection rounded-md bg-gray-900 w-11/12 md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 p-3 md:p-0 flex flex-row`}
        >
          <aside
            className={`p-5 md:p-10  flex flex-col grow items-start gap-3 object-cover md:max-w-[50%]`}
          >
            {/* Form Title */}
            <h2
              className={`text-m md:text-xl lg:text-4xl font-bold text-white`}
            >{`Pomaluj Europę w swoje kolory`}</h2>
            <p
              className={`text-sm md:text-md lg:text-xl font-semibold`}
            >{`Wypełnij ten formularz i prześlij, aby otworzyć firmę`}</p>

            {/* Form Begin */}
            <ClientOnly>
              <FirmCreationForm/>
            </ClientOnly>
          </aside>

          {/* image to the right on larger displays */}
          <aside
            className={`h-full  hidden md:flex md:flex-col md:grow md:items-center md:justify-center md:gap-3 max-w-[50%] bg-[url(/images/createFirm.png)] bg-no-repeat rounded-r-md bg-left`}
          ></aside>
        </section>
      </div>
    </>
  );
};

export default page;
