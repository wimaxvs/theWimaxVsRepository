import ClientOnly from "@/app/components/ClientOnly";
import RegForm from "@/app/components/Forms/RegForm";
import React from "react";

const page = () => {
  return (
    <div
      className={`profilPage w-full min-h-screen flex flex-row justify-center py-10 bg-[url('/images/faceWireMeshWBg.png')] bg-no-repeat bg-cover bg-bottom overflow-y-scroll`}
    >
      <section
        className={`formSection rounded-md bg-gradient-to-br from-gray-800 to-gray-950 w-11/12 md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 p-2 md:p-10 flex flex-col gap-3 border border-primary`}
      >
        {/* Table Title */}

        <h2
          className={`text-m md:text-xl lg:text-4xl font-bold text-white`}
        >{`Masz kogoś na myśli?`}</h2>
        <p className={`text-sm md:text-md lg:text-xl font-semibold`}>
          Wypełnij poniższy formularz, aby dodać ich do firmy{" "}
        </p>
        <p className={`text-sm font-semibold mb-3 text-white`}>
          {`Pamiętaj, aby przesłać im dane do logowania`}
        </p>
        <ClientOnly>
          <RegForm buttonLabel={"Dodaj sterownik"} buttonColor={"bg-green-600"} justifyState="justify-around" />
        </ClientOnly>
      </section>
    </div>
  );
};

export default page;
