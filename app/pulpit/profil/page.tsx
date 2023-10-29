import ClientOnly from "@/app/components/ClientOnly";
import DriverUpdateForm from "@/app/components/Forms/DriverUpdateForm";
import PersonalDetailForm from "@/app/components/Forms/PersonalDetailForm";

const page = async () => {
  return (
    <>
      <div
        className={`profilPage w-full h-[868px] flex flex-row justify-center py-10 bg-[url('/images/faceWireMeshWBg.png')] bg-no-repeat bg-cover bg-bottom overflow-y-scroll`}
      >
        {/* bg-gradient-to-br from-gray-500 to-gray-200 */}
        <section
          className={`formSection rounded-md bg-gradient-to-br from-gray-800 to-gray-950 w-11/12 md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 p-2 md:p-10 flex flex-col gap-3 border border-primary`}
        >
          {/* Table Title */}

          <h2
            className={`text-m md:text-xl lg:text-4xl font-bold text-white`}
          >{`Każdy dobry artysta...  `}</h2>
          <p className={`text-sm md:text-md lg:text-xl font-semibold`}>
            maluje to, czym jest. <b>-Jackson Pollock</b>
          </p>
          <p className={`text-sm font-semibold mb-3 text-white`}>
            Wprowadź zmiany w swoim profilu, wypełniając formularz i klikając
            Prześlij.
          </p>
          <div className="max-w-[11/12] p-3 bg-white gap-6 flex flex-col md:flex-row md:max-h-[70%] rounded-md overflow-y-scroll">
            <ClientOnly>
              <DriverUpdateForm />
              <PersonalDetailForm />
            </ClientOnly>
          </div>
        </section>
      </div>
    </>
  );
};

export default page;
